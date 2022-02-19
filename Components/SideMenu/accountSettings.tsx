import React from "react"
import { getShortenAddress } from "../../pages/libs/helpers"
import styles from "./accountSettings.module.scss"

interface Props{
    address: string,
    setSideMenu: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenAddress: React.Dispatch<React.SetStateAction<boolean>>,
    setAddress: React.Dispatch<React.SetStateAction<string>>,
}


const AccountSettings: React.FC<Props> = (props: Props) => {
    const handleDisconnect = () => {
        props.setSideMenu(false) 
        props.setOpenAddress(false)
        props.setAddress("")
    }

    return (
        <div className={styles.account_settings}>
            <div className={styles.account_settings_item}>
                <hr/>
                <div className={styles.account_settings_item_label}><label>Address </label><span>{getShortenAddress(props.address)}</span></div>
                <div className={styles.account_settings_item_button} onClick={() => handleDisconnect()}>Disconnect</div>
            </div>
        </div>
    )
}

export default AccountSettings