import { create } from 'zustand'
import { IRoundState } from "@shared/model/types/types";
import { getConsensusState } from "@shared/api/servises/get-consensus-state/getConsensusState";

export interface IConsensusStore {
    roundState: IRoundState | null,
    preCommits: Array<string>,
    getConsensusData: () => Promise<void>
}

const useConsensusStore = create<IConsensusStore>((set) => ({
    roundState: null,
    preCommits: [],
    getConsensusData: async () => getConsensusState().then(res => {
        if (res.data.result) {
            set({ roundState: res.data.result.round_state })
            set({ preCommits: res.data.result.round_state.last_commit.votes })
        }
    })
}))

export default useConsensusStore;