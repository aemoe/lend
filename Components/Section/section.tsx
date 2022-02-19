import React, { ReactNode } from "react"
import styles from "./style.module.scss"

interface Props{
    className?: string,
    children?: ReactNode
}

const Section: React.FC<Props> = (props : Props) => {
    return (
        <div className={styles.section +` ${props.className ? props.className : ""}`}>
            <div className={styles.section_content}>
                {props.children}
            </div>
        </div>
    )
}

export default Section