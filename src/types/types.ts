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

export interface IValidatorState {
    address: string,
    start_height: string,
    index_offset: string,
    jailed_until: string,
    tombstoned: boolean,
    missed_blocks_counter: string
}

export interface IValidatorStateList {
    info: Array<IValidatorState>
}

export type BondStatus = 'BOND_STATUS_BONDED' | 'BOND_STATUS_UNSPECIFIED' | 'BOND_STATUS_UNBONDED' | 'BOND_STATUS_UNBONDING'