-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

DROP FUNCTION IF EXISTS graphql.exception(message text);

DROP FUNCTION IF EXISTS graphql.field_name_for_to_one(foreign_entity regclass, foreign_name_override text, foreign_columns text[]);

DROP FUNCTION IF EXISTS graphql.comment(regclass, column_name text);

DROP FUNCTION IF EXISTS graphql.comment_directive(comment_ text);

DROP FUNCTION IF EXISTS graphql.lowercase_first_letter(text);

DROP FUNCTION IF EXISTS graphql.cache_key(role regrole, ast jsonb, variables jsonb);

DROP FUNCTION IF EXISTS graphql.to_column_orders(order_by_arg jsonb, entity regclass, variables jsonb);

DROP FUNCTION IF EXISTS graphql.build_insert(ast jsonb, variable_definitions jsonb, variables jsonb, parent_type text);

DROP FUNCTION IF EXISTS graphql.argument_value_by_name(name text, ast jsonb);

DROP FUNCTION IF EXISTS graphql.comment(regclass);

DROP FUNCTION IF EXISTS graphql.prepared_statement_exists(statement_name text);

DROP FUNCTION IF EXISTS graphql.primary_key_columns(entity regclass);

DROP FUNCTION IF EXISTS graphql.reverse(column_orders graphql.column_order_w_type[]);

DROP FUNCTION IF EXISTS graphql.to_regclass(schema_ text, name_ text);

DROP FUNCTION IF EXISTS graphql.column_set_is_unique(regclass, columns text[]);

DROP FUNCTION IF EXISTS graphql.inflect_type_default(text);

DROP FUNCTION IF EXISTS graphql.ast_pass_strip_loc(body jsonb);

DROP FUNCTION IF EXISTS graphql.comment(regtype);

DROP FUNCTION IF EXISTS graphql.build_node_query(ast jsonb, variable_definitions jsonb, variables jsonb, parent_type text, parent_block_name text);

DROP FUNCTION IF EXISTS graphql.cache_key_variable_component(variables jsonb);

DROP FUNCTION IF EXISTS graphql.comment(regproc);

DROP FUNCTION IF EXISTS graphql.join_clause(local_columns text[], local_alias_name text, parent_columns text[], parent_alias_name text);

DROP FUNCTION IF EXISTS graphql.rebuild_schema();

DROP FUNCTION IF EXISTS graphql.name_literal(ast jsonb);

DROP FUNCTION IF EXISTS graphql.type_id(regtype);

DROP FUNCTION IF EXISTS graphql.type_name(rec graphql._type);

DROP FUNCTION IF EXISTS graphql.order_by_clause(alias_name text, column_orders graphql.column_order_w_type[]);

DROP FUNCTION IF EXISTS graphql.build_heartbeat_query(ast jsonb);

DROP FUNCTION IF EXISTS graphql.rebuild_fields();

DROP FUNCTION IF EXISTS graphql.parse(text);

DROP FUNCTION IF EXISTS graphql.where_clause(filter_arg jsonb, entity regclass, alias_name text, variables jsonb, variable_definitions jsonb);

DROP FUNCTION IF EXISTS graphql.arg_index(arg_name text, variable_definitions jsonb);

DROP FUNCTION IF EXISTS graphql.resolve(query text, variables jsonb, "operationName" text, extensions jsonb);

DROP FUNCTION IF EXISTS graphql.to_cursor_clause(alias_name text, column_orders graphql.column_order_w_type[]);

DROP FUNCTION IF EXISTS graphql.type_name(regclass, graphql.meta_kind);

DROP FUNCTION IF EXISTS graphql.arg_clause(name text, arguments jsonb, variable_definitions jsonb, entity regclass, default_value text);

DROP FUNCTION IF EXISTS graphql.is_array(regtype);

DROP FUNCTION IF EXISTS graphql.build_update(ast jsonb, variable_definitions jsonb, variables jsonb, parent_type text, parent_block_name text);

DROP FUNCTION IF EXISTS graphql.comment_directive_totalcount_enabled(regclass);

DROP FUNCTION IF EXISTS graphql.field_name_for_query_collection(entity regclass);

DROP FUNCTION IF EXISTS graphql.text_to_comparison_op(text);

DROP FUNCTION IF EXISTS graphql.build_connection_query(ast jsonb, variable_definitions jsonb, variables jsonb, parent_type text, parent_block_name text);

DROP FUNCTION IF EXISTS graphql._first_agg(anyelement, anyelement);

DROP FUNCTION IF EXISTS graphql.field_name_for_to_many(foreign_entity regclass, foreign_name_override text);

DROP FUNCTION IF EXISTS graphql.order_by_enum_to_clause(order_by_enum_val text);

DROP FUNCTION IF EXISTS graphql.is_literal(field jsonb);

DROP FUNCTION IF EXISTS graphql.is_composite(regtype);

DROP FUNCTION IF EXISTS graphql.field_name(rec graphql._field);

DROP FUNCTION IF EXISTS graphql.build_delete(ast jsonb, variable_definitions jsonb, variables jsonb, parent_type text, parent_block_name text);

DROP FUNCTION IF EXISTS graphql.resolve_field(field text, parent_type text, parent_arg_field_id integer, ast jsonb);

DROP FUNCTION IF EXISTS graphql.comment(regnamespace);

DROP FUNCTION IF EXISTS graphql.prepared_statement_create_clause(statement_name text, variable_definitions jsonb, query_ text);

DROP FUNCTION IF EXISTS graphql.comment_directive_name(regproc);

DROP FUNCTION IF EXISTS graphql.to_type_name(regtype);

DROP FUNCTION IF EXISTS graphql."resolve_enumValues"(type_ text, ast jsonb);

DROP FUNCTION IF EXISTS graphql."resolve___Schema"(ast jsonb, variable_definitions jsonb);

DROP FUNCTION IF EXISTS graphql.jsonb_unnest_recursive_with_jsonpath(obj jsonb);

DROP FUNCTION IF EXISTS graphql.comment_directive_name(regclass);

DROP FUNCTION IF EXISTS graphql.variable_definitions_sort(variable_definitions jsonb);

DROP FUNCTION IF EXISTS graphql.ast_pass_fragments(ast jsonb, fragment_defs jsonb);

DROP FUNCTION IF EXISTS graphql.exception_unknown_field(field_name text);

DROP FUNCTION IF EXISTS graphql.prepared_statement_execute_clause(statement_name text, variable_definitions jsonb, variables jsonb);

DROP FUNCTION IF EXISTS graphql.exception_required_argument(arg_name text);

DROP FUNCTION IF EXISTS graphql."resolve___Type"(type_ text, ast jsonb, is_array_not_null boolean, is_array boolean, is_not_null boolean);

DROP FUNCTION IF EXISTS graphql.exception_unknown_field(field_name text, type_name text);

DROP FUNCTION IF EXISTS graphql.type_id(graphql.meta_kind);

DROP FUNCTION IF EXISTS graphql.decode(text);

DROP FUNCTION IF EXISTS graphql.type_id(type_name text);

DROP FUNCTION IF EXISTS graphql.slug();

DROP FUNCTION IF EXISTS graphql.rebuild_types();

DROP FUNCTION IF EXISTS graphql.to_table_name(regclass);

DROP FUNCTION IF EXISTS graphql.comment_directive_inflect_names(regnamespace);

DROP FUNCTION IF EXISTS graphql.comment_directive_name(regtype);

DROP FUNCTION IF EXISTS graphql.cursor_where_clause(block_name text, column_orders graphql.column_order_w_type[], cursor_ text, cursor_var_ix integer, depth_ integer);

DROP FUNCTION IF EXISTS graphql.value_literal(ast jsonb);

DROP FUNCTION IF EXISTS graphql.to_function_name(regproc);

DROP FUNCTION IF EXISTS graphql.comment_directive_name(regclass, column_name text);

DROP FUNCTION IF EXISTS graphql.jsonb_coalesce(val jsonb, default_ jsonb);

DROP FUNCTION IF EXISTS graphql.get_arg_by_name(name text, arguments jsonb);

DROP FUNCTION IF EXISTS graphql.primary_key_clause(entity regclass, alias_name text);

DROP FUNCTION IF EXISTS graphql.type_name(type_id integer);

DROP FUNCTION IF EXISTS graphql.encode(jsonb);

DROP FUNCTION IF EXISTS graphql.field_name_for_function(func regproc);

DROP FUNCTION IF EXISTS graphql.sql_type_to_graphql_type(regtype);

DROP FUNCTION IF EXISTS graphql.to_camel_case(text);

DROP FUNCTION IF EXISTS graphql.primary_key_types(entity regclass);

DROP FUNCTION IF EXISTS graphql.alias_or_name_literal(field jsonb);

DROP FUNCTION IF EXISTS graphql.field_name_for_column(entity regclass, column_name text);

DROP FUNCTION IF EXISTS graphql.is_variable(field jsonb);

DROP FUNCTION graphql.rebuild_on_ddl();

DROP FUNCTION graphql.rebuild_on_drop();

DROP FUNCTION graphql.set_type_name();

DROP FUNCTION graphql.set_field_name();

DROP TABLE IF EXISTS graphql._type CASCADE;

DROP TABLE IF EXISTS graphql._field CASCADE;

DROP TYPE IF EXISTS graphql.parse_result;

DROP TYPE IF EXISTS graphql.column_order_w_type;

DROP TYPE IF EXISTS graphql.cardinality;

DROP TYPE IF EXISTS graphql.column_order_direction;

DROP TYPE IF EXISTS graphql.field_meta_kind;

DROP TYPE IF EXISTS graphql.meta_kind;

DROP TYPE IF EXISTS graphql.type_kind;

DROP TYPE IF EXISTS graphql.comparison_op;

DROP VIEW IF EXISTS graphql.type;

DROP VIEW IF EXISTS graphql.enum_value;

DROP VIEW IF EXISTS graphql.field;

DROP MATERIALIZED VIEW IF EXISTS graphql.entity ;

DROP MATERIALIZED VIEW IF EXISTS graphql.entity_column ;

DROP MATERIALIZED VIEW IF EXISTS graphql.entity_unique_columns ;

DROP MATERIALIZED VIEW IF EXISTS graphql.relationship ;

CREATE OR REPLACE FUNCTION graphql_public.graphql(IN "operationName" text DEFAULT NULL::text,IN query text DEFAULT  NULL::text,IN variables jsonb DEFAULT  NULL::jsonb,IN extensions jsonb DEFAULT  NULL::jsonb)
    RETURNS jsonb
    LANGUAGE 'plpgsql' VOLATILE
    PARALLEL UNSAFE
    COST 100
    
AS $BODY$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        
$BODY$;

ALTER FUNCTION graphql_public.graphql(text, text, jsonb, jsonb)
    OWNER TO supabase_admin;

GRANT EXECUTE ON FUNCTION graphql_public.graphql(text, text, jsonb, jsonb) TO PUBLIC;


GRANT EXECUTE ON FUNCTION graphql_public.graphql(text, text, jsonb, jsonb) TO anon;


GRANT EXECUTE ON FUNCTION graphql_public.graphql(text, text, jsonb, jsonb) TO authenticated;


GRANT EXECUTE ON FUNCTION graphql_public.graphql(text, text, jsonb, jsonb) TO postgres;


GRANT EXECUTE ON FUNCTION graphql_public.graphql(text, text, jsonb, jsonb) TO service_role;


GRANT EXECUTE ON FUNCTION graphql_public.graphql(text, text, jsonb, jsonb) TO supabase_admin;

REVOKE ALL ON TABLE public.sessions FROM authenticated;
REVOKE ALL ON TABLE public.sessions FROM postgres;
REVOKE ALL ON TABLE public.sessions FROM service_role;
GRANT ALL ON TABLE public.sessions TO authenticated;

GRANT ALL ON TABLE public.sessions TO postgres;

GRANT ALL ON TABLE public.sessions TO service_role;

REVOKE ALL ON TABLE public.logs FROM authenticated;
REVOKE ALL ON TABLE public.logs FROM postgres;
REVOKE ALL ON TABLE public.logs FROM service_role;
GRANT ALL ON TABLE public.logs TO authenticated;

GRANT ALL ON TABLE public.logs TO postgres;

GRANT ALL ON TABLE public.logs TO service_role;