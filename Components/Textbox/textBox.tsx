import React, { useState } from "react"
import styles from "./textBox.module.scss"

interface Props{
    onClick: () => Promise<void> | void,
    validation: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    button?: string,
    symbol?: string,
    placeholder?: string,
    value: string,
    disabled: boolean,
    onChange?: () => void,
    buttonTooltip?: string,
    validationCollapse?: boolean,
    buttonDisabled?: boolean
}

const TextBox : React.FC<Props> = (props : Props) => {
    const [focus, setFocus] = useState(false)
    const [placeHolder, setPlaceholder] = useState(props.placeholder)
   
    const onFocus = () : void =>{
        setFocus(true)
        if(props.placeholder) setPlaceholder(props.placeholder.replace("0", "").trim())
    }

    const onBlur = () : void =>{
        setFocus(false)
        if(props.value.trim() === "")
            setPlaceholder(props.placeholder)

    }

    const buttonClick = () : void => {
        setFocus(true)
        if (props.placeholder) setPlaceholder(props.placeholder.replace("0", "").trim())
        props.onClick()
    }

    const handleChange = (e : any) : void => {
        if(props.onChange)
            props.onChange()
        let value : string = e.target.value.toString()
        if(value.startsWith('.'))
            value = "0" + value
        props.setInput(value)
        if (props.placeholder) setPlaceholder(props.placeholder.replace("0", "").trim())
    }

    return(
        <div className={styles.textbox +` ${props.validation.trim() === "" && props.validationCollapse ? styles.validation_collapse : ""}`}>
            <div className={props.button || props.symbol ? styles.textbox_button : ""}
            style={{borderColor: focus ? '#427af1' : '#646464'}}>
                <input type="text" disabled={props.disabled} required value={props.value} onChange={handleChange} onFocus={()=>onFocus()} onBlur={()=>onBlur()}/>
                <span data-tip={props.buttonTooltip} className={styles.placeholder +` ${props.disabled ? styles.placeholder_disabled : ""}`}>{placeHolder}</span>
                {props.button ?
                    props.buttonTooltip ? <span data-tip={props.buttonTooltip} data-for="borrow_dialog_tooltip" className={styles.input_button+` ${props.disabled || props.buttonDisabled ? styles.input_button_disabled : ""}`} onClick={buttonClick}>{props.button}</span>: 
                    <span className={styles.input_button +` ${props.disabled || props.buttonDisabled? styles.input_button_disabled : ""}`} onClick={buttonClick}>{props.button}</span>
                    :""}
                {props.symbol ?
                    <span className={styles.input_button+""+styles.input_button_disabled}>{props.symbol}</span>
                    : ""
                }
            </div>
            <span className={styles.validation}>{props.validation}</span>
        </div>
    )
}

export default TextBox