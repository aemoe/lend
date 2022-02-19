import React, { ReactNode } from "react"
import "./navbar.module.scss"

interface Props{
    className?: string
    children?: ReactNode
}

const NavBarRight: React.FC<Props> = (props : Props) => {
    return (
        <div className={`navbar-right ${props.className ? props.className : ""}`}>
            {props.children}
        </div>
    )
}

export default NavBarRight