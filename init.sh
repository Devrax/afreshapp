#!/bin/zsh
cat ./dev.ts | deno run --allow-env --allow-read --allow-write --allow-net --allow-run --watch=static/,routes/ main.ts -