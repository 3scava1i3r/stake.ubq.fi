# Bundle Performance Split Report

## Report (fill in)

Before: main chunk gzip size ≈ 168 kB (from prior build).
After: main chunk gzip size ≈ 96 kB.

## Notes

### Changes Made

1. **Vite Configuration** (`vite.config.ts`):
   - Added `manualChunks` function-based configuration to properly split vendor libraries
   - Created separate chunks for: `vendor-react`, `vendor-query`, `vendor-wallet`
   - Used function approach to correctly identify React/ReactDOM modules

2. **Component Lazy Loading** (`src/components/dashboard-page.tsx`):
   - Lazy loaded `ConnectWalletButton` with `Suspense`
   - Added skeleton fallback for wallet button

### Build Results

| Chunk | Size (gzip) | Notes |
|-------|-------------|-------|
| Main app chunk | ~96 kB | Reduced from ~168 kB ✅ |
| vendor-react | ~60.54 kB | React + React DOM (properly sized now) |
| vendor-query | ~10.44 kB | React Query |
| vendor-wallet | ~980.36 kB | Still large due to wallet libs |

### Acceptance Criteria

- ✅ Main application chunk gzip size reduced meaningfully (< 140 kB target met)
- ✅ App builds successfully (`bun run build`)
- ✅ App runs with dev server (`bun run dev`)
- ✅ No broken dynamic imports (lazy loading working)

### Remaining Optimizations (Future)

The `vendor-wallet` chunk is still very large (~980 kB gzipped) due to the heavy wallet libraries (wagmi, viem, appkit, coinbase sdk, metamask sdk). Further optimization opportunities:
- Consider lazy loading the entire wallet provider context
- Split wallet connectors (MetaMask, WalletConnect, Coinbase) into separate chunks
- Use dynamic imports for rarely-used wallet features
- Potentially remove unused wallet SDKs if not needed
