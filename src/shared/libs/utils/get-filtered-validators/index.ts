import { pubKeyToValcons } from "@shared/libs/utils/crypto-utils";
import { IFilteredValidator, IRoundState, ISigningInfos, IValidator } from "@shared/model/types/types";

/**
 * @description method of searching for validators that have skipped blocks, and assigning them corresponding
 *     indicators, and sorted by positions in cyber
 * @param preCommits
 * @param roundState
 * @param validators
 * @param signingInfo
 * @param setFilteredValidators
 */
export const getFilteredValidators = (
    preCommits: Array<string>,
    roundState: IRoundState | null,
    validators: Array<IValidator>,
    signingInfo: Array<ISigningInfos>,
    setFilteredValidators: (validators: Array<IFilteredValidator>) => void
) => {
    const indexesOfMissed: Array<number> = []
    const pubKeysOfMissed: Array<string> = []
    if (preCommits?.length) {
        preCommits.map((pre, index) => {
            if (pre === "nil-Vote") {
                indexesOfMissed.push(index)
            }
        })
    }
    if (roundState?.last_validators && indexesOfMissed.length) {
        roundState.last_validators.validators.map((val, index) => {
            if (indexesOfMissed.includes(index)) {
                pubKeysOfMissed.push(val.pub_key.value)
            }
        })
    }
    if (validators?.length) {
        const filteredValidatorsList: Array<IFilteredValidator> = validators?.map(v => {
            const valconsAddress = pubKeyToValcons({
                "@type": v.consensus_pubkey.type,
                key: v.consensus_pubkey.key
            }, 'pussyvalcons')
            const missed_blocks_counter = signingInfo.filter(info => info.address === valconsAddress).pop()?.missed_blocks_counter ?? '0'
            if (pubKeysOfMissed.length && pubKeysOfMissed.includes(v.consensus_pubkey.key)) {
                return {
                    moniker: v.description.moniker,
                    isSkips: true,
                    pubKey: v.consensus_pubkey.key,
                    missedBlockCounter: missed_blocks_counter
                }
            } else return {
                moniker: v.description.moniker,
                isSkips: false,
                pubKey: v.consensus_pubkey.key,
                missedBlockCounter: missed_blocks_counter
            }
        }).sort((a, b) => {
            if (roundState?.last_validators.validators.length) {
                const indexA = roundState.last_validators.validators.findIndex(v => v.pub_key.value === a.pubKey);
                const indexB = roundState.last_validators.validators.findIndex(v => v.pub_key.value === b.pubKey);
                return indexA - indexB;
            } else return 0
        })
        setFilteredValidators(filteredValidatorsList)
    }

    // return pubKeysOfMissed
}