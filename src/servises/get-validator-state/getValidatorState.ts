import axios, { AxiosResponse } from "axios";
import { ISigningInfosList } from "../../types/types";

export const getSigningInfos = async (): Promise<AxiosResponse<ISigningInfosList>> => {
    return await axios.get('https://lcd.space-pussy.cybernode.ai/cosmos/slashing/v1beta1/signing_infos')
}