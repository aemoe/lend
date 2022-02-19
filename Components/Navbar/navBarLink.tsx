import React, { ReactNode } from "react"
import "./navbar.module.scss"

interface Props{
    link: string,
    target?: string,
    children?: ReactNode
}

const NavbarLink: React.FC<Props> = ({link, target, children} : Props) => {
   
    return (
        <li className="navbar-links-list-item">
            <a className="nav-link" style={{cursor: "pointer"}} href={link} target={target ? target : ""}>{children}</a>
        </li>
    )
}

export default NavbarLink