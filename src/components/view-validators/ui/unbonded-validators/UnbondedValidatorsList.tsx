import { IValidator } from "../../../../types/types";
import cls from './UnbondedValidatorsList.module.scss'
import { useState } from "react";
import { Button } from "@mui/material";

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
                    {!show ? 'Show unbonded validators' : 'Hide unbonded validators'}
                </Button>
                {show && <div className={cls.unbonded}>
                    {validators.map((valid, index) => {
                        return <p key={index}>{`${index + 1}.${valid.description.moniker}`}</p>
                    })}
                </div>}
            </div>
        );
    } else return 'Validators not found'
};

export default UnbondedValidatorsList;