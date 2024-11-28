import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BondStatus, IValidator, IValidatorsList, IValidatorState, IValidatorStateList } from "../../types/types";
import { getValidatorsList } from "../../servises/get-validators-list/getValidatorsList";
import { useEffect, useState } from "react";
import { getValidatorState } from "../../servises/get-validator-state/getValidatorState";
import MonikerDetails from "../moniker-details/MonikerDetails";
import { getConsensusState } from "../../servises/get-consensus-state/getConsensusState";

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
                console.log('RES@@@@', res.data.validators)
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
            return  validators.filter((validator, index) => {
                if (validatorState?.length) {
                    return  validatorState.filter((valState, index) => {
                        if (valState.address === validator.operator_address) {
                            console.log('HUI!!!!', validator.description.moniker, 'ghjgecnbk', valState.missed_blocks_counter)
                        }
                    })
                }
            })
        }
    }

    getConsensusState().then(res => {
        console.log('CONSENSSS', res)
    })

    console.log('Valic', validators)

    testRR()


    return (
        <div>
            <Accordion expanded={expanded === 'BOND_STATUS_BONDED'} onChange={() => handleChange('BOND_STATUS_BONDED')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography>BONDED</Typography>
                </AccordionSummary>
                <MonikerDetails monikers={monikers!}/>
            </Accordion>
            <Accordion expanded={expanded === 'BOND_STATUS_UNBONDED'}
                       onChange={() => handleChange('BOND_STATUS_UNBONDED')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography>UNBONDED</Typography>
                </AccordionSummary>
                <MonikerDetails monikers={monikers!}/>
            </Accordion>
            <Accordion expanded={expanded === 'BOND_STATUS_UNBONDING'}
                       onChange={() => handleChange('BOND_STATUS_UNBONDING')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography>UNBONDING</Typography>
                </AccordionSummary>
                <MonikerDetails monikers={monikers!}/>
            </Accordion>
        </div>
    );
}