// src/generateExam.js
import { examStructure } from "./examStructure";
import questions from "./data/questions.json";

/** Fisher-Yates shuffle (immutable copy) */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** pick n questions from pool of given category (non-mutating) */
function pickFromCategory(category, n, usedIds = new Set()) {
  const pool = questions.filter(q => q.category === category && !usedIds.has(q.id));
  return shuffle(pool).slice(0, n);
}

/** general pool excluding used */
function pickFromAny(n, usedIds = new Set()) {
  const pool = questions.filter(q => !usedIds.has(q.id));
  return shuffle(pool).slice(0, n);
}

/**
 * generateExam(licenseKey) => { license, config, questions: [...] }
 * - licenseKey: 'B' | 'A1' | ...
 */
export function generateExam(licenseKey) {
  const config = examStructure[licenseKey];
  if (!config) throw new Error(`No exam structure for ${licenseKey}`);

  const specialKeys = new Set(["total", "time", "passing"]);
  const selected = [];
  const usedIds = new Set();

  // pick per category in config order (skips special keys)
  for (const key of Object.keys(config)) {
    if (specialKeys.has(key)) continue;
    const count = config[key];
    if (!count || count <= 0) continue;

    const picked = pickFromCategory(key, count, usedIds);
    picked.forEach(q => {
      selected.push(q);
      usedIds.add(q.id);
    });

    // warn if not enough questions in this category
    if (picked.length < count) {
      console.warn(`generateExam: category ${key} needs ${count} but only ${picked.length} available`);
    }
  }

  // If not enough total -> fill from any other questions not used yet
  if (selected.length < config.total) {
    const remaining = config.total - selected.length;
    const more = pickFromAny(remaining, usedIds);
    more.forEach(q => {
      selected.push(q);
      usedIds.add(q.id);
    });

    if (more.length < remaining) {
      console.warn(`generateExam: could not reach total ${config.total} (got ${selected.length})`);
    }
  }

  // Shuffle final selected set (so category blocks are mixed)
  const finalSet = shuffle(selected).slice(0, config.total);

  return {
    license: licenseKey,
    config,
    questions: finalSet,
    generatedAt: new Date().toISOString(),
  };
}
