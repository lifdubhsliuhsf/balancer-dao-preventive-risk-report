# Preventive Risk Report: UI–SDK Numerical Precision Divergence (Balancer)

Hi Balancer DAO,

This is a **preventive** report focused on UI/SDK numerical precision divergence (no exploit, no mainnet tx). The goal is to document measurable precision loss in UI-facing calculations and why this matters as Balancer scales.

**Executive summary**
- UI paths convert fixed‑point values to JS `Number`, producing measurable precision loss in price-impact/validation paths.
- No threshold flip was confirmed in this small probe set; **not** an exploit claim.
- Risk increases with larger ranges and more complex pool math (v3 adoption/TVL growth).
- Recommendation: keep fixed‑point canonical math for validation thresholds + add boundary tests.

**Links**
- Repo (report + harness): https://github.com/lifdubhsliuhsf/balancer-dao-preventive-risk-report
- Release bundle (zip): https://github.com/lifdubhsliuhsf/balancer-dao-preventive-risk-report/releases/download/v0.1.1/balancer_dao_submission_v0.1.1.zip

**Repro (local only)**
```
cd harness
pnpm i
pnpm run diff
```

**Disclosure question**
If there is a **preferred security/risk disclosure channel** for UI/SDK findings, please point me to it and I’ll re‑submit there (I can also email security@balancer.finance if that’s the correct route).

Thanks for reviewing.
