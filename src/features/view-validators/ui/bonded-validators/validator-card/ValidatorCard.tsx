import { ReactComponent as Red } from "@shared/assets/red-circle.svg";
import { ReactComponent as Green } from "@shared/assets/green-circle.svg";
import { Tooltip, Typography } from "@mui/material";
import cls from '../BondedValidatorsList.module.scss'
import { memo, useState } from "react";
import { classNames, Mods } from "@shared/libs/utils/class-names/classNames";

interface ValidatorCardProps {
    pubKey: string,
    moniker: string,
    index: number,
    isSkips: boolean,
    missedBlockCounter: string,
    windowWidth: number
}

const ValidatorCard = memo((props: ValidatorCardProps) => {

    const { moniker, index, missedBlockCounter, isSkips, windowWidth} = props

    const [showCount, setShowCount] = useState<boolean>(false)

    const handleClick = () => setShowCount(!showCount)

    const countMods: Mods = {
        [cls.redCount]: parseInt(missedBlockCounter) > 10,
        [cls.greenCount]: parseInt(missedBlockCounter) < 10,
        [cls.hideCount]: !showCount
    }

    const indicatorMods: Mods = {
        [cls.hideIndicator]: showCount
    }

    const drawContent = () => {
        if (windowWidth <= 450) {
            return (
                <div className={cls.monikerWrapper} onClick={handleClick}>
                    <Tooltip
                        title={moniker}
                        placement="bottom-start"
                        arrow
                    >
                        <Typography
                            component='p'
                            className={cls.moniker}
                        >
                            {`${index + 1}. ${moniker}`}
                        </Typography>
                    </Tooltip>
                    <div className={classNames('', indicatorMods, [])}>{isSkips ? <Red className={cls.red}/> : <Green className={cls.green}/>}</div>
                    <Typography
                        key={index}
                        component='span'
                        className={classNames(cls.count, countMods, [])}
                        sx={{ marginLeft: '15px' }}
                    >
                        {`${missedBlockCounter}/10000`}
                    </Typography>
                </div>
            )
        } else {
            return (
                <div className={cls.monikerWrapper}>
                    <Tooltip
                        title={moniker}
                        placement="bottom-start"
                        arrow
                    >
                        <Typography
                            component='p'
                            sx={{ marginRight: '25px' }}
                        >
                            {`${index + 1}. ${moniker}`}
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
                </div>
            )
        }
    }

    return drawContent();
});

export default ValidatorCard;