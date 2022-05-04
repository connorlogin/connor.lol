// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

Object.assign(self, {
    flipCard: (to)=>{
        const card = document.querySelector(".card");
        const [about, links] = document.querySelectorAll(".card-flip button");
        if (to === "back") {
            card.classList.add("card--flipped");
            about.disabled = false;
            links.disabled = true;
        } else {
            card.classList.remove("card--flipped");
            about.disabled = true;
            links.disabled = false;
        }
    }
});
