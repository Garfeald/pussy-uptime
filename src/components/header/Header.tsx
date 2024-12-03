import cls from './Header.module.scss'
import { ReactComponent as Logo } from "../../assets/pussy_logo.svg";
import { memo } from "react";
import { Typography } from "@mui/material";

const Header = memo(() => {

    return (
        <div className={cls.Header}>
            <div className={cls.logoWrapper}>
                <div>
                    <Logo className={cls.logo} width={45} height={45}/>
                </div>
                <div>
                    <Typography
                        variant='h5'
                        className={cls.logo_text}
                    >
                        Space pussy uptime
                    </Typography>
                </div>
            </div>
        </div>
    );
});

export default Header;