/** @jsx h */
import { Handlers } from "https://deno.land/x/fresh@1.0.0/server.ts";
import { h } from 'preact';

export const handler: Handlers = {
    async GET(req, ctx) {
      const resp = await ctx.render();
      console.log(ctx);
      resp.headers.set("X-Custom-Header", "Jokes");
      return resp;
    },
  };

export default function jokes() {

    return (
        <div>
            Open devtools and check the request made by fetching this Document you must see the 'X-Custom-header' head in the response
        </div>
    )
}