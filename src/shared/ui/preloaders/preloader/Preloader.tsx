import cls from './Preloader.module.scss'
import { memo } from "react";
import { Typography } from "@mui/material";

interface PreloaderProps {
    text?: string
}

const Preloader = memo((props: PreloaderProps) => {

    const {
        text = 'Loading...'
    } = props

    return (
        <div className={cls.preloaderWrap}>
            <div className={cls.psoload}>
                <div className={cls.straight}></div>
                <div className={cls.curve}></div>
                <div className={cls.center}></div>
                <div className={cls.inner}></div>
            </div>
            <Typography
                component='h2'
                style={{ fontSize: '1.17em', fontWeight: '500' }}
            >
                {text}
            </Typography>
        </div>
    );
});
export default Preloader;
