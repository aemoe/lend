import React, { ReactNode } from "react"
import "./navbar.module.scss"

interface Props {
    menuOpen: boolean,
    children?: ReactNode
}

const NavbarMobile: React.FC<Props> = ({menuOpen, children}: Props) => {
    return (
        <div className={`navbar-mobile-content ${menuOpen ? "navbar-mobile-content-open" : ""}`}>
            {children}
        </div>
    )
}

export default NavbarMobile