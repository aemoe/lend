import React, { ReactNode } from "react"
import styles from "./navbar.module.scss"

interface Props{
    children?: ReactNode
}

const NavBarLinks: React.FC<Props> = ({children} : Props) => {
    return (
        <div className={styles.navbar_links}>
            <ul className={styles.navbar_links_list}>
                {children}
            </ul>
        </div>
    )
}

export default NavBarLinks