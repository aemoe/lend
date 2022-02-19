import React, { ReactNode } from 'react';
import styles from "./navbar.module.scss";

interface Props{
    children?: ReactNode
}

const NavBarLeft : React.FC<Props> = ({children} : Props) => (
    <div className={styles.navbar_left}>
        {children}
    </div>
)

export default NavBarLeft