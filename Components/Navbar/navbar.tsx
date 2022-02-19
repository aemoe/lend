import React, { ReactNode } from "react"
import styles from "./navbar.module.scss"

interface Props {
    isTablet: boolean,
    isMobile: boolean,
    children?: ReactNode
}

const Navbar: React.FC<Props> = (props: Props) => {
    return (
            <div className={`navbar ${props.isTablet || props.isMobile ? "navbar-mobile" : ""}`}>
                <div className={styles.navbar_content}>
                    {props.children}
                </div>
            </div>
    )
}

export default Navbar