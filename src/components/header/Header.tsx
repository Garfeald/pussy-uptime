import cls from './Header.module.scss'
import pussy from "../../../public/large-purple-circle.23506e149e.png";
import { getBlockchainInfo } from "../../servises/get-blockchain-info/getBlockchainInfo";
import { memo, useEffect, useState } from "react";

const Header = memo(() => {

    const [lastHeight, setLastHeight] = useState<string>('')

    const interval = 5000;

    const getBlockchainData = async () => {
        return await getBlockchainInfo().then(res => {
            if (res.data?.result?.last_height) {
                setLastHeight(res.data?.result?.last_height)
            }
        })
    }

    useEffect(() => {
        getBlockchainData()
        const intervalId = setInterval(getBlockchainData, interval)

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(intervalId)
    }, [])

    return (
        <div className={cls.Header}>
            <div className={cls.logoWrapper}>
                <div>
                    <img src={pussy} className={cls.logo} alt="Vite logo"/>
                </div>
                <div>
                    <p
                        className={cls.logo_text}
                    >
                        Space pussy
                    </p>
                </div>
            </div>
            <div>
                <p
                    className={cls.last_height}
                >
                    {`last block: ${lastHeight}`}
                </p>
            </div>
        </div>
    );
});

export default Header;