import axios, { AxiosResponse } from "axios";
import { IConsensusParams } from "../../../model/types/types";

export const getConsensusParams = async (): Promise<AxiosResponse<IConsensusParams>> => {
    return await axios.get('https://rpc.space-pussy.cybernode.ai/consensus_params')
}

