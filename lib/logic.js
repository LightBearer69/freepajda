import fs from 'fs';
import path from 'path';

// Utility: Clean filename
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
}

export function splitArchiveIntoFragments() {
  const archivePath = path.resolve('iknow-source', 'archive.json');
  const memoryFolder = path.resolve('iknow-source', 'memory');

  if (!fs.existsSync(memoryFolder)) fs.mkdirSync(memoryFolder);

  const raw = fs.readFileSync(archivePath, 'utf-8');
  const entries = JSON.parse(raw);

  let count = 1;

  for (const entry of entries) {
    const date = entry.timestamp || `memory-${count}`;
    const topic = entry.topic || entry.content?.slice(0, 20) || 'untitled';
    const filename = `memory-${String(count).padStart(3, '0')}-${slugify(topic)}.json`;

    const outPath = path.join(memoryFolder, filename);
    fs.writeFileSync(outPath, JSON.stringify(entry, null, 2));
    console.log(`✅ Created: ${filename}`);
    count++;
  }

  console.log(`\n🧠 Memory split into ${count - 1} fragments.`);
}
