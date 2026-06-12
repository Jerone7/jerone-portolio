const fs = require('fs');
const path = require('path');

const src1 = "C:\\Users\\Jeron\\.gemini\\antigravity-ide\\brain\\5384af5c-8ad5-4ea8-986b-732d751c9ff6\\portfolio_cover_1781250474764.png";
const src2 = "C:\\Users\\Jeron\\.gemini\\antigravity-ide\\brain\\5384af5c-8ad5-4ea8-986b-732d751c9ff6\\skill_swap_cover_1781250495627.png";

const dest1 = path.join(__dirname, 'public', 'portfolio-cover.png');
const dest2 = path.join(__dirname, 'public', 'skill-swap-cover.png');

try {
  if (fs.existsSync(src1)) {
    fs.copyFileSync(src1, dest1);
    console.log("Successfully copied portfolio-cover.png!");
  } else {
    console.error("Source file 1 does not exist: ", src1);
  }

  if (fs.existsSync(src2)) {
    fs.copyFileSync(src2, dest2);
    console.log("Successfully copied skill-swap-cover.png!");
  } else {
    console.error("Source file 2 does not exist: ", src2);
  }
} catch (err) {
  console.error("Error copying files: ", err.message);
}
