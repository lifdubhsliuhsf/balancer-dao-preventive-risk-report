# Repro Steps

1) Install harness deps

```
cd ~/balancer_submit/balancer_dao_submission/harness
pnpm i
```

2) Run diff harness

```
pnpm run diff
```

3) Expected outputs

- `ARTIFACTS/diff_log.csv` (all cases)
- `ARTIFACTS/repro_cases.json` (meaningful cases)

4) Reproduce at least 3 divergence cases

Use the following case IDs (present in `repro_cases.json`):
- `threshold_minus`
- `hi_precision_2`
- `edge_2`

These show UI Number conversion deviating from fixed-point references. The deltas (1e-18 scale) are recorded in `diff_log.csv`.
