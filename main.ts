/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { InnerRenderFunction, RenderContext, start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import { config, setup } from "@twind";
import { virtualSheet } from "twind/sheets";

const port = Deno.args.filter(arg => typeof arg === 'string' && arg.includes('--port')).map((arg) => {
  const args = Deno.args,
  pos = args.findIndex(param => param === arg),
  keyValue = arg.split('='),
  value = keyValue.length > 1 ? keyValue[1] : args[pos+1] && args[pos+1].includes('--') ? undefined : args[pos+1];
  return Number(value) || undefined;
})[0] || 8000;

const sheet = virtualSheet();
sheet.reset();
setup({ ...config, sheet });

function render(ctx: RenderContext, render: InnerRenderFunction) {
  const snapshot = ctx.state.get("twind") as unknown[] | null;
  sheet.reset(snapshot || undefined);
  render();
  ctx.styles.splice(0, ctx.styles.length, ...(sheet).target);
  const newSnapshot = sheet.reset();
  ctx.state.set("twind", newSnapshot);
}

await start(manifest, { render, port }); 
