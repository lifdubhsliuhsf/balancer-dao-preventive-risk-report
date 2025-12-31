# Diff Cases (precision loss)

All cases are synthetic priceImpact values in EVM 18-decimal fixed-point. The UI path converts to JS Number, then back to fixed for comparison. Any non-zero diff indicates precision loss.

| case_id | raw_priceImpact | ui_number | ui_fixed_18 | diff_wei | diff_type |
| --- | --- | --- | --- | --- | --- |
| threshold_minus | 0.049999999999999999 | 0.049999999999999996 | 0.049999999999999996 | 3 | ui_more_optimistic |
| threshold_plus | 0.050000000000000001 | 0.05 | 0.050000000000000003 | 2 | ui_more_conservative |
| one_bp_minus | 0.009999999999999999 | 0.009999999999999998 | 0.009999999999999998 | 1 | ui_more_optimistic |
| one_bp_plus | 0.010000000000000001 | 0.01 | 0.010000000000000000 | 1 | ui_more_optimistic |
| hi_precision_1 | 0.123456789012345678 | 0.12345678901234568 | 0.123456789012345677 | 1 | ui_more_optimistic |
| hi_precision_2 | 0.987654321098765432 | 0.9876543210987654 | 0.987654321098765386 | 46 | ui_more_optimistic |
| edge_1 | 0.333333333333333333 | 0.3333333333333333 | 0.333333333333333315 | 18 | ui_more_optimistic |
| edge_2 | 0.666666666666666667 | 0.6666666666666666 | 0.666666666666666630 | 37 | ui_more_optimistic |

Notes:
- `diff_wei` is the delta in 1e-18 units after converting UI Number back to fixed-point.
- No threshold flips were observed in this small probe set, but precision loss is measurable.
