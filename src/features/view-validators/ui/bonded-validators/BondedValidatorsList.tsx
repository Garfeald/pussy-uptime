import cls from './BondedValidatorsList.module.scss'
import ValidatorCard from "./validator-card/ValidatorCard";
import { memo } from "react";

interface BondedValidatorsListProps {
    validators: Array<{ moniker: string, isSkips: boolean, pubKey: string, missedBlockCounter: string }>,
    windowWidth: number
}

const BondedValidatorsList = memo((props: BondedValidatorsListProps) => {

    const { validators, windowWidth } = props

    return (
        <div className={cls.bonded}>
            {validators.map((valid, index) => {
                return (
                    <div key={valid.pubKey}>
                        <ValidatorCard
                            pubKey={valid.pubKey}
                            moniker={valid.moniker}
                            missedBlockCounter={valid.missedBlockCounter}
                            isSkips={valid.isSkips}
                            index={index}
                            windowWidth={windowWidth}
                        />
                    </div>
                )
            })}
        </div>
    );
});

export default BondedValidatorsList;