.PHONY: all
all: help

.PHONY: contract # cargo build
contract:
	set -e
	RUSTFLAGS="-C link-arg=-s" cargo build --target wasm32-unknown-unknown --release
	mkdir -p res
	cp target/wasm32-unknown-unknown/release/near_nft.wasm res/near_nft.wasm

.PHONY: deploy-contract # deploy contract
deploy-contract: contract
	near deploy --wasmFile res/near_nft.wasm --accountId nearnft.akagi201.testnet

.PHONY: frontend # build frontend
frontend:
	cd frontend && yarn build:web && cd ..

.PHONY: deploy-frontend # deploy frontend
deploy-frontend: frontend
	cd frontend && yarn deploy:pages && cd ..

.PHONY: start-frontend # start frontend
start-frontend: frontend
	cd frontend && yarn start && cd ..

.PHONY: test # cargo test
test:
	cargo test

.PHONY: clean # cargo clean
clean:
	cargo clean
	rm res/*.wasm


.PHONY: help # Generate list of targets with descriptions
help:
	@grep '^.PHONY: .* #' Makefile | sed 's/\.PHONY: \(.*\) # \(.*\)/\1	\2/' | expand -t20