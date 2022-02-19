import React from "react"
import { useRef } from "react"
import { Network } from "../../pages/libs/networks"
import styles from "./networkButton.module.scss"

interface Props{
    network: Network | null,
    setOpenNetwork: React.Dispatch<React.SetStateAction<boolean>>,
    setSideMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const NetworkButton : React.FC<Props> = (props : Props) => {
    const setOpenNetwork = useRef<React.Dispatch<React.SetStateAction<boolean>> | null>(null)
    setOpenNetwork.current = props.setOpenNetwork

    const handleOpenNetworks = () :void => {
        if(setOpenNetwork.current){
            setOpenNetwork.current(true)
            props.setSideMenu(true)
        }
    }

    if(props.network){
        return (
            <div className={styles.network_button} onClick={() => handleOpenNetworks()}>
            {
                <div className={styles.network_button_content}>
                    <img src={props.network.logo} alt="" className={styles.network_logo}/>
                    <span className={styles.network_name}>{props.network.network}</span>
                    <span className={styles.arrow}>&#9660;</span>    
                </div>
            }
            </div>
        )
    }
    else return (
        <div className={styles.network_button} onClick={() => handleOpenNetworks()}>
            <div className={styles.network_button_content}>
                <span className={styles.network_name}>Networks</span>
                <span className={styles.arrow}>&#9660;</span>    
            </div>
        </div>
    )
}

export default NetworkButton