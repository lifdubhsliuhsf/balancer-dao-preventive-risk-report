# Code References (potential UI-SDK divergence points)

1) `repos/ui/src/composables/swap/useSor.ts:471` - `Number(formatUnits(priceImpactCalc))` converts BigNumber to JS Number before `MIN_PRICE_IMPACT`/threshold checks.
2) `repos/ui/src/composables/swap/useSor.ts:525` - same Number conversion path for SwapExactOut branch.
3) `repos/ui/src/services/balancer/pools/joins/handlers/exact-in-join.handler.ts:95` - `Number(formatFixed(evmPriceImpact, 18))` converts EVM-scale priceImpact to Number.
4) `repos/ui/src/services/balancer/pools/joins/handlers/generalised-join.handler.ts:98` - `bnum(formatFixed(...)).toNumber()` converts priceImpact to Number for UI.
5) `repos/ui/src/services/balancer/pools/joins/handlers/swap-join.handler.ts:105` - `priceImpact.toNumber()` inside `calcPriceImpact` (swap join flow).
6) `repos/ui/src/services/balancer/pools/exits/handlers/exact-in-exit.handler.ts:103` - `Number(formatFixed(evmPriceImpact, 18))` for exit priceImpact.
7) `repos/ui/src/services/balancer/pools/exits/handlers/exact-out-exit.handler.ts:95` - `Number(formatFixed(evmPriceImpact, 18))` for exit priceImpact.
8) `repos/ui/src/services/balancer/pools/exits/handlers/recovery-exit.handler.ts:78` - `Number(formatFixed(evmPriceImpact, 18))` for recovery exit priceImpact.
9) `repos/ui/src/services/balancer/pools/exits/handlers/generalised-exit.handler.ts:100` - `bnum(formatFixed(...)).toNumber()` for priceImpact.
10) `repos/ui/src/services/balancer/pools/exits/handlers/swap-exit.handler.ts:192` - `priceImpact.toNumber()` in swap exit path.
11) `repos/ui/src/composables/swap/useCowswap.ts:123` - `parseFixed(String(1 + slippageBufferRate.value), 18)` uses JS float composition for slippage buffer.
12) `repos/ui/src/components/modals/SwapPreviewModal.vue:141` - `formatUnits(quote.minimumOutAmount, ...)` and `formatUnits(quote.maximumInAmount, ...)` used for UI display totals; potential rounding vs SDK.
13) `repos/ui/src/composables/useNumbers.ts:60` - `Number(...)` and `.toNumber()` conversions in formatting helpers used broadly in UI.
14) `repos/sdk/balancer-js/src/modules/sor/token-price/subgraphTokenPriceService.ts:41` - `parseFloat(...)` on subgraph price data for SOR pricing.
15) `repos/sdk/balancer-js/src/modules/sor/token-price/subgraphTokenPriceService.ts:58` - multiple `parseFloat(...)` multiplications for token price conversions.
16) `repos/sdk/balancer-js/src/modules/sor/token-price/coingeckoTokenPriceService.ts:33` - `1 / parseFloat(...)` uses float precision for price derivation.
17) `repos/sdk/balancer-js/src/modules/joins/joins.module.ts:484` - `spProduct = spProduct * parseFloat(sp)` for join price-impact math.
18) `repos/sdk/balancer-js/src/modules/vaultModel/poolModel/swap.ts:146` - `formatFixed(...)` to human string for swap amounts; precision loss if reused for calculations.
19) `repos/sdk/balancer-js/src/modules/vaultModel/poolModel/exit.ts:193` - `formatFixed(...)` to human string for exit amounts; rounding risk if reused.
20) `repos/sdk/balancer-js/src/modules/sor/pool-data/onChainData.ts:359` - `formatFixed(...)` used when building pool token balances and rates; potential precision loss in derived price impact.
