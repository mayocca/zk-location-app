# Define the source files that the contract depends on
CIRCUIT_FILES := $(wildcard circuits/*.nr)
PROVER_FILES := $(wildcard provers/*.nr)

# Define the output files
CIRCUITS_JSON := ./target/circuits.json
CONTRACT_SOL := ./contracts/Verifier.sol

verifier: $(CONTRACT_SOL)

$(CONTRACT_SOL): $(CIRCUIT_FILES) $(PROVER_FILES)
	nargo compile
	bb write_vk -b ./target/circuits.json
	bb contract
	mkdir -p ./contracts
	cp ./target/contract.sol $@

