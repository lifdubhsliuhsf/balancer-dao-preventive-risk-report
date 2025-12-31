import { BigNumber } from "@ethersproject/bignumber";
import { formatFixed, parseFixed } from "@ethersproject/bignumber";
import fs from "fs";
import path from "path";

const outDir = path.resolve("../ARTIFACTS");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const thresholdStr = "0.05"; // UI high price impact threshold reference
const thresholdScaled = parseFixed(thresholdStr, 18);

const cases: { id: string; raw: string }[] = [
  { id: "threshold_minus", raw: "0.049999999999999999" },
  { id: "threshold_plus", raw: "0.050000000000000001" },
  { id: "one_bp_minus", raw: "0.009999999999999999" },
  { id: "one_bp_plus", raw: "0.010000000000000001" },
  { id: "hi_precision_1", raw: "0.123456789012345678" },
  { id: "hi_precision_2", raw: "0.987654321098765432" },
  { id: "small_precision", raw: "0.000000000000000123" },
  { id: "small_precision_2", raw: "0.000000000000000999" },
  { id: "edge_1", raw: "0.333333333333333333" },
  { id: "edge_2", raw: "0.666666666666666667" }
];

const rows: string[] = [];
rows.push(
  [
    "case_id",
    "raw",
    "ui_number",
    "ui_fixed_18",
    "ui_scaled",
    "ref_scaled",
    "diff_wei",
    "diff_type",
    "threshold_flip"
  ].join(",")
);

const reproCases: any[] = [];

for (const c of cases) {
  const refScaled = parseFixed(c.raw, 18);
  const uiNumber = Number(c.raw);
  const uiFixed = uiNumber.toFixed(18);
  const uiScaled = parseFixed(uiFixed, 18);
  const diff = refScaled.sub(uiScaled).abs();
  const diffType = uiScaled.lt(refScaled)
    ? "ui_more_optimistic"
    : uiScaled.gt(refScaled)
    ? "ui_more_conservative"
    : "exact";
  const thresholdFlip =
    (refScaled.gte(thresholdScaled) && uiScaled.lt(thresholdScaled)) ||
    (refScaled.lt(thresholdScaled) && uiScaled.gte(thresholdScaled));

  rows.push(
    [
      c.id,
      c.raw,
      uiNumber.toString(),
      uiFixed,
      uiScaled.toString(),
      refScaled.toString(),
      diff.toString(),
      diffType,
      thresholdFlip ? "true" : "false"
    ].join(",")
  );

  if (!diff.isZero() || thresholdFlip) {
    reproCases.push({
      id: c.id,
      raw: c.raw,
      ui_number: uiNumber,
      ui_fixed_18: uiFixed,
      ui_scaled: uiScaled.toString(),
      ref_scaled: refScaled.toString(),
      diff_wei: diff.toString(),
      diff_type: diffType,
      threshold_flip: thresholdFlip
    });
  }
}

fs.writeFileSync(path.join(outDir, "diff_log.csv"), rows.join("\n"));
fs.writeFileSync(
  path.join(outDir, "repro_cases.json"),
  JSON.stringify(reproCases, null, 2)
);

console.log(`Wrote ${rows.length - 1} cases to diff_log.csv`);
console.log(`Meaningful cases: ${reproCases.length}`);
