import cls from './Header.module.scss'
import pussy from "../../../public/large-purple-circle.23506e149e.png";

interface HeaderProps {
    className?: string;
}

const Header = (props: HeaderProps) => {

    const {} = props

    return (
        <div className={cls.Header}>
            <div className={cls.logoWrapper}>
                <div>
                    <h1 style={{ color: 'rgb(246, 43, 253)' }}>Space-pussy</h1>
                </div>
                <div>
                    <img src={pussy} className={cls.logo} alt="Vite logo"/>
                </div>
            </div>
        </div>
    );
};

export default Header;