import { useEffect, useState } from 'react';
import { IRoundState, ISigningInfos, IValidator } from "../../types/types";
import { getValidatorsList } from "../../servises/get-validators-list/getValidatorsList";
import cls from './ViewValidators.module.scss';
import BondedValidatorsList from "./ui/bonded-validators/BondedValidatorsList";
import { getConsensusState } from "../../servises/get-consensus-state/getConsensusState";
import UnbondedValidatorsList from "./ui/unbonded-validators/UnbondedValidatorsList";
import Preloader from "../preloader/Preloader";
import { Typography } from "@mui/material";
import LatestBlock from "../latest-block/LatestBlock";
import { pubKeyToValcons } from "../../utils/utils";
import { getSigningInfos } from "../../servises/get-validator-state/getValidatorState";

export const ViewValidators = () => {

    const [validators, setValidators] = useState<Array<IValidator> | null>(null)

    const [unbondedValidators, setUnbondedValidators] = useState<Array<IValidator> | null>(null)

    const [roundState, setRoundState] = useState<IRoundState | null>(null)

    const [preCommits, setPreCommits] = useState<Array<string>>()

    const [filteredValidators, setFilteredValidators] = useState<Array<{ moniker: string, isSkips: boolean, pubKey: string, missedBlockCounter: string }>>([])

    const [signingInfo, setSigningInfo] = useState<Array<ISigningInfos>>([])

    useEffect(() => {
        getValidatorsList('BOND_STATUS_BONDED').then(res => {
            if (res.data.validators) {
                setValidators(res.data.validators)
            }
        })
        getValidatorsList('BOND_STATUS_UNBONDED').then(res => {
            if (res.data.validators) {
                setUnbondedValidators(res.data.validators)
            }
        })
    }, [])

    // console.log('VALCONS!!!!', valconsToBase64('pussyvalcons1pqyl8rj0tk5wlzht4xcfvfy8jhqusa7y79j8ah'))

    const getInfo = async () => {
        await getSigningInfos().then(res => {
            if (res.data.info) {
                setSigningInfo(res.data.info)
            }
        })
    }

    /**
     * method of searching for validators that have skipped blocks, and assigning them corresponding indicators, and
     * sorted by positions in cyber
     */
    const getFilteredValidators = () => {
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
            const filteredValidators: Array<{ moniker: string, isSkips: boolean, pubKey: string, missedBlockCounter: string }> = validators?.map(v => {
                const valconsAddress = pubKeyToValcons({"@type": v.consensus_pubkey.type, key: v.consensus_pubkey.key}, 'pussyvalcons')
                const missed_blocks_counter = signingInfo.filter(info => info.address === valconsAddress).pop()?.missed_blocks_counter ?? 0
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
            setFilteredValidators(filteredValidators)
        }

        return pubKeysOfMissed
    }

    const getConsensusData = async () => {
        return await getConsensusState().then(res => {
            if (res.data.result) {
                setRoundState(res.data.result.round_state)
                setPreCommits(res.data.result.round_state.last_commit.votes)
            }
        })
    }

    useEffect(() => {
        getInfo()
        const intervalInfo = setInterval(getInfo, 3000)
        const intervalId = setInterval(getConsensusData, 3000)

        // Clearing the interval when unmounting a component
        return () => {
            clearInterval(intervalInfo)
            clearInterval(intervalId)
        }
    }, [])

    useEffect(() => {
        if (preCommits && roundState) {
            getFilteredValidators()
        }
    }, [preCommits, roundState])

    const drawValidators = () => {
        if (filteredValidators.length) {
            return (
                <>
                    <LatestBlock blockHeight={roundState?.height}/>
                    <BondedValidatorsList validators={filteredValidators}/>
                    <UnbondedValidatorsList validators={unbondedValidators}/>
                </>
            )
        } else {
            return (
                <div className={cls.preloaderWrap}>
                    <Preloader/>
                    <Typography
                        component='h1'
                    >
                        {'Loading'}
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