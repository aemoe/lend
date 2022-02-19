import React, { ReactNode } from "react"
import styles from "./wrapper.module.scss"

interface Props {
    sideMenu : boolean,
    children?: ReactNode
}

const Wrapper: React.FC<Props> = (props:Props) => {
    return (
        <section className={styles.wrapper +` ${props.sideMenu ? styles.wrapper_side : ""}`}>
            {props.children}
        </section>
    )
}

export default Wrapper