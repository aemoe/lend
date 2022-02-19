import React, { useEffect, useState } from "react"
import styles from "./hundredMenu.module.scss"
import { ethers } from "ethers"
import { Spinner } from "../../public/huIcons/huIcons"
import { Network } from "../../pages/libs/networks"
import { BigNumber } from "../../pages/libs/bigNumber"

interface Props {
    hndPrice: number,
    hndBalance: BigNumber | null,
    hndEarned: BigNumber | null,
    hndSpinner: boolean,
    address: string,
    provider: ethers.providers.Web3Provider | null,
    network: Network | null,
    setSideMenu: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenHundred: React.Dispatch<React.SetStateAction<boolean>>,
    handleCollect: () => Promise<void>,
    hundredBalance: BigNumber | null,
}


const HundredMenu: React.FC<Props> = (props: Props) => {
    const [tvl, setTvl] = useState<BigNumber | null>(null)

    useEffect(() => {
        if (props.network && props.network.hundredLiquidityPoolAddress && props.hundredBalance) {
            if (props.network.liquidity) {
                const temp = +props.hundredBalance.toString() / (props.network.hndPoolPercent ? props.network.hndPoolPercent : 1) * props.hndPrice
                setTvl(BigNumber.parseValue(temp.noExponents()))
            }
            else {
                const temp = +props.hundredBalance.toString() * 2 * props.hndPrice
                setTvl(BigNumber.parseValue(temp.noExponents()))
            }
        }
        else setTvl(null)
    }, [props.hndPrice, props.hundredBalance])

    return (
        <div className={styles.hundred_menu}>
            <hr />
            <div className={styles.hundred_menu_item}>
                <div className={styles.hundred_menu_item_label}><label>HND Price </label><span>${BigNumber.parseValue(props.hndPrice.toString()).toRound(2, true, true)}</span></div>
                {tvl ? <div className={styles.hundred_menu_item_label}><label>{props.network?.liquidity ? "Liquidity" : "TVL"}</label><span>${tvl.toRound(2, true, true)}</span></div> : null}
                {props.network && props.network.trade ? <div className={styles.hundred_menu_item_label}><a className={styles.hundred_menu_link} href={props.network.trade} target="_blank" rel="noreferrer">Trade</a></div> : null}
                {props.network && props.network.addLiquidity ? <div className={styles.hundred_menu_item_label}><a className={styles.hundred_menu_link} href={props.network.addLiquidity} target="_blank" rel="noreferrer">Add Liquidity</a></div> : null}
                {props.network && props.network.stakeLp ? <div className={styles.hundred_menu_item_label}><a className={styles.hundred_menu_link} href={props.network.stakeLp} target="_blank" rel="noreferrer">Stake LP</a></div> : null}
            </div>
            <div className={styles.hundred_menu_item}>
                <hr />
                <div className={styles.hundred_menu_item_label}><label>HND Balance </label><span>{props.hndBalance ? (props.hndBalance.gt(BigNumber.from(0)) ? props.hndBalance.toRound(2, true, true) : "0.00") : "--"}</span></div>
                {props.hndEarned && +props.hndEarned.toString() > 0 ?
                    <><div className={styles.hundred_menu_item_label}><label>HND Earned (Legacy)</label><span>{props.hndEarned ? props.hndEarned?.gt(BigNumber.from(0)) ? props.hndEarned?.toRound(2, true, true) : "0.00" : "--"}</span></div>
                        <div className={`${props.hndSpinner ? styles.hundred_menu_item_button_disabled : styles.hundred_menu_item_button}`} onClick={() => !props.hndSpinner ? props.handleCollect() : null}>
                            {props.hndSpinner ? (<Spinner size={"25px"} />) : "Claim Legacy HND"}</div></> : null
                }
            </div>
        </div>
    )
}

export default HundredMenu