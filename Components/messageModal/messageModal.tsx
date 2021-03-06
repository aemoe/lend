import React, {useRef, useEffect} from "react"
import styles from "./messageModal.module.scss"
import closeIcon from "../../assets/icons/closeIcon.png"

interface Props {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    showNetworks: React.Dispatch<React.SetStateAction<boolean>>
}
    
    
const MessageModal: React.FC<Props> = (props) => {
    const ref = useRef<HTMLDivElement | null>(null)
    
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        if(props.show){
            document.getElementsByTagName("body")[0].style.overflow = 'hidden'
        }
        else{
            document.getElementsByTagName("body")[0].style.overflow = 'auto'
            props.setShow(false)
        }

        function handleClickOutside(event : any) : void {
            if (ref && ref.current && !ref.current.contains(event.target)) {
                props.setShow(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, props.show]);

    const handleButtonClick = () => {
        if(props)
            // eslint-disable-next-line react/prop-types
            props?.showNetworks(true)
    }

    return (
        props.show ? (
            <div className={styles.dialog+`${props.show ? "open_dialog" : ""}`}>
                <div ref={ref} className={styles.message_box}>
                    <img src={closeIcon} alt="Close Icon" className="dialog_close" onClick={()=>props.setShow(false)} />  
                    <div className={styles.message_box_content}>
                        <div className={styles.message_box_text}>
                            We are on Arbitrum. Please switch.
                        </div>
                        <div className={styles.message_box_action}>
                            <button className={styles.message_box_button} onClick={handleButtonClick}>Switch to Arbitrum</button>
                        </div>
                    </div>
                </div>
            </div>) : null
    )
}

export default MessageModal
