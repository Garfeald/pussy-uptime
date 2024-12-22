import cls from './PreloaderLines.module.scss'

interface PreloaderLinesProps {
    text?: string;
}

const PreloaderLines = (props: PreloaderLinesProps) => {

    const {
        text = 'Loading'
    } = props

    const {
        wrapper,
        preloader1,
        preloader2,
        line,
        line1,
        line2,
        line3,
        line4,
        line5,
        line6,
        line7,
        line8,
        line9,
    } = cls

    return (
        <div className={wrapper}>
            {/*<div className={preloader1}>*/}
            {/*    <div>{text}</div>*/}
            {/*    <span className={`${line} ${line1}`}></span>*/}
            {/*    <span className={`${line} ${line2}`}></span>*/}
            {/*    <span className={`${line} ${line3}`}></span>*/}
            {/*    <span className={`${line} ${line4}`}></span>*/}
            {/*    <span className={`${line} ${line5}`}></span>*/}
            {/*    <span className={`${line} ${line6}`}></span>*/}
            {/*    <span className={`${line} ${line7}`}></span>*/}
            {/*    <span className={`${line} ${line8}`}></span>*/}
            {/*    <span className={`${line} ${line9}`}></span>*/}
            {/*</div>*/}

            <div className={preloader2}>
                <span className={`${line} ${line1}`}></span>
                <span className={`${line} ${line2}`}></span>
                <span className={`${line} ${line3}`}></span>
                <span className={`${line} ${line4}`}></span>
                <span className={`${line} ${line5}`}></span>
                <span className={`${line} ${line6}`}></span>
                <span className={`${line} ${line7}`}></span>
                <span className={`${line} ${line8}`}></span>
                <span className={`${line} ${line9}`}></span>
                <div>{text}</div>
            </div>
        </div>
    );
};

export default PreloaderLines;