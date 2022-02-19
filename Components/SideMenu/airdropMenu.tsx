import React from "react"
import styles from "./airdropMenu.module.scss"
import {ethers} from "ethers"
import { DoneIcon, MoneyBagIcon, Spinner } from "../../public/huIcons/huIcons"
import { Network } from "../../pages/libs/networks"
import { AirdropType } from "../AirdropButton/airdropButton"
import { AIRDROP_V2_ABI } from "../../pages/libs/abi"
import { fireworks } from "../Fireworks/fireworks"

interface Props{
    airdrops: AirdropType[],
    setAirdrops: React.Dispatch<React.SetStateAction<AirdropType[]>>,
    address: string,
    provider: ethers.providers.Web3Provider | null,
    setSideMenu: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenAirdrop: React.Dispatch<React.SetStateAction<boolean>>,
    spinner: boolean,
    setSpinner: React.Dispatch<React.SetStateAction<boolean>>,
    network: Network | null,
    successMessage: (message: string, autoClose?: boolean, closeDelay?: number) => void,
    errorMessage: (message: string, autoClose?: boolean, closeDelay?:number) => void
}


const AirdropMenu: React.FC<Props> = (props: Props) => {
    const handleClaimAll = async() => {
        const airdrops = props.airdrops.filter(x=>!x.hasClaimed)
        if(props.provider && props.network && props.network.airdropMulticallAddress){
            try{
                const signer = props.provider.getSigner()
                const contract = new ethers.Contract(props.network.airdropMulticallAddress, AIRDROP_V2_ABI, signer)
                const data = airdrops.map(a => a.transactionData)
                props.setSpinner(true)
                const tx = await contract.multicall(data)
                const receipt = await tx.wait()
                console.log(receipt)
                fireworks("side-menu")
                const temp = [...props.airdrops]
                temp.forEach(a=> a.hasClaimed = true)
                props.setAirdrops(temp)
                props.successMessage("Airdrop Claim Completed Successfully", true, 5000)
            }
            catch(error: any){
                console.log(error)
                props.errorMessage(error.message, true, 5000)
            }
            finally{
                props.setSpinner(false)
            }
        }
    }

    return (
        <div className={styles.airdrop_menu}>
            {
                props.airdrops.filter(x=> !x.hasClaimed).length > 0 ?
                <>
                    <div className={styles.airdrop_menu_label}>
                        Unclaimed Airdrop
                    </div>
                    <div className={styles.airdrop_unclaimed}>
                        {
                            props.airdrops.filter(x=>!x.hasClaimed).map((a, index) => {
                                return(
                                    <div key={index} className={styles.airdrop_menu_item}>
                                        <div className={styles.airdrop_menu_item_values} >
                                            {a.amount.map((am, index2) => 
                                                
                                                    <div key={`a-${index2}`}>{am.value.toRound(2)} {am.symbol}
                                                    </div>
                                                
                                            )}
                                        </div>
                                        <MoneyBagIcon style={{paddingRight:"5px", paddingLeft: "5px"}} size="30px" color="#ddd"/>
                                    </div>)
                            })
                        }
                    </div>
                    <div className={styles.airdrop_menu_item}>
                        <button className={`${props.spinner ? styles.airdrop_menu_item_button_disabled : styles.airdrop_menu_item_button}`} onClick={() =>props.spinner ? null : handleClaimAll()}>
                           {props.spinner ? (<Spinner size={"25px"}/>) : "Claim All"}
                        </button> 
                    </div>
                </>
                : null
            }
            {
                props.airdrops.filter(x=> x.hasClaimed).length > 0 ?
                <>
                    <div className={styles.airdrop_menu_label}>
                        Airdrop History
                    </div>
                    {
                        <div className={styles.airdrop_history}>
                            {
                                props.airdrops.filter(x=>x.hasClaimed).map((a, index) => {
                                    return(
                                        <div key={index} className={styles.airdrop_menu_item}>
                                            <div className={styles.airdrop_menu_item_values} >
                                                {a.amount.map((am, index) => {
                                                    return (
                                                        <div key={index}>{am.value.toRound(2)} {am.symbol}</div>
                                                    )
                                                })}
                                            </div>
                                            <DoneIcon style={{paddingRight:"5px", paddingLeft: "5px"}} size="25px"/> 
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </>
                :null
            }
        </div>
    )
}

export default AirdropMenu