import React, { ReactNode } from "react"
import styles from"./navbar.module.scss"

interface Props {
    menuOpen: boolean,
    children?: ReactNode
}

const NavbarMobile: React.FC<Props> = ({menuOpen, children}: Props) => {
    return (
        <div className={styles.navbar_mobile_content +` ${menuOpen ? styles.navbar_mobile_content_open : ""}`}>
            {children}
        </div>
    )
}

export default NavbarMobile