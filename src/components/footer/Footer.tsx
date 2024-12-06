import cls from './Footer.module.scss'
import { ReactComponent as Telegram } from "../../shared/assets/telegram.svg";
import { Typography } from "@mui/material";

const Footer = () => {

    return (
        <div className={cls.footer}>
            <Typography
                component='p'
            >
                © 2024 Made By Techstur
            </Typography>
            <a href='tg://resolve?domain=techstur' target='_blank'>
                <Telegram/>
            </a>
        </div>
    );
};

export default Footer;