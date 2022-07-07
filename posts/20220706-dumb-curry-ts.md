---
date: 2022-07-06
slug: dumb-curry-ts
title: Dummy arguments vs currying in TypeScript
---

When using TypeScript generics as a library author, there are times when you
want the developer to specify *some* (but not all) generic type parameters and
have the rest be inferred based on the types of the specified parameters.

To demonstrate: In [Cav](https://cav.bar), I wrote the `rpc` client function for
making fully-typed requests to remote handlers on a Cav server. The original
plan was to take a single type parameter (the type of the handler) and have the
types of the arguments be inferred based on what that handler expects to receive
as input.

For example, imagine a `file-drop` app for uploading and downloading files. I
wanted the server for such an app to look like the following:

```ts
// file-drop/model.ts:
//   export async function saveFile(file: File): Promise<string> { ...
//   export async function readFile(id: string): Promise<File> { ...

// file-drop/controller.ts:
import * as model from "./model.ts";
import { router, endpoint } from "https://deno.land/x/cav/mod.ts";

export type MainRouter = typeof mainRouter;

export const mainRouter = router({
  "upload": endpoint({
    body: (b: File) => b, // Not parsing, for brevity
  }, ({ body }) => {
    return await model.saveFile(body);
  }),

  "download": endpoint({
    query: (q: { id: string }) => q, // Not parsing, for brevity
  }, ({ query }) => {
    return await model.readFile(query.id);
  }),
});
```

... and I wanted the RPC client functions to look like this:

```ts
// file-drop/rpc.ts:
import { rpc } from "https://deno.land/x/cav/rpc.ts";
import type { MainRouter } from "./controller.ts";

export async function upload(file: File): Promise<string> {
  return await rpc<MainRouter>({
    path: "upload", // Inferred type: "upload" | "download"
    body: file,     // Inferred type: File
  });
}

export async function download(id: string): Promise<File> {
  return await rpc<MainRouter>({
    path: "download",
    query: { id },  // Inferred type: { id: string }
  });
}
```

Given this syntax goal, I thought I might be able to implement `rpc` with the
following:

```ts
// https://deno.land/x/cav/rpc.ts:

// ...

/** Make a request to a remote Cav handler. */
export async function rpc<
  T extends Handler = never,
  Path = never,
  FinalHandler = T extends Router ? KeyIntoRouter<T, Path> : T,
>(arg: {
  /** The URL of the handler specified in the type parameter. Default: `"/"` */
  base: string;
  /** Extra path segments to append to the base URL to get the final URL. */
  path?: Path & (
    T extends Router ? RouterPaths<T>
    : string
  );
  /** Query string parameters, in Record form. */
  query: (
    FinalHandler extends Endpoint ? EndpointQuery<FinalHandler>
    : Record<string, string | string[]>
  );
  /** The request body to serialize. */
  body: (
    FinalHandler extends Endpoint ? EndpointBody<FinalHandler>
    : unknown
  );
}): (
  FinalHandler extends Endpoint ?  Promise<EndpointResult<FinalHandler>>
  : Promise<unknown>
) {
  // ...
}
```

Unfortunately, that didn't work. When explicitly specifying a generic type
parameter in a function call, type inference for the remaining parameters is
turned off and the fallbacks are always used. If I called this implementation
like I did in `file-drop/rpc.ts`, the `Path` will always be `never` and the
`FinalHandler` parameter will always be `KeyIntoRouter<MainRouter, never>`,
which would also equate to `never`. Not what I wanted.

There's a [proposal](https://github.com/microsoft/TypeScript/issues/26242) to
add some kind of syntax that will allow for partial parameter inference, which
would fix this problem. Sadly, it's been open for awhile and there's a lot of
competing solution suggestions. Until a feature like that is implemented, we
need to use workarounds.

After hours of searching, I came across two options worth exploring: Dummy
arguments and currying.

## Dummy arguments

A dummy argument (is there a more formal name?)<sup>*</sup> is an argument
that's only used for its type. Instead of requiring an explicit type parameter,
you simply add an argument whose type is used in the type system but whose value
isn't used at all.

The syntax is a little weird and it requires using `as`, but otherwise it's
pretty straightforward. Here's what it might look like in `file-drop/rpc.ts`:

```ts
// file-drop/rpc.ts
import { rpc } from "https://deno.land/x/cav/rpc.ts"
import type { MainRouter } from "./controller.ts";

export async function upload(file: File): Promise<string> {
  return await rpc({
    type: null! as MainRouter,
    path: "upload",
    body: file,
  });
}

export async function download(id: string): Promise<File> {
  return await rpc({
    type: null! as MainRouter,
    path: "download",
    query: { id },
  });
}
```

Now, because we aren't specifying any generic parameters explicitly, inference
works and the `rpc` calls behave as expected.

## Currying

One other option to consider is currying, which is explained really well in
[this gist](https://gist.github.com/donnut/fd56232da58d25ceecf1) by Erwin Poeze.

Here's what that might look like for `file-drop/rpc.ts`:

```ts
// file-drop/rpc.ts
import { rpc } from "https://deno.land/x/cav/rpc.ts"
import type { MainRouter } from "./controller.ts";

const mainRpc = rpc<MainRouter>();

export async function upload(file: File): Promise<string> {
  return await mainRpc({
    path: "upload",
    body: file,
  });
}

export async function download(id: string): Promise<File> {
  return await mainRpc({
    path: "download",
    query: { id },
  });
}
```

Or if the base URL was dynamic, we could also do this:

```ts
// file-drop/rpc.ts
import { rpc } from "https://deno.land/x/cav/rpc.ts"
import type { MainRouter } from "./controller.ts";

export async function upload(file: File, base = "/"): Promise<string> {
  return await rpc<MainRouter>(base)({
    path: "upload",
    body: file,
  });
}

export async function download(id: string, base = "/"): Promise<File> {
  return await rpc<MainRouter>(base)({
    path: "download",
    query: { id },
  });
}
```

## Verdict

I'm going with dummy arguments. Putting aside the obvious complexity
differences, here's the ultimate justification for why dummy arguments are
better in this case:

```ts
// Dummy arguments implementation of https://deno.land/x/cav/rpc.ts:

// ... no changes ...

export async function rpc<
  // ... no changes ...
>(arg: {
  /**
   * The type of the remote handler. Only the type is used, the value doesn't
   * matter. Example: `null! as MainRouter`
   */
  type?: T;
  // ... no other changes ...
}): (
  // ... no changes ...
) {
  // ... no changes ...
}
```

```ts
// Currying implementation of https://deno.land/x/cav/rpc.ts

// ... no changes ...

export type Rpc<T extends Handler = never> = (
  T extends Router ? (arg: {
    // ... I'm getting bored with this ...
  }) => (
    // ... bro I do not even know what goes in here ...
  )

  : T extends Endpoint ? (arg: {
    // ... uggghhhh please don't make me ...
  })

  : never
);

export async function rpc<T extends Handler = never>(base?: string): Rpc<T> {
  // ... you get it.
}
```

For the dummy implementation, that's a single line addition compared to my
initial attempt. For the currying implementation, my initial attempt would need
to be completely rewritten.

Further, full disclosure: I wrote this post after going down the currying route
for awhile, before I had fully considered the dummy argument option. During code
review I realized something helpful... If I went ahead and used the dummy
argument solution now and we get partial parameter inference in the future, all
I'd have to do is remove the `type` dummy argument. If I used currying now and
we get partial parameter inference, I'd have to rewrite everything because
currying would be unnecessary complexity at that point. The API would
drastically change, docs and tests would need to be rewritten, etc.

I'm pretty happy to just K.I.S.S. this problem and move on to the next one.
You're welcome, future me.

## Feedback

<sup>*</sup>If you see anything wrong with this post or if you know something I
don't, [please teach me](https://github.com/connorlogin/connor.lol/issues/new).
Tryna learn all the things, my doors are wide open.