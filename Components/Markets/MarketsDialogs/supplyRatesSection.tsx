import React from "react"
import { HuLogo } from "../../../public/huIcons/huIcons";
import { CTokenInfo } from "../../../Classes/cTokenClass"
import {stakingApr, formatApr} from "../aprHelpers";
import styles from "./dialogSection.module.scss"
import {GaugeV4} from "../../../Classes/gaugeV4Class";

interface Props{
    market: CTokenInfo | null,
    gaugeV4: GaugeV4 | null | undefined,
    darkMode: boolean
}

const SupplyRateSection:React.FC<Props> = (props: Props) => {
    return (
        <div className={styles.dialog_section}>
            <div className={styles.dialog_section_title}>
                Supply Rate
            </div>
            <div className={styles.dialog_section_content}>
                    <div className={styles.logo_holder}>
                        <img className={styles.rounded_circle}
                            style={{ width: "20px", height: "20px", margin: "0px 0px 0px 0px" }}
                            src={props.market?.underlying.logo}
                        alt=""/>
                    </div>
                <div className={styles.fill}>Supply APY</div>
                <div className={styles.dialog_section_content_value} style={{ margin: "0px 0px 0px 0px" }}>
                    {`${props.market ? formatApr(props.market?.supplyApy) : "0.00"}%`}
                </div>
            </div>
            <div className={styles.dialog_section_content}>
                    <div className={styles.logo_holder}>
                        <HuLogo size={"20px"}/>
                    </div>
                <div className={styles.fill}>Stake APR</div>
                <div className={styles.dialog_section_content_value} style={{ margin: "0px 0px 0px 0px" }}>
                    { stakingApr(props.market, props.gaugeV4) }
                </div>
            </div>
        </div>
    )
}

export default SupplyRateSection