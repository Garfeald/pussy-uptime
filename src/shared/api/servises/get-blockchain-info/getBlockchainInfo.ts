import axios, { AxiosResponse } from "axios";

export const getBlockchainInfo = async (): Promise<AxiosResponse<any>> => {
    return await axios.get('https://rpc.space-pussy.cybernode.ai/blockchain')
}

