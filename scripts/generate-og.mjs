/**
 * Generates /public/og-image.png (1200×630).
 * Run once: node scripts/generate-og.mjs
 */

import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const W = 1200;
const H = 630;

// ── Avatar (circular crop) ───────────────────────────────────────────────────
const AVATAR_SIZE = 440;
const AVATAR_X = 700;
const AVATAR_Y = (H - AVATAR_SIZE) / 2; // vertically centred

const circleMask = Buffer.from(
  `<svg width="${AVATAR_SIZE}" height="${AVATAR_SIZE}">
    <circle cx="${AVATAR_SIZE / 2}" cy="${AVATAR_SIZE / 2}" r="${AVATAR_SIZE / 2}" fill="white"/>
  </svg>`
);

const avatarBuf = await sharp(path.join(root, 'public/images/logos/Avatar-c.png'))
  .resize(AVATAR_SIZE, AVATAR_SIZE)
  .composite([{ input: circleMask, blend: 'dest-in' }])
  .png()
  .toBuffer();

// ── Background SVG (text + shapes) ──────────────────────────────────────────
const bg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#080808"/>

  <!-- Border -->
  <rect x="6" y="6" width="${W - 12}" height="${H - 12}"
        fill="none" stroke="#ccff00" stroke-width="2" opacity="0.25"/>

  <!-- LG box -->
  <rect x="72" y="52" width="72" height="72" fill="#ccff00"/>
  <text x="108" y="108"
        font-family="Impact, Arial Black, sans-serif"
        font-size="38" font-weight="bold"
        fill="#080808" text-anchor="middle">LG</text>

  <!-- Name — two lines -->
  <text x="72" y="300"
        font-family="Impact, Arial Black, sans-serif"
        font-size="100" fill="#e8e4df" letter-spacing="4">LIAM</text>
  <text x="72" y="408"
        font-family="Impact, Arial Black, sans-serif"
        font-size="100" fill="#e8e4df" letter-spacing="4">GALLAGHER</text>

  <!-- Accent line -->
  <rect x="72" y="430" width="100" height="3" fill="#ccff00"/>

  <!-- Role -->
  <text x="72" y="472"
        font-family="Courier New, Courier, monospace"
        font-size="20" fill="rgba(232,228,223,0.55)" letter-spacing="3">
    FRONTEND DEVELOPER · UI/UX DESIGNER
  </text>

  <!-- Location -->
  <text x="72" y="516"
        font-family="Courier New, Courier, monospace"
        font-size="18" fill="#ccff00" letter-spacing="2">
    ★ MANCHESTER, UK → WORLDWIDE
  </text>

  <!-- Stack -->
  <text x="72" y="578"
        font-family="Courier New, Courier, monospace"
        font-size="15" fill="rgba(232,228,223,0.3)" letter-spacing="2">
    VUE · TYPESCRIPT · ASTRO · FIGMA
  </text>
</svg>`;

// ── Composite and save ───────────────────────────────────────────────────────
await sharp(Buffer.from(bg))
  .composite([
    {
      input: avatarBuf,
      left: AVATAR_X,
      top: Math.round(AVATAR_Y),
    },
  ])
  .png()
  .toFile(path.join(root, 'public/og-image.png'));

console.log('✓ public/og-image.png generated (1200×630)');
