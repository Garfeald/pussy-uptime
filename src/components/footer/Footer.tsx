import cls from './Footer.module.scss'
import { ReactComponent as Telegram } from "../../shared/assets/telegram.svg";
import { Typography } from "@mui/material";
import useValidatorsStore from "@entities/validator/model/store";
import { memo } from "react";

const Footer = memo(() => {

    const validatorsLength = useValidatorsStore(state => state.filteredValidators.length);

    if (validatorsLength) {
        return (
            <div className={cls.footer}>
                <Typography
                    component='p'
                >
                    © 2024 Made By Techstur
                </Typography>
                <a href='tg://resolve?domain=techstur' target='_blank' rel="noreferrer">
                    <Telegram/>
                </a>
            </div>
        );
    }
});

export default Footer;