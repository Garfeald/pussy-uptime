import { ReactComponent as Red } from "@shared/assets/red-circle.svg";
import { ReactComponent as Green } from "@shared/assets/green-circle.svg";
import { Tooltip, Typography } from "@mui/material";
import cls from '../BondedValidatorsList.module.scss'
import { memo } from "react";

interface ValidatorCardProps {
    pubKey: string,
    moniker: string,
    index: number,
    isSkips: boolean,
    missedBlockCounter: string
}

const ValidatorCard = memo((props: ValidatorCardProps) => {

    const { moniker, index, missedBlockCounter, isSkips} = props

    return (
        <>
            <Tooltip
                title={moniker}
                placement="bottom-start"
                arrow
            >
                <Typography
                    component='p'
                    sx={{ marginRight: '25px' }}
                >
                    {`${index + 1}.${moniker}`}
                </Typography>
            </Tooltip>
            {isSkips ? <Red className={cls.red}/> : <Green className={cls.green}/>}
            <Typography
                key={index}
                component='span'
                className={parseInt(missedBlockCounter) > 10 ? cls.redCount : cls.greenCount}
                sx={{ marginLeft: '15px' }}
            >
                {missedBlockCounter}
            </Typography>
        </>
    );
});

export default ValidatorCard;