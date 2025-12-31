# Executive Summary (DAO)

- **Finding:** UI/SDK paths convert fixed-point values to JS `Number`, producing measurable precision loss in price impact and validation-related calculations.
- **Current status:** No mainnet threshold-flip confirmed in the limited probe set; this is a preventive reliability finding, not an exploit claim.
- **Risk horizon:** Roadmap goals (v3 adoption, TVL growth, external teams) expand numerical ranges and increase the chance of edge-case divergence at thresholds.
- **Recommendation:** Keep canonical calculations in fixed-point, avoid `Number(...)` for validation gates, and add boundary tests around price-impact/slippage thresholds.

Supporting files:
- `REPORT/REPORT.md`
- `REPORT/DIFF_CASES.md`
- `REPORT/DAO_CONTEXT.md`
