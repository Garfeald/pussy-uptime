import axios, { AxiosResponse } from "axios";

export const getConsensusState = async (): Promise<AxiosResponse<any>> => {
    return await axios.get('https://rpc.space-pussy.cybernode.ai/dump_consensus_state')
}