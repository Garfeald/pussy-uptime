import cls from './Header.module.scss'
import { ReactComponent as Logo } from "../../assets/pussy_logo.svg";
import { memo } from "react";

const Header = memo(() => {

    return (
        <div className={cls.Header}>
            <div className={cls.logoWrapper}>
                <div>
                    <Logo className={cls.logo} width={45} height={45}/>
                </div>
                <div>
                    <p
                        className={cls.logo_text}
                    >
                        Space pussy
                    </p>
                </div>
            </div>
        </div>
    );
});

export default Header;