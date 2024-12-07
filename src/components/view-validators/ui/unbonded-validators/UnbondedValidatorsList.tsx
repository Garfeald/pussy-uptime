import { IValidator } from "../../../../shared/model/types/types";
import cls from './UnbondedValidatorsList.module.scss'
import { useState } from "react";
import { Button, Tooltip, Typography } from "@mui/material";

interface BondedValidatorsListProps {
    className?: string,
    validators: Array<IValidator> | null
}

const UnbondedValidatorsList = (props: BondedValidatorsListProps) => {

    const { validators } = props

    const [show, setShow] = useState<boolean>(false)

    if (validators?.length) {
        return (
            <div className={cls.unbonded_wrapper}>
                <Button
                    variant='outlined'
                    onClick={() => setShow(!show)}
                >
                    {!show ? 'Heroes at rest' : 'Hide'}
                </Button>
                {show && <div className={cls.unbonded}>
                    {validators.map((valid, index) => {
                        return (
                            <div className={cls.monikerWrapper}>
                                <Tooltip
                                    title={valid.description.moniker}
                                    placement="bottom-start"
                                    arrow
                                >
                                    <Typography
                                        key={index}
                                        component='p'
                                    >
                                        {`${index + 1}.${valid.description.moniker}`}
                                    </Typography>
                                </Tooltip>
                            </div>
                        )
                    })}
                </div>}
            </div>
        );
    } else return 'Validators not found'
};

export default UnbondedValidatorsList;