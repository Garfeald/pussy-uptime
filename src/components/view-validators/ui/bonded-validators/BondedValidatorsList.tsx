import cls from './BondedValidatorsList.module.scss'
import ValidatorCard from "../bonded-validators/validator-card/ValidatorCard";

interface BondedValidatorsListProps {
    validators: Array<{ moniker: string, isSkips: boolean, pubKey: string, missedBlockCounter: string }>
}

const BondedValidatorsList = (props: BondedValidatorsListProps) => {

    const { validators } = props

    return (
        <div className={cls.bonded}>
            {validators.map((valid, index) => {
                return (
                    <div className={cls.monikerWrapper} key={valid.pubKey}>
                        <ValidatorCard
                            pubKey={valid.pubKey}
                            moniker={valid.moniker}
                            missedBlockCounter={valid.missedBlockCounter}
                            isSkips={valid.isSkips}
                            index={index}
                        />
                    </div>
                    // <div className={cls.monikerWrapper} key={valid.pubKey}>
                    //     <Tooltip
                    //         title={valid.moniker}
                    //         placement="bottom-start"
                    //         arrow
                    //     >
                    //         <Typography
                    //             component='p'
                    //             sx={{ marginRight: '25px' }}
                    //         >
                    //             {`${index + 1}.${valid.moniker}`}
                    //         </Typography>
                    //     </Tooltip>
                    //     {valid.isSkips ? <Red className={cls.red}/> : <Green className={cls.green}/>}
                    //     <Typography
                    //         key={index}
                    //         component='span'
                    //         className={parseInt(valid.missedBlockCounter) > 10 ? cls.redCount : cls.greenCount}
                    //         sx={{ marginLeft: '15px' }}
                    //     >
                    //         {valid.missedBlockCounter}
                    //     </Typography>
                    // </div>
                )
            })}
        </div>
    );
};

export default BondedValidatorsList;