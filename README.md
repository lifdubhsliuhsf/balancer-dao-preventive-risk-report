# Balancer DAO Preventive Risk Report

This repository contains a **preventive** assessment of UI–SDK numerical precision divergence in Balancer. It does **not** include exploits or mainnet transactions.

## Read First
- Executive summary: `REPORT/EXEC_SUMMARY.md`
- Full report: `REPORT/REPORT.md`
- Repro steps: `REPORT/REPRO_STEPS.md`

## What this is
- Local-only evidence showing precision loss when UI paths convert fixed-point values to JS `Number`.
- Governance-facing context to explain why this matters as Balancer scales.

## What this is NOT
- No exploit steps
- No wallet signing
- No mainnet transactions

## Run the harness
```
cd harness
pnpm i
pnpm run diff
```

Outputs:
- `ARTIFACTS/diff_log.csv`
- `ARTIFACTS/repro_cases.json`

## License / Notices
- See `LICENSES/THIRD_PARTY_NOTICES.md`
