import axios, { AxiosResponse } from "axios";
import { BondStatus, IValidatorsList } from "../../../model/types/types";

export const getValidatorsList = async (status: BondStatus): Promise<AxiosResponse<IValidatorsList>> => {
    return await axios.get('https://lcd.space-pussy.cybernode.ai/cosmos/staking/v1beta1/validators', {
        params: {
            status
        }
    })
}