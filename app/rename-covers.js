const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

const filesToRename = [
  {
    old: 'Kimi_Agent_Build Frontend Portfolio.zip',
    new: 'portfolio-cover.png'
  },
  {
    old: 'skill_swap_cover_1781250495627.png',
    new: 'skill-swap-cover.png'
  }
];

filesToRename.forEach(f => {
  const oldPath = path.join(publicDir, f.old);
  const newPath = path.join(publicDir, f.new);

  if (fs.existsSync(oldPath)) {
    try {
      fs.renameSync(oldPath, newPath);
      console.log(`Successfully renamed ${f.old} to ${f.new}`);
    } catch (e) {
      console.error(`Failed to rename ${f.old}:`, e.message);
    }
  } else {
    console.log(`File ${f.old} not found in public directory.`);
  }
});
