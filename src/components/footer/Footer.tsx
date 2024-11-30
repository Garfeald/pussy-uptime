import cls from './Footer.module.scss'

interface FooterProps {
    className?: string;
}

const Footer = (props: FooterProps) => {

    const {} = props

    return (
        <div className={cls.footer}>
            ©  2024  Made By Techstur
        </div>
    );
};

export default Footer;