import { useEffect } from 'react';
import cls from './ViewValidators.module.scss';
import BondedValidatorsList from "./ui/bonded-validators/BondedValidatorsList";
import UnbondedValidatorsList from "./ui/unbonded-validators/UnbondedValidatorsList";
import Preloader from "@shared/ui/preloader/Preloader";
import { Typography } from "@mui/material";
import LatestBlock from "../latest-block/LatestBlock";
import useValidatorsStore from "@entities/validator/model/store";
import useConsensusStore from "@entities/consensus/model/store";
import { getFilteredValidators } from "@shared/libs/utils/get-filtered-validators";

export const ViewValidators = () => {

    const {
        validators,
        getValidators,
        unBondedValidators,
        getSigningInfo,
        signingInfo,
        setFilteredValidators,
        filteredValidators
    } = useValidatorsStore();

    const { preCommits, roundState, getConsensusData } = useConsensusStore()

    useEffect(() => {
        getValidators('BOND_STATUS_BONDED')
        getValidators('BOND_STATUS_UNBONDED')
    }, [getValidators])

    // /**
    //  * method of searching for validators that have skipped blocks, and assigning them corresponding indicators, and
    //  * sorted by positions in cyber
    //  */
    // const getFilteredValidators = useCallback(() => {
    //     const indexesOfMissed: Array<number> = []
    //     const pubKeysOfMissed: Array<string> = []
    //     if (preCommits?.length) {
    //         preCommits.map((pre, index) => {
    //             if (pre === "nil-Vote") {
    //                 indexesOfMissed.push(index)
    //             }
    //         })
    //     }
    //     if (roundState?.last_validators && indexesOfMissed.length) {
    //         roundState.last_validators.validators.map((val, index) => {
    //             if (indexesOfMissed.includes(index)) {
    //                 pubKeysOfMissed.push(val.pub_key.value)
    //             }
    //         })
    //     }
    //     if (validators?.length) {
    //         const filteredValidatorsList: Array<{ moniker: string, isSkips: boolean, pubKey: string, missedBlockCounter: string }> = validators?.map(v => {
    //             const valconsAddress = pubKeyToValcons({
    //                 "@type": v.consensus_pubkey.type,
    //                 key: v.consensus_pubkey.key
    //             }, 'pussyvalcons')
    //             const missed_blocks_counter = signingInfo.filter(info => info.address === valconsAddress).pop()?.missed_blocks_counter ?? '0'
    //             if (pubKeysOfMissed.length && pubKeysOfMissed.includes(v.consensus_pubkey.key)) {
    //                 return {
    //                     moniker: v.description.moniker,
    //                     isSkips: true,
    //                     pubKey: v.consensus_pubkey.key,
    //                     missedBlockCounter: missed_blocks_counter
    //                 }
    //             } else return {
    //                 moniker: v.description.moniker,
    //                 isSkips: false,
    //                 pubKey: v.consensus_pubkey.key,
    //                 missedBlockCounter: missed_blocks_counter
    //             }
    //         }).sort((a, b) => {
    //             if (roundState?.last_validators.validators.length) {
    //                 const indexA = roundState.last_validators.validators.findIndex(v => v.pub_key.value === a.pubKey);
    //                 const indexB = roundState.last_validators.validators.findIndex(v => v.pub_key.value === b.pubKey);
    //                 return indexA - indexB;
    //             } else return 0
    //         })
    //         setFilteredValidators(filteredValidatorsList)
    //     }
    //
    //     return pubKeysOfMissed
    // }, [preCommits, roundState?.last_validators, setFilteredValidators, signingInfo, validators])

    useEffect(() => {
        getSigningInfo()
        const intervalInfo = setInterval(getSigningInfo, 3000)
        const intervalId = setInterval(getConsensusData, 3000)

        // Clearing the interval when unmounting a component
        return () => {
            clearInterval(intervalInfo)
            clearInterval(intervalId)
        }
    }, [])

    useEffect(() => {
        if (preCommits && roundState) {
            getFilteredValidators(
                preCommits,
                roundState,
                validators,
                signingInfo,
                setFilteredValidators
            )
        }
    }, [preCommits, roundState, setFilteredValidators, signingInfo, validators])

    const drawValidators = () => {
        if (filteredValidators.length) {
            return (
                <>
                    <LatestBlock blockHeight={roundState?.height}/>
                    <BondedValidatorsList validators={filteredValidators}/>
                    <UnbondedValidatorsList validators={unBondedValidators}/>
                </>
            )
        } else {
            return (
                <div className={cls.preloaderWrap}>
                    <Preloader/>
                    <Typography
                        component='h1'
                        style={{fontSize: '600'}}
                    >
                        {'Loading...'}
                    </Typography>
                </div>
            )
        }
    }

    return (
        <div className={cls.ViewValidators}>
            <div className={cls.wrapper}>
                {drawValidators()}
            </div>
        </div>
    );
}