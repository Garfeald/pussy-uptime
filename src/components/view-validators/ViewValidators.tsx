import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BondStatus, IValidator, IValidatorsList, IValidatorState, IValidatorStateList } from "../../types/types";
import { getValidatorsList } from "../../servises/get-validators-list/getValidatorsList";
import { useEffect, useMemo, useState } from "react";
import { getValidatorState } from "../../servises/get-validator-state/getValidatorState";
import MonikerDetails from "../moniker-details/MonikerDetails";
import { getConsensusState } from "../../servises/get-consensus-state/getConsensusState";
import { getConsensusParams } from "../../servises/get-consensus-params/getConsensusParams";
import cls from './ViewValidators.module.scss';

export const ViewValidators = () => {

    const [expanded, setExpanded] = useState<BondStatus | null>(null);

    const [monikers, setMonikers] = useState<Array<string>>()

    const [validators, setValidators] = useState<Array<IValidator>>()

    const [validatorState, setValidatorState] = useState<Array<IValidatorState>>()

    const handleChange = (status: BondStatus) => {
        if (status === expanded) {
            setExpanded(null)
        } else setExpanded(status);
        getValidatorsList(status).then(res => {
            if (res.data.validators) {
                const _monikers = res.data.validators.map(v => v.description.moniker)
                setMonikers(_monikers)
            }
        }).catch(console.log)
    };

    useEffect(() => {
        getValidatorsList('BOND_STATUS_BONDED').then(res => {
            if (res.data.validators) {
                // console.log('RES@@@@', res.data.validators)
                setValidators(res.data.validators)
            }
        })
        getValidatorState().then(res => {
            if (res.data.info) {
                setValidatorState(res.data.info)
            }
        })
    }, [])

    const testRR = () => {
        if (validators?.length) {
            return validators.filter((validator, index) => {
                if (validatorState?.length) {
                    return validatorState.filter((valState, index) => {
                        if (valState.address === validator.operator_address) {
                            console.log('HUI!!!!', validator.description.moniker, 'ghjgecnbk', valState.missed_blocks_counter)
                        }
                    })
                }
            })
        }
    }

    getConsensusState().then(res => {
        // console.log('CONSENSSS', res)
    })

    getConsensusParams().then(res => {
        // console.log('PARAMS111', res)
    })

    testRR()

    const accordionList = useMemo(() => {
        return [
            {
                expanded: expanded === 'BOND_STATUS_BONDED',
                onChange: () => handleChange('BOND_STATUS_BONDED'),
                title: 'BONDED'
            },
            {
                expanded: expanded === 'BOND_STATUS_UNBONDED',
                onChange: () => handleChange('BOND_STATUS_UNBONDED'),
                title: 'UNBONDED'
            },
            {
                expanded: expanded === 'BOND_STATUS_UNBONDING',
                onChange: () => handleChange('BOND_STATUS_UNBONDING'),
                title: 'UNBONDING'
            }
        ]
    }, [expanded])

    const drawAccordion = useMemo(() => {
        return accordionList.map((acc) => {
            return (
                <Accordion
                    expanded={acc.expanded}
                    onChange={acc.onChange}
                    TransitionProps={{ timeout: 800 }}
                    className={cls.accordion}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography>{acc.title}</Typography>
                    </AccordionSummary>
                    <MonikerDetails monikers={monikers!}/>
                </Accordion>
            )
        })
    }, [monikers, accordionList])

    return (
        <div className={cls.ViewValidators}>
            <div>
                {drawAccordion}
            </div>
        </div>
    );
}