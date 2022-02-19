import React, { ReactNode } from "react"
import styles from "../style.module.scss"

interface Props{
    className?: string,
    children?: ReactNode
}

const Section: React.FC<Props> = (props : Props) => {
    return (
        <div className={`section ${props.className ? props.className : ""}`}>
            <div className="section-content">
                {props.children}
            </div>
        </div>
    )
}

export default Section