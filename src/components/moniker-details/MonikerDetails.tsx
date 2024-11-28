import { useState } from 'react';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BondStatus } from "../../types/types";
import { getValidatorsList } from "../../servises/get-validators-list/getValidatorsList";
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import cls from './MonikerDetails.module.css'
import * as React from "react";

interface MonikerDetailsProps {
    className?: string;
    monikers: Array<string>;
}

const MonikerDetails = (props: MonikerDetailsProps) => {

    const {
        className = '',
        monikers
    } = props

    return (
        <div>
            <AccordionDetails className={cls.monikerDetails}>
                <div>
                    {monikers?.map(moniker => {
                        return (
                            <Typography>
                                {moniker}
                            </Typography>
                        )
                    })}
                </div>
            </AccordionDetails>
        </div>
    );
};

export default MonikerDetails;