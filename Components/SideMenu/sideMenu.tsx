import React, { ReactNode } from "react"
import styles from  "./sideMenu.module.scss"

interface Props{
    open: boolean,
    setSideMenu: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenAddress: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenNetwork: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenHundred: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenAirdrop: React.Dispatch<React.SetStateAction<boolean>>,
    children: ReactNode
}

const SideMenu: React.FC<Props> = ({open, setSideMenu, setOpenAddress, children, setOpenNetwork, setOpenAirdrop, setOpenHundred} : Props) => {

    const handleClose = () => {
        setSideMenu(false)
        setOpenAddress(false)
        setOpenNetwork(false)
        setOpenHundred(false)
        setOpenAirdrop(false)
    }

    
    return (
        open ?(
        <div id="side-menu" className={styles.sideMenu}>
            <div className={styles.sideMenu_overlay} onClick={() => handleClose()}>
            </div>
            <div className={styles.sideMenu_wrapper}>    
                <span className="close" onClick={() => handleClose()}>
                </span>
                <div className={styles.sideMenu_content}>
                    {children}
                </div>
            </div>
        </div>) : null
    )
}

export default SideMenu