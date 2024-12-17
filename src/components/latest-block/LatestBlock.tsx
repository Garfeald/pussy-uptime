import { Typography } from "@mui/material";
import cls from './LatestBlock.module.scss'
import { memo, ReactNode, useCallback, useEffect, useState } from "react";

interface LatestBlockProps {
    blockHeight?: string | undefined;
}

const LatestBlock = memo((props: LatestBlockProps) => {

    const { blockHeight } = props

    const symbolArray = ['#', '@', '%', '&', '*', '!', '0', '?', '№']

    const [nodesArray, setNodesArray] = useState<Array<ReactNode>>([])

    const getArray = useCallback(() => {
        if (blockHeight) {
            const symbolArr = blockHeight.split('')
            if (blockHeight.length !== nodesArray.length) {
                setNodesArray([...nodesArray, <span className={cls.height} key={Math.random()}>{symbolArr[nodesArray.length]}</span>])
            }
            
        }
    }, [blockHeight, nodesArray])

    useEffect(() => {

        const timer = setInterval(getArray, nodesArray.length !== blockHeight?.length ? 100 : 1000000)

        const clear = setInterval(() => {
            if (nodesArray.length === blockHeight?.length) {
                setNodesArray([])
            }
        }, 3000)

        return () => {
            clearInterval(timer)
            clearInterval(clear)
        }
    }, [blockHeight?.length, getArray, nodesArray.length])

    if (blockHeight) {
        return (
            <div className={cls.block_wrapper}>
                <Typography
                    variant='body1'
                    className={cls.text}
                >
                    {`Latest block #`}{nodesArray}
                </Typography>
            </div>
        );
    } else return <></>
});

export default LatestBlock;