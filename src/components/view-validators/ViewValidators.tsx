import { useEffect, useState } from 'react';
import { IValidator } from "../../types/types";
import { getValidatorsList } from "../../servises/get-validators-list/getValidatorsList";
import cls from './ViewValidators.module.scss';
import BondedValidatorsList from "./ui/bonded-validators/BondedValidatorsList";
import UnbondedValidatorsList from "./ui/unbonded-validators/UnbondedValidatorsList";
import { getConsensusState } from "../../servises/get-consensus-state/getConsensusState";

export const ViewValidators = () => {

    const [validators, setValidators] = useState<Array<IValidator> | null>(null)

    const [unbondedValidators, setUnbondedValidators] = useState<Array<IValidator> | null>(null)

    // const [validatorState, setValidatorState] = useState<Array<IValidatorState>>()

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
        getConsensusState()
    }, [])

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
                <BondedValidatorsList validators={validators}/>
                <UnbondedValidatorsList validators={unbondedValidators}/>
            </div>
        </div>
    );
}