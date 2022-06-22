# Near querier

Support query contract's state at a block id.

## Usage

```bash
yarn start --help
```

Example:

```bash
yarn start view v2.ref-finance.near get_pools '{"from_index": 4, "limit": 1}' --block-id 68279807
```