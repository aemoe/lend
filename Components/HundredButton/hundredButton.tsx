import React from "react"
import { useRef } from "react"
import { Network } from "../../pages/libs/networks"
import Logos from "../../pages/libs/logos"
import styles from "./hundredButton.module.css"

interface Props{
    network: Network | null,
    address: string,
    setOpenHundred: React.Dispatch<React.SetStateAction<boolean>>,
    setSideMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const HundredButton : React.FC<Props> = (props : Props) => {
    const setOpenHundred = useRef<React.Dispatch<React.SetStateAction<boolean>> | null>(null)
    setOpenHundred.current = props.setOpenHundred

    const handleOpenHundred = () :void => {
        if(setOpenHundred.current){
            setOpenHundred.current(true)
            props.setSideMenu(true)
        }
    }

    if(props.address === "" || !props.network)
        return null
    else {
        return (
            <div className={styles.hundred_button} onClick={() => handleOpenHundred()}>
            {
                <div className={styles.hundred_button_content}>
                    <img src={Logos["HND"]} alt="" className={styles.hundred_logo}/>
                    <span className={styles.hundred_name}>HND</span>
                    <span className={styles.arrow}>&#9660;</span>    
                </div>
            }
            </div>
        )
    }
}

export default HundredButton