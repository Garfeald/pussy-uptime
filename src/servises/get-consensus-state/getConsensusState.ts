import axios, { AxiosResponse } from "axios";
import { IConsensusDumpState } from "../../types/types";

export const getConsensusState = async (): Promise<AxiosResponse<IConsensusDumpState>> => {
    return await axios.get('https://rpc.space-pussy.cybernode.ai/dump_consensus_state')
}