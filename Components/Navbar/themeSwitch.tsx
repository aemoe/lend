import React from "react"
import styles from"./themeSwitch.module.scss"
import { Sun, Moon } from "../../public/huIcons/huIcons";

// import { ReactComponent as Sun } from '../../assets/sun.svg';
// import { ReactComponent as Moon } from '../../assets/moon.svg';

interface Props{
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>
}

const ThemeSwitch: React.FC<Props> = ({darkMode, setDarkMode, setOpenMenu} : Props) => {
    const handleOpenMenu = () => {
        setDarkMode(!darkMode)
        if(setOpenMenu) {
            setOpenMenu(false)
        }
    }
    return (
        <div className={styles.theme_switch +` ${darkMode ? "theme_switch_dark_mode" : ""}`} onClick={() => handleOpenMenu()}>
            <div className={styles.switch_button +` ${darkMode ? "switch_button_dark_mode" : ""}`}></div>
            <Sun darkMode={darkMode} size="15px"/>
            <Moon darkMode={darkMode} size="15px"/>
        </div>
    )
}

export default ThemeSwitch