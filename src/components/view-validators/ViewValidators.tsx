import { useEffect, useState } from 'react';
import { IRoundState, IValidator } from "../../types/types";
import { getValidatorsList } from "../../servises/get-validators-list/getValidatorsList";
import cls from './ViewValidators.module.scss';
import BondedValidatorsList from "./ui/bonded-validators/BondedValidatorsList";
import UnbondedValidatorsList from "./ui/unbonded-validators/UnbondedValidatorsList";
import { getConsensusState } from "../../servises/get-consensus-state/getConsensusState";

export const ViewValidators = () => {

    const [validators, setValidators] = useState<Array<IValidator> | null>(null)

    const [unbondedValidators, setUnbondedValidators] = useState<Array<IValidator> | null>(null)

    const [roundState, setRoundState] = useState<IRoundState | null>(null)

    const [preCommits, setPreCommits] = useState<Array<string>>()

    const [filteredValidators, setFilteredValidators] = useState<Array<{moniker: string, isSkips: boolean}>>([])

    // const handleChange = (status: BondStatus) => {
    //     if (status === expanded) {
    //         setExpanded(null)
    //     } else setExpanded(status);
    //     getValidatorsList(status).then(res => {
    //         if (res.data.validators) {
    //             const _monikers = res.data.validators.map(v => v.description.moniker)
    //             setMonikers(_monikers)
    //         }
    //     }).catch(console.log)
    // };

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
        // getValidatorState().then(res => {
        //     if (res.data.info) {
        //         setValidatorState(res.data.info)
        //     }
        // })

    }, [])



    const getFilteredValidators = () => {
        const indexesOfMissed: Array<number> = []
        const pubKeysOfMissed: Array<string> = []
        if (preCommits?.length) {
            preCommits.map((pre, index ) => {
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
            const filteredValidators: Array<{moniker: string, isSkips: boolean}> = validators?.map(v => {
                if (pubKeysOfMissed.length && pubKeysOfMissed.includes(v.consensus_pubkey.key)) {
                    return {
                        moniker: v.description.moniker,
                        isSkips: true
                    }
                } else return {
                    moniker: v.description.moniker,
                    isSkips: false
                }
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
        getConsensusData()
        const intervalId = setInterval(getConsensusData, 3000)

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {
        if (preCommits && roundState) {
            getFilteredValidators()
        }
    }, [preCommits, roundState])

    // const testRR = () => {
    //     if (validators?.length) {
    //         return validators.filter((validator, index) => {
    //             if (validatorState?.length) {
    //                 return validatorState.filter((valState, index) => {
    //                     if (valState.address === validator.operator_address) {
    //                         console.log('HUI!!!!', validator.description.moniker, 'ghjgecnbk',
    // valState.missed_blocks_counter) } }) } }) } }   getConsensusParams().then(res => {  })  testRR()

    return (
        <div className={cls.ViewValidators}>
            <div>
                {!!filteredValidators && <BondedValidatorsList validators={filteredValidators}/>}
                <UnbondedValidatorsList validators={unbondedValidators}/>
            </div>
        </div>
    );
}