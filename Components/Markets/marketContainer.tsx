import React, { ReactNode } from "react"
import styles from "./style.module.scss"

interface Props{
    onClick?: () => void,
    children?: ReactNode
}

const MarketContainer: React.FC<Props> = (props : Props) => {
    return(
        <div className={styles.market_container}>
            {props.children}
        </div>
    )
}

const MarketContainerTitle : React.FC<Props> = (props : Props) => {
    return(
        <div className={styles.market_container_title}>
            {props.children}
        </div>
    )
}

const MarketContainerShowMore : React.FC<Props> = (props : Props) => {
    return(
        <div className={styles.market_container_title+""+styles.market_container_show_more} onClick = {props.onClick}>
            {props.children}
        </div>
    )
}


export {
    MarketContainer, 
    MarketContainerTitle,
    MarketContainerShowMore
}

