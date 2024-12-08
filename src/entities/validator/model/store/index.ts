import { create } from 'zustand'
import { IValidator } from "@shared/model/types/types";

export interface IValidatorStore {
    validators: Array<IValidator>
    setValidators: (validators: Array<IValidator>) => void
}

const useValidatorsStore = create<IValidatorStore>((setState, getState) => ({
    validators: [],
    setValidators: (validators) => setState(() => ({ validators: validators })),
}))

export default useValidatorsStore;