import axios, { AxiosResponse } from "axios";
import { IValidatorState, IValidatorStateList } from "../../types/types";

export const getValidatorState = async (): Promise<AxiosResponse<IValidatorStateList>> => {
    return await axios.get('https://lcd.space-pussy.cybernode.ai/cosmos/slashing/v1beta1/signing_infos')
}