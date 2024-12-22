import cls from './Header.module.scss'
import { ReactComponent as Logo } from "../../shared/assets/pussy_logo.svg";
import { memo } from "react";
import { Typography } from "@mui/material";
import useValidatorsStore from "@entities/validator/model/store";

const Header = memo(() => {

    const validatorsLength = useValidatorsStore(state => state.filteredValidators.length);

    if (validatorsLength) {
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
                            spacepussy uptime checker
                        </Typography>
                    </div>
                </div>
            </div>
        );
    }
});

export default Header;