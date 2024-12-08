import { IValidator } from "@shared/model/types/types";
import cls from './UnbondedValidatorsList.module.scss'
import { memo, useCallback, useState } from "react";
import { Button, Tooltip, Typography } from "@mui/material";

interface UnbondedValidatorsListProps {
    validators: Array<IValidator> | null
}

const UnbondedValidatorsList = memo((props: UnbondedValidatorsListProps) => {

    const { validators } = props

    const [show, setShow] = useState<boolean>(false)
    
    const handleSetShow = useCallback(() => {
        return setShow(!show)
    }, [show])

    if (validators?.length) {
        return (
            <div className={cls.unbonded_wrapper}>
                <Button
                    variant='outlined'
                    onClick={handleSetShow}
                >
                    {!show ? 'Heroes at rest' : 'Hide'}
                </Button>
                {show && <div className={cls.unbonded}>
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
});

export default UnbondedValidatorsList;