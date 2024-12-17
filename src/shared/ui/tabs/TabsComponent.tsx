import { classNames, Mods } from "@shared/libs/utils/class-names/classNames";
import cls from './TabsComponent.module.scss'
import { Tab, Tabs } from "@mui/material";
import { ReactElement, SyntheticEvent } from "react";

interface TabsComponentProps<T extends string> {
    tabValue: string | number,
    onChangeTab: (event: SyntheticEvent, newValue: T) => void,
    tabInfo: Array<{label: string, value: string, icon?: ReactElement }>,
    direction?: 'start' | 'center' | 'end',
    className?: string,
    fullwidth?: boolean
}

const TabsComponent = <T extends string>(props: TabsComponentProps<T>) => {

    const {
        className = '',
        tabInfo,
        tabValue,
        onChangeTab,
        direction = 'start',
        fullwidth = false
    } = props

    const mods: Mods = {
        [cls.start]: direction === 'start',
        [cls.center]: direction === 'center',
        [cls.end]: direction === 'end'
    }

    return (
        <div className={classNames(cls.tabsWrapper, mods, [className])}>
            <Tabs
                value={tabValue}
                onChange={onChangeTab}
                aria-label="basic tabs"
            >
                {tabInfo.map(tab => <Tab icon={tab.icon} label={tab.label} value={tab.value} key={tab.label}/>)}
            </Tabs>
        </div>
    );
};

export default TabsComponent;