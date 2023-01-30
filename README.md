# Build Tools Compare

The is a playground to compare the build performance of some build tools, including:

- edenx-builder (with webpack provider)
- edenx-rspack-builder (with rspack provider)
- create-react-app
- next.js
- rspack
- vite

All these projects is using the arco pro template.

## Quick Start

```bash
# install dependencies
pnpm i

# remove cache (optional)
pnpm clean

# run dev
pnpm dev:create-react-app
pnpm dev:eden-v2
pnpm dev:jupiter-v5
pnpm dev:next.js
pnpm dev:rspack
pnpm dev:edenx
pnpm dev:edenx-builder
pnpm dev:edenx-rspack-builder
pnpm dev:vite

# run build
pnpm build:create-react-app
pnpm build:eden-v2
pnpm build:jupiter-v5
pnpm build:next.js
pnpm build:rspack
pnpm build:edenx
pnpm build:edenx-builder
pnpm build:edenx-rspack-builder
pnpm build:vite
```

## Note

In order to maintain fairness, the following configs have been unified:

- Browserslist: ["> 0.01%", "not dead", "not op_mini all"]
- The Type Checker is disabled because some tools not support it.
- No ESLint check.
