# Gift

[![Rust Check & Build](https://github.com/Akagi201/gift/actions/workflows/ci.yml/badge.svg)](https://github.com/Akagi201/gift/actions/workflows/ci.yml)

Gift = Github + NFT

我们知道区块链上用户要对应现实中全球一个唯一身份是很难的，但是如果限制在一个特定领域的用户，那么往往可以实现。所以，考虑通过 Github 以及其代码贡献量来给用户分发 NFT 的方式来实现链上与链下用户的对应。

优秀用户可以免费领取一个 Mint NFT.
普通用户需要 deposit 一定 NEAR 来 Mint NFT.

## Design

根据用户的 star 和 followers 数量，生成头像 NFT，同时必须满足至少注册了 1 年。

你的 star 数跟 follower 数，代表了你的实力，但是实力并不能决定你一定会比别人得到更好的 NFT，只能让你机会更大，所以，运气很重要。

0 ~ 2: 初级
3 ~ 5: 中级
6 ~ 8: 高级
9: 特级

Head: 0 ~ 9
Mouth: 0 ~ 9

## TODOs

- [ ] Add wallet selector to support sender wallet.
- [ ] Add marketplace.
- [ ] Add Github OAuth to claim NFT.
- [ ] Add gift calc algorithm.
- [ ] Art assets about an avaster.

## Build Contract

```sh
make contract
```

## Deploy and Init Contract

```sh
near create-account nearnft.akagi201.testnet --masterAccount akagi201.testnet
make deploy-contract
near call nearnft.akagi201.testnet new_default_meta '{"owner_id": "nearnft.akagi201.testnet"}' --accountId nearnft.akagi201.testnet
```

## Build frontend

```sh
make frontend
```

## Deploy frontend

```sh
make deploy-frontend
```

## Start local frontend

```sh
make start-frontend
```

## Refs

* <https://github.com/rounakbanik/generative-art-nft>
* <https://medium.com/scrappy-squirrels/tutorial-create-generative-nft-art-with-rarities-8ee6ce843133>
