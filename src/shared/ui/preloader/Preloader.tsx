import cls from './Preloader.module.scss'

const Preloader = () => {
    return (
        <div className={cls.psoload}>
            <div className={cls.straight}></div>
            <div className={cls.curve}></div>
            <div className={cls.center}></div>
            <div className={cls.inner}></div>
        </div>
    );
};
export default Preloader;
