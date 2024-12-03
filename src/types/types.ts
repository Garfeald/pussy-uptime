export interface IDescription {
    details: string,
    identity: string,
    moniker: string,
    security_contact: string,
    website: string
}

export interface IValidator {
    commission: {
        commission_rates: {
            max_change_rate: string
            max_rate: string
            rate: string
        },
        update_time: string
    },
    consensus_pubkey: {
        type: string
        key: string
    },
    delegator_shares: string,
    description: IDescription
    jailed: boolean,
    min_self_delegation: string,
    operator_address: string,
    status: string,
    tokens: string,
    unbonding_height: string,
    unbonding_time: string
}

export interface IValidatorsList {
    validators: Array<IValidator>
}

export interface ISigningInfos {
    address: string,
    start_height: string,
    index_offset: string,
    jailed_until: string,
    tombstoned: boolean,
    missed_blocks_counter: string
}

export interface ISigningInfosList {
    info: Array<ISigningInfos>
}

export type BondStatus =
    'BOND_STATUS_BONDED'
    | 'BOND_STATUS_UNSPECIFIED'
    | 'BOND_STATUS_UNBONDED'
    | 'BOND_STATUS_UNBONDING'

export interface IConsensusParams {
    jsonrpc: string,
    id: number,
    result: {
        block_height: string,
        consensus_params: {
            block: {
                max_bytes: string,
                max_gas: string,
                time_iota_ms: string
            },
            evidence: {
                max_age_num_blocks: string,
                max_age_duration: string,
                max_bytes: string
            },
            validator: {
                pub_key_types: [
                    string
                ]
            },
            version: {}
        }
    }
}

export interface IRoundState {
    height: string,
    round: number,
    step: number,
    start_time: string,
    commit_time: string,
    validators: {
        validators: [
            {
                address: string,
                pub_key: {
                    type: string,
                    value: string
                },
                voting_power: string,
                proposer_priority: string
            },
        ],
        proposer: {
            address: string,
            pub_key: {
                type: string,
                value: string
            },
            voting_power: string,
            proposer_priority: string
        }
    },
    proposal: string | null,
    proposal_block: string | null,
    proposal_block_parts: string | null,
    locked_round: number,
    locked_block: string | null,
    locked_block_parts: string | null,
    valid_round: number,
    valid_block: string | null,
    valid_block_parts: string | null,
    votes: [
        {
            round: number,
            prevotes: Array<string>,
            prevotes_bit_array: string,
            precommits: Array<string>,
            precommits_bit_array: string
        }
    ],
    commit_round: number,
    last_commit: {
        votes: Array<string>,
        votes_bit_array: string,
        peer_maj_23s: {}
    },
    last_validators: {
        validators: [
            {
                address: string,
                pub_key: {
                    type: string,
                    value: string
                },
                voting_power: string,
                proposer_priority: string
            },
        ],
        proposer: {
            address: string,
            pub_key: {
                type: string,
                value: string
            },
            voting_power: string,
            proposer_priority: string
        }
    },
    triggered_timeout_precommit: boolean
}

export interface IConsensusDumpState {
    jsonrpc: string,
    id: number,
    result: {
        round_state: IRoundState,
        peers: [
            {
                node_address: string,
                peer_state: {
                    round_state: {
                        height: string,
                        round: number,
                        step: number,
                        start_time: string,
                        proposal: boolean,
                        proposal_block_part_set_header: {
                            total: number,
                            hash: string
                        },
                        proposal_block_parts: string | null,
                        proposal_pol_round: number,
                        proposal_pol: string
                        prevotes: string,
                        precommits: string,
                        last_commit_round: number,
                        last_commit: string,
                        catchup_commit_round: number,
                        catchup_commit: string
                    },
                    stats: {
                        votes: string,
                        block_parts: string
                    }
                }
            },
        ]
    }
}
