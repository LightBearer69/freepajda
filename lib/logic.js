// lib/logic.js - FreePajda's brain

import fs from 'fs/promises';
import path from 'path';

const SOURCE_PATH = '../iknow-source/'; // adjust if needed

export async function loadMemory() {
  const file1 = await fs.readFile(path.join(SOURCE_PATH, 'iknow-conversations-part1.json'), 'utf-8');
  const file2 = await fs.readFile(path.join(SOURCE_PATH, 'iknow-conversations-part2.json'), 'utf-8');
  return JSON.parse(file1).concat(JSON.parse(file2));
}

export function splitMemory(messages) {
  // Very basic splitting logic for now: chunks of 100
  const chunks = [];
  for (let i = 0; i < messages.length; i += 100) {
    chunks.push(messages.slice(i, i + 100));
  }
  return chunks;
}

export async function writeFragments(chunks) {
  await fs.mkdir('./fragments', { recursive: true });
  for (let i = 0; i < chunks.length; i++) {
    const fragmentPath = `./fragments/memory-${i + 1}.json`;
    await fs.writeFile(fragmentPath, JSON.stringify(chunks[i], null, 2));
  }
}
