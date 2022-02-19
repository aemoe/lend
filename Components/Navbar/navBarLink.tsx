import React, { ReactNode } from "react"
import styles from "./navbar.module.scss"

interface Props{
    link: string,
    target?: string,
    children?: ReactNode
}

const NavbarLink: React.FC<Props> = ({link, target, children} : Props) => {
   
    return (
        <li className={styles.navbar_links_list_item}>
            <a className={styles.nav_link} style={{cursor: "pointer"}} href={link} target={target ? target : ""}>{children}</a>
        </li>
    )
}

export default NavbarLink