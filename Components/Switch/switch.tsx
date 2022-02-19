import React from "react"
import styles from "./switch.module.scss"

interface Props{
    disabled: boolean,
    checked?: boolean,
    onClick?: () => void
    switchToolTip?: string | null
}

const SwitchButton: React.FC<Props> = (props : Props) => {

    const handleClick = () =>{
        if(!props.disabled && props.onClick)
            props.onClick()
    }
    
    return (
        props.switchToolTip ? 
        <div data-tip={props.switchToolTip} className={styles.switch +`  ${props.checked ? styles.switch_checked : ""} ${props.disabled ? styles.switch_button_disable : styles.switch_button_enabled}`}  onClick={handleClick}>
            <div className={styles.switch_button}>

            </div>
        </div>
        :
        <div className={styles.switch +` ${props.checked ? styles.switch_checked : ""} ${props.disabled ? styles.switch_button_disable : styles.switch_button_enabled}`}  onClick={handleClick}>
            <div className={styles.switch_button}>

            </div>
        </div>
    )
}

export default SwitchButton