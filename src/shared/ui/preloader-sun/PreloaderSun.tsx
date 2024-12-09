import cls from './PreloaderSun.module.scss'

const PreloaderSun = () => {

    const drawList = () => {
        const list = []
        for (let i = 0;i <= 71;i++) {
            list.push(<div key={i}>
                <div className={cls.bar}></div>
            </div>)
        }
        return list
    }

    return (
        <div className={cls.wrapper}>
            {drawList()}
        </div>
    );
};

export default PreloaderSun;