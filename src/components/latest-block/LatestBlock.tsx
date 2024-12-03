import { Typography } from "@mui/material";
import cls from './LatestBlock.module.scss'

interface LatestBlockProps {
    blockHeight?: string | undefined;
}

const LatestBlock = (props: LatestBlockProps) => {

    const {blockHeight} = props

    if (blockHeight) {
        return (
            <div className={cls.block_wrapper}>
                <Typography
                    variant='h7'
                    className={cls.text}
                >
                    {`Latest block #${blockHeight}`}
                </Typography>
            </div>
        );
    } else return <></>
};

export default LatestBlock;