import { transformFileSync } from "@swc/core";
import fs from "node:fs";
const src = process.argv[2], out = process.argv[3];
const { code } = transformFileSync(src, { jsc: { parser: { syntax: "typescript", tsx: true }, transform: { react: { runtime: "automatic" } }, target: "es2020" }, module: { type: "es6" } });
fs.writeFileSync(out, code);
