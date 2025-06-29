// index.js - Core of FreePajda
import { loadMemory, splitMemory, writeFragments } from './lib/logic.js'

async function main() {
  const raw = await loadMemory();
  const parts = splitMemory(raw);
  await writeFragments(parts);
}

main();
