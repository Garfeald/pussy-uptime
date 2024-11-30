import { IValidator } from "../../../../types/types";
import cls from './BondedValidatorsList.module.scss'

interface BondedValidatorsListProps {
    className?: string,
    validators: Array<IValidator> | null
}

const BondedValidatorsList = (props: BondedValidatorsListProps) => {

    const { validators } = props

    if (validators?.length) {
        return (
            <div className={cls.bonded}>
                {validators.map((valid, index) => {
                    return <p>{`${index + 1}.${valid.description.moniker}`}</p>
                })}
            </div>
        );
    } else return 'Validators not found'
};

export default BondedValidatorsList;