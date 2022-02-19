import React, { ReactNode } from "react"
import styles from "./navbar.module.scss"

interface Props{
    className?: string
    children?: ReactNode
}

const NavBarRight: React.FC<Props> = (props : Props) => {
    return (
        <div className={styles.navbar_right +` ${props.className ? props.className : ""}`}>
            {props.children}
        </div>
    )
}

export default NavBarRight