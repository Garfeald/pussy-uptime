import { create } from 'zustand'
import { BondStatus, IFilteredValidator, ISigningInfos, IValidator } from "@shared/model/types/types";
import { getValidatorsList } from "@shared/api/servises/get-validators-list/getValidatorsList";
import { getSigningInfos } from "@shared/api/servises/get-validator-state/getValidatorState";

export interface IValidatorStore {
    validators: Array<IValidator>,
    unBondedValidators: Array<IValidator>,
    getValidators: (status: BondStatus) => Promise<void>,
    signingInfo: Array<ISigningInfos>,
    filteredValidators: Array<IFilteredValidator>,
    setFilteredValidators: (validators: Array<IFilteredValidator>) => void,
    getSigningInfo: () => Promise<void>
}

const useValidatorsStore = create<IValidatorStore>((set) => ({
    validators: [],
    unBondedValidators: [],
    signingInfo: [],
    filteredValidators: [],

    getSigningInfo: async () => getSigningInfos().then(res => {
        if (res.data.info) {
            set({ signingInfo: res.data.info })
        }
    }).catch(console.log),

    getValidators: async (status: BondStatus) => getValidatorsList(status).then(res => {
        if (res.data.validators) {
            if (status === 'BOND_STATUS_UNBONDED') {
                set({ unBondedValidators: res.data.validators })
            } else {
                set({ validators: res.data.validators })
            }
        }
    }).catch(console.log),

    setFilteredValidators: (validators: Array<IFilteredValidator>) => set({
        filteredValidators: validators
    })

}))

export default useValidatorsStore;