import cls from './BondedValidatorsList.module.scss'
import { ReactComponent as Green } from "../../../../assets/green-circle.svg";
import { ReactComponent as Red } from "../../../../assets/red-circle.svg";
import { Typography } from "@mui/material";

interface BondedValidatorsListProps {
    className?: string,
    validators: Array<{ moniker: string, isSkips: boolean }>
}

const BondedValidatorsList = (props: BondedValidatorsListProps) => {

    const { validators } = props

    if (validators?.length) {
        return (
            <div className={cls.bonded}>
                {validators.map((valid, index) => {
                    return (
                        <div className={cls.monikerWrapper}>
                            <Typography
                                key={index}
                                component='p'
                                sx={{marginRight: '15px'}}
                            >
                                {`${index + 1}.${valid.moniker}`}
                            </Typography>
                            {valid.isSkips ? <Red className={cls.red}/> : <Green className={cls.green}/>}
                        </div>
                    )
                })}
            </div>
        );
    } else return 'Validators not found'
};

export default BondedValidatorsList;