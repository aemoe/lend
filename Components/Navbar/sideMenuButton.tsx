import React, { useState } from "react"
import styles from"./navbar.module.scss"

interface Props {
    setSideMenu: React.Dispatch<React.SetStateAction<boolean>>,

}

const SideMenuButton: React.FC<Props> = ({setSideMenu}: Props) => {
    const [hover, setHover] = useState(false)

    // const style = {
    //     //border: `0px solid ${props.theme.text}`,
    //     borderRadius: '10px',
    //     display: 'block',
    //     width: '0px',
    //     height: '40px',
    //     margin: '0 10px',
    //     position: 'relative',
    //     cursor: 'pointer',
    //     transition: 'all 0.2s ease_out',
    //     padding:"0 10px"
    // }

    // const dot1 = {
    //     display: 'block',
    //     width: '5px',
    //     height: '5px',
    //     // backgroundColor: `${props.theme.text}`,
    //     // border: `1px solid ${props.theme.text}`,
    //     borderRadius: '3px',
    //     position:'absolute',
    //     left: '50%',
    //     top: `${hover ? '15%' : '20%'}`,
    //     transform: 'translate(_50%, _20%)',
    //     transition: 'all 0.1s ease_in_out'
    // }

    // const dot2 = {
    //     display: 'block',
    //     width: '5px',
    //     height: '5px',
    //     // backgroundColor: `${props.theme.text}`,
    //     // border: `1px solid ${props.theme.text}`,
    //     borderRadius: '50%',
    //     position:'absolute',
    //     left: '50%',
    //     top:'50%',
    //     transform: 'translate(_50%, _50%)',
    //     transition: 'all 0.1s ease_in_out',
    // }

    // const dot3 = {
    //     display: 'block',
    //     width: '5px',
    //     height: '5px',
    //     // backgroundColor: `${props.theme.text}`,
    //     // border: `1px solid ${props.theme.text}`,
    //     borderRadius: '50%',
    //     position:'absolute',
    //     left: '50%',
    //     top:`${hover ? '85%' : '80%'}`,
    //     transform: 'translate(_50%, _80%)',
    //     transition: 'all 0.1s ease_in_out',
    // }

    return (
        <div className={styles.menu_button} onClick={() => setSideMenu(true)} onMouseOver={() => setHover(true)} onMouseOut = {() => {setHover(false)}}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
        </div>
    )
}

export default SideMenuButton