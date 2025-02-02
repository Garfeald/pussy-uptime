import { IValidator } from "@shared/model/types/types";
import cls from './UnbondedValidatorsList.module.scss'
import { memo } from "react";
import { Tooltip, Typography } from "@mui/material";

interface UnbondedValidatorsListProps {
    validators: Array<IValidator> | null
}

const UnbondedValidatorsList = memo((props: UnbondedValidatorsListProps) => {

    const { validators } = props

    if (validators?.length) {
        return (
            <div className={cls.unbonded}>
                {validators.map((valid, index) => {
                    return (
                        <div className={cls.monikerWrapper} key={valid.consensus_pubkey.key}>
                            <Tooltip
                                title={valid.description.moniker}
                                placement="bottom-start"
                                arrow
                            >
                                <Typography
                                    key={index}
                                    component='p'
                                    className={cls.moniker}
                                >
                                    {`${index + 1}. ${valid.description.moniker}`}
                                </Typography>
                            </Tooltip>
                        </div>
                    )
                })}
            </div>
        );
    } else return 'Validators not found'
});

export default UnbondedValidatorsList;