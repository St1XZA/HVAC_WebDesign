/**
 * Generates public/og.png — a 1200x630 abstract frost-field social card.
 * Dependency-free: builds a raw RGB PNG and deflates it with node:zlib.
 */
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const W = 1200;
const H = 630;
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  crcTable[n] = c >>> 0;
}
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
};

const smooth = (t) => t * t * (3 - 2 * t);
const noise = (x, y) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = smooth(x - xi);
  const yf = smooth(y - yi);
  const h = (a, b) => {
    const n = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
    return n - Math.floor(n);
  };
  const a = h(xi, yi);
  const b = h(xi + 1, yi);
  const c = h(xi, yi + 1);
  const d = h(xi + 1, yi + 1);
  return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
};
const fbm = (x, y) => {
  let v = 0;
  let amp = 0.5;
  let f = 1;
  for (let i = 0; i < 5; i++) {
    v += noise(x * f, y * f) * amp;
    f *= 2.02;
    amp *= 0.5;
  }
  return v;
};

const raw = Buffer.alloc((W * 3 + 1) * H);
let p = 0;
for (let y = 0; y < H; y++) {
  raw[p++] = 0;
  for (let x = 0; x < W; x++) {
    const u = x / W;
    const v = y / H;
    const field = fbm(u * 4.2 + 1.3, v * 3.1 + 7.7);
    const plume = Math.pow(Math.max(0, 1 - Math.hypot((u - 0.66) * 1.25, (v - 0.28) * 1.6)), 2.4);
    const plume2 = Math.pow(Math.max(0, 1 - Math.hypot((u - 0.2) * 1.5, (v - 0.8) * 1.9)), 3);
    const rim = Math.pow(Math.hypot((u - 0.5) * 1.35, (v - 0.5) * 1.9), 2) * 0.55;
    const base = 0.012 + field * 0.035;
    const cy = plume * 0.55 + plume2 * 0.22;
    const r = base + cy * 0.06;
    const g = base + cy * 0.62 + rim * 0.05;
    const b = base + cy * 0.95 + rim * 0.09 + 0.03;
    raw[p++] = Math.min(255, Math.round(r * 255));
    raw[p++] = Math.min(255, Math.round(g * 255));
    raw[p++] = Math.min(255, Math.round(b * 255));
  }
}

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', (() => {
    const b = Buffer.alloc(13);
    b.writeUInt32BE(W, 0);
    b.writeUInt32BE(H, 4);
    b[8] = 8;
    b[9] = 2;
    return b;
  })()),
  chunk('IDAT', deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);

mkdirSync(resolve(root, 'public'), { recursive: true });
writeFileSync(resolve(root, 'public/og.png'), png);
console.log(`og.png written — ${W}x${H}, ${(png.length / 1024).toFixed(0)} kB`);
