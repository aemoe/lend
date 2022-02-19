import React from "react"
import styles from './navbarButton.module.scss'

interface Props {
    menuOpen: boolean
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NavBarButton: React.FC<Props> = (props: Props) => {
    const handleClick = () : void => {
        props.setMenuOpen(!props.menuOpen)
    }

    return (
        <div className={styles.navbar_button +` ${props.menuOpen ? styles.navbar_button_clicked : ""}`} onClick={() => handleClick()}>
            <span className={styles.bar+""+styles.bar1}></span>
            <span className={styles.bar+""+styles.bar2}></span>
            <span className={styles.bar+""+styles.bar3}></span>
        </div>
    )
}

export default NavBarButton