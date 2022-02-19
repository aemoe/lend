import React from "react"
import { useRef } from "react"
import { Network } from "../../pages/libs/networks"
import "./networkButton.module.scss"

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
            <div className="network-button" onClick={() => handleOpenNetworks()}>
            {
                <div className="network-button-content">
                    <img src={props.network.logo} alt="" className="network-logo"/>
                    <span className="network-name">{props.network.network}</span>
                    <span className="arrow">&#9660;</span>    
                </div>
            }
            </div>
        )
    }
    else return (
        <div className="network-button" onClick={() => handleOpenNetworks()}>
            <div className="network-button-content">
                <span className="network-name">Networks</span>
                <span className="arrow">&#9660;</span>    
            </div>
        </div>
    )
}

export default NetworkButton