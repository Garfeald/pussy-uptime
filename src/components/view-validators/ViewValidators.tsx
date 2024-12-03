import { useEffect, useState } from 'react';
import { IRoundState, IValidator } from "../../types/types";
import { getValidatorsList } from "../../servises/get-validators-list/getValidatorsList";
import cls from './ViewValidators.module.scss';
import BondedValidatorsList from "./ui/bonded-validators/BondedValidatorsList";
import { getConsensusState } from "../../servises/get-consensus-state/getConsensusState";
import UnbondedValidatorsList from "./ui/unbonded-validators/UnbondedValidatorsList";
import Preloader from "../preloader/Preloader";
import { Typography } from "@mui/material";
import LatestBlock from "../latest-block/LatestBlock";

export const ViewValidators = () => {

    const [validators, setValidators] = useState<Array<IValidator> | null>(null)

    const [unbondedValidators, setUnbondedValidators] = useState<Array<IValidator> | null>(null)

    const [roundState, setRoundState] = useState<IRoundState | null>(null)

    const [preCommits, setPreCommits] = useState<Array<string>>()

    const [filteredValidators, setFilteredValidators] = useState<Array<{ moniker: string, isSkips: boolean }>>([])

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
            const filteredValidators: Array<{ moniker: string, isSkips: boolean, pubKey: string }> = validators?.map(v => {
                if (pubKeysOfMissed.length && pubKeysOfMissed.includes(v.consensus_pubkey.key)) {
                    return {
                        moniker: v.description.moniker,
                        isSkips: true,
                        pubKey: v.consensus_pubkey.key
                    }
                } else return {
                    moniker: v.description.moniker,
                    isSkips: false,
                    pubKey: v.consensus_pubkey.key
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
        const intervalId = setInterval(getConsensusData, 3000)

        // Clearing the interval when unmounting a component
        return () => clearInterval(intervalId)
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