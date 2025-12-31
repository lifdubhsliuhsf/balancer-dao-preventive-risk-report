# Preventive Risk Assessment: UI–SDK Numerical Divergence in Balancer

## Why this matters now
- Balancer docs explicitly describe the Frontend and SDK as the components that calculate and display price impact.
- The DAO roadmap targets v3 adoption and TVL growth, which expands numerical range and edge-case exposure.
- Small precision losses can accumulate around threshold checks and UI gating, creating governance risk even without an exploit.
- This report is preventive: no mainnet transactions, no exploit claims.


## 1) Executive Summary
- No exploit or mainnet transaction was performed; this is a preventive reliability review.
- We observed measurable precision loss when UI paths convert fixed-point values to JS `Number` for price impact and validation thresholds.
- In a small probe set, 8/10 cases produced non-zero fixed-point deltas after UI-style conversion; several are UI-more-optimistic.
- Balancer docs explicitly position the **Frontend** and **SDK** as the components that calculate and display price impact, making UI/SDK precision a governance-level risk surface.
- Balancer’s roadmap targets v3 adoption, TVL growth, and external-team deployments, which increases numerical range and edge-case exposure.

## 2) Scope (Repos + Commits)
- UI repo (current analysis): https://github.com/balancer/frontend-v2.git
  - Commit: `8563b8d33b6bff266148bd48d7ebc89f921374f4`
  - Note: frontend-v2 is deprecated; the new UI is `frontend-v3` (see README).
- SDK repo (balancer-js): https://github.com/balancer/balancer-sdk.git
  - Commit: `cada330d58ce295218eef70d3452f19b48475c49`

## 3) Method (Local Only)
- Static scan for `Number()/toNumber()/parseFloat/formatFixed/formatUnits` in UI/SDK paths.
- Local precision harness that compares fixed-point values against UI-style `Number(...)` conversion.
- No wallet access, no signing, no mainnet transactions.

## 4) Findings (Technical)
- **Precision loss** is present in UI paths that convert 18-decimal fixed-point values to JS `Number`.
- **Directional bias:** several cases show UI more optimistic (smaller price impact).
- **Threshold flips:** not observed in this limited probe set, but reachable near thresholds (e.g., 5% high price impact).
- **Hotspot paths** include swap and join/exit handlers where `Number(formatFixed(...))` is used for price impact.

Evidence:
- `REPORT/DIFF_CASES.md` (case table)
- `ARTIFACTS/diff_log.csv` and `ARTIFACTS/repro_cases.json`
- `ARTIFACTS/code_refs.md` (file:line references)

## 5) Why This Matters to the DAO (Governance Context)
- **Official doc position:** “The Balancer Frontend calculates and displays Price Impact…” and “The Balancer SDK is used to calculate the PI for add/remove operations.”
  - Source: https://docs.balancer.fi/integration-guides/price-impact/price-impact.md
- **UI disclaimer:** Terms of use state site content is “for informational purposes only” and provided “AS IS.”
  - Source: `frontend-v2` terms of use (see `REPORT/DAO_CONTEXT.md`)
- **Roadmap scaling signals:** v3 adoption targets and TVL growth increase numerical range and edge-case exposure.
  - Source: https://forum.balancer.fi/t/bip-873-balancer-ecosystem-roadmap-proposal-and-funding/6668
- **Historical precedent:** Balancer UI issue reported incorrect price impact for a boosted pool; Aave interface PR fixed a precision issue to prevent transaction failures.
  - Sources: https://github.com/balancer/frontend-v2/issues/1810 and https://github.com/aave/interface/pull/2825

## 6) Recommended Mitigations (Low Cost)
- Keep calculations in fixed-point (BigNumber/BigInt) until final display formatting.
- Make rounding explicit and conservative for safety-critical thresholds.
- Add unit tests around boundary thresholds (e.g., 1%/5% price impact, slippage buffers).
- Document UI/SDK responsibility boundaries in governance-visible docs.

## 7) Responsibility Notes
- Forum BIP indicates Balancer OpCo’s direct responsibility includes `balancer/frontend-v2` and `balancer/balancer-api`.
  - Source: https://forum.balancer.fi/t/bip-stale-funding-proposal-for-the-balancer-opco-year-two/4882
- UI repo indicates frontend-v2 is deprecated and frontend-v3 is the current UI.
  - Source: https://github.com/balancer/frontend-v2 (README)

## 8) Appendix
- `REPORT/DAO_CONTEXT.md` — Quotes, URLs, and dates for governance and incident references.
- `REPORT/REPRO_STEPS.md` — Harness run steps.
- `REPORT/DIFF_CASES.md` — Case list.
