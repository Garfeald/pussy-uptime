import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import cls from './ViewValidators.module.scss';
import BondedValidatorsList from "./ui/bonded-validators/BondedValidatorsList";
import UnbondedValidatorsList from "./ui/unbonded-validators/UnbondedValidatorsList";
import useValidatorsStore from "@entities/validator/model/store";
import useConsensusStore from "@entities/consensus/model/store";
import { getFilteredValidators } from "@shared/libs/utils/get-filtered-validators";
import TabsComponent from "@shared/ui/tabs/TabsComponent";
import LensBlurRoundedIcon from '@mui/icons-material/LensBlurRounded';
import BlurOffRoundedIcon from '@mui/icons-material/BlurOffRounded';
import PreloaderHexagon from "@shared/ui/preloaders/preloader-flower/PreloaderHexagon";

export const ViewValidators = () => {

    const {
        validators,
        getValidators,
        unBondedValidators,
        getSigningInfo,
        signingInfo,
        setFilteredValidators,
        filteredValidators
    } = useValidatorsStore();

    const { preCommits, roundState, getConsensusData } = useConsensusStore()

    const [tab, setTab] = useState<'BONDED' | 'UNBONDED'>('BONDED');

    useEffect(() => {
        getValidators('BOND_STATUS_BONDED')
        getValidators('BOND_STATUS_UNBONDED').then()
    }, [getValidators])

    // /**
    //  * method of searching for validators that have skipped blocks, and assigning them corresponding indicators, and
    //  * sorted by positions in cyber
    //  */
    // const getFilteredValidators = useCallback(() => {
    //     const indexesOfMissed: Array<number> = []
    //     const pubKeysOfMissed: Array<string> = []
    //     if (preCommits?.length) {
    //         preCommits.map((pre, index) => {
    //             if (pre === "nil-Vote") {
    //                 indexesOfMissed.push(index)
    //             }
    //         })
    //     }
    //     if (roundState?.last_validators && indexesOfMissed.length) {
    //         roundState.last_validators.validators.map((val, index) => {
    //             if (indexesOfMissed.includes(index)) {
    //                 pubKeysOfMissed.push(val.pub_key.value)
    //             }
    //         })
    //     }
    //     if (validators?.length) {
    //         const filteredValidatorsList: Array<{ moniker: string, isSkips: boolean, pubKey: string, missedBlockCounter: string }> = validators?.map(v => {
    //             const valconsAddress = pubKeyToValcons({
    //                 "@type": v.consensus_pubkey.type,
    //                 key: v.consensus_pubkey.key
    //             }, 'pussyvalcons')
    //             const missed_blocks_counter = signingInfo.filter(info => info.address === valconsAddress).pop()?.missed_blocks_counter ?? '0'
    //             if (pubKeysOfMissed.length && pubKeysOfMissed.includes(v.consensus_pubkey.key)) {
    //                 return {
    //                     moniker: v.description.moniker,
    //                     isSkips: true,
    //                     pubKey: v.consensus_pubkey.key,
    //                     missedBlockCounter: missed_blocks_counter
    //                 }
    //             } else return {
    //                 moniker: v.description.moniker,
    //                 isSkips: false,
    //                 pubKey: v.consensus_pubkey.key,
    //                 missedBlockCounter: missed_blocks_counter
    //             }
    //         }).sort((a, b) => {
    //             if (roundState?.last_validators.validators.length) {
    //                 const indexA = roundState.last_validators.validators.findIndex(v => v.pub_key.value === a.pubKey);
    //                 const indexB = roundState.last_validators.validators.findIndex(v => v.pub_key.value === b.pubKey);
    //                 return indexA - indexB;
    //             } else return 0
    //         })
    //         setFilteredValidators(filteredValidatorsList)
    //     }
    //
    //     return pubKeysOfMissed
    // }, [preCommits, roundState?.last_validators, setFilteredValidators, signingInfo, validators])

    // const [random, setRandom] = useState<number | null>(null)

    useEffect(() => {
        // setRandom(Math.floor(Math.random() * 11) + 1)
        getSigningInfo()
        const intervalInfo = setInterval(getSigningInfo, 3000)
        const intervalId = setInterval(getConsensusData, 3100)

        // Clearing the interval when unmounting a component
        return () => {
            clearInterval(intervalInfo)
            clearInterval(intervalId)
        }
    }, [getConsensusData, getSigningInfo])

    useEffect(() => {
        if (preCommits && roundState) {
            getFilteredValidators(
                preCommits,
                roundState,
                validators,
                signingInfo,
                setFilteredValidators
            )
        }
    }, [preCommits, roundState, setFilteredValidators, signingInfo, validators])

    // const drawPreloader = () => {
    //     if (random) {
    //         if (random > 5) {
    //             return <PreloaderSpinCircles/>
    //         } else return <Preloader/>
    //     } else {
    //         return <></>
    //     }
    // }

    const handleChangeTab = useCallback((event: SyntheticEvent, newValue: 'BONDED' | 'UNBONDED') => {
        event.preventDefault()
        setTab(newValue)
    }, [])

    const tabInfo = [
        {label: 'uptime', value: 'BONDED', icon: <LensBlurRoundedIcon fontSize='large'/>},
        {label: 'at rest', value: 'UNBONDED', icon: <BlurOffRoundedIcon fontSize='large'/>}
    ]

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const updateDimensions = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    const drawValidators = () => {
        if (filteredValidators.length) {
            return (
                <>
                    {/*<LatestBlock blockHeight={roundState?.height}/>*/}
                    <TabsComponent<'BONDED' | 'UNBONDED'>
                        onChangeTab={handleChangeTab}
                        tabInfo={tabInfo}
                        tabValue={tab}
                        direction={windowWidth <= 850 ? 'center' : 'start'}
                    />
                    {tab === 'BONDED'
                        ? <BondedValidatorsList validators={filteredValidators} windowWidth={windowWidth} />
                        : <UnbondedValidatorsList validators={unBondedValidators} />
                    }
                </>
            )
        } else {
            return <PreloaderHexagon/>
        }
    }

    return (
        <div className={cls.ViewValidators}>
            <div className={cls.wrapper}>
                {drawValidators()}
            </div>
        </div>
    );
}