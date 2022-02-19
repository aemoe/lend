import React from "react"
import { HuLogo } from "../../public/huIcons/huIcons"
import styles from "./navbar.module.scss";

interface Props{
    isMobile: boolean
}

const NavbarLogo: React.FC<Props> = ({isMobile} : Props) => {
    return (
        <div className={styles.navbar_logo}>
            <div className={styles.navbar_logo_icon}>
                <HuLogo size={isMobile ? "60px" : "80px"} darkMode={true}/>
            </div>
             {/*<div className="navbar_logo_caption" style={{color: `${props.theme.text}`}}>
                <span style={{fontWeight:'bolder', userSelect:'none'}}>HUN</span><span style={{fontWeight:'leighter', userSelect:'none'}}>DRED</span>
                </div>*/}
        </div>
    )
}

export default NavbarLogo