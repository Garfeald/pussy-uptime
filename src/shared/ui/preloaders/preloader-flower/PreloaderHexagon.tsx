import cls from './PreloaderHexagon.module.scss';
import { memo } from "react";
import { Typography } from "@mui/material";

interface PreloaderHexagonProps {
    text?: string
}

const PreloaderHexagon = memo((props: PreloaderHexagonProps) => {

    const {
        text = 'Loading...'
    } = props

    return (
        <div className={cls.hexagonWrapper}>
            <div className={cls.hexagon}>
                <div className={cls.hexagon__group}>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                </div>
                <div className={cls.hexagon__group}>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                </div>
                <div className={cls.hexagon__group}>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                </div>
                <div className={cls.hexagon__group}>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                </div>
                <div className={cls.hexagon__group}>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                </div>
                <div className={cls.hexagon__group}>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                    <div className={cls.hexagon__sector}></div>
                </div>
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

export default PreloaderHexagon;