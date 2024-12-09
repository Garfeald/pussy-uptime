import cls from './PreloaderSpinCircles.module.scss';
import { Typography } from "@mui/material";
import { memo } from "react";

interface PreloaderSpinCirclesProps {
    text?: string;
}

const PreloaderSpinCircles = memo((props: PreloaderSpinCirclesProps) => {

    const {
        text = 'Loading'
    } = props

    return (
        <div className={cls.preloaderWrap}>
            <div className={cls.container}>
                <div className={cls.circlesWrapper}>
                    <div className={`${cls.circle} ${cls.circleLg}`}>
                        <div className={`${cls.circle} ${cls.circleMd}`}>
                            <div className={`${cls.circle} ${cls.circleSm}`}></div>
                        </div>
                    </div>
                </div>
            </div>
            <Typography
                component='h2'
                style={{ fontSize: '1.17em', fontWeight: '500', color: 'rgba(36, 121, 215, 0.68)' }}
            >
                {text}
            </Typography>
        </div>
    );
});

export default PreloaderSpinCircles;