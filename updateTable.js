const fs = require("fs");

console.log("🚀 Running script...");

const data = [
  { name: "PBKS", played: 5, won: 4, lost: 0, points: 9, nrr: "+1.067" },
  { name: "RCB", played: 5, won: 4, lost: 1, points: 8, nrr: "+1.503" }
];

fs.writeFileSync("./public/simulator-table.json", JSON.stringify(updated, null, 2));
console.log("✅ Table updated successfully!");