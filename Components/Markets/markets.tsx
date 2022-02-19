import React, { useState } from "react"
import { CTokenInfo } from "../../Classes/cTokenClass"
import { GeneralDetailsData } from "../../Classes/generalDetailsClass"
import Section from "../Section/section"
import BorrowMarket from "./BorrowMarket/borrowMarket"
import {MarketContainer, MarketContainerTitle, MarketContainerShowMore} from "./marketContainer"
import styles from "./style.module.scss"
import SupplyMarket from "./SupplyMarkets/supplyMarket"

interface Props{
    generalData: GeneralDetailsData | null,
    marketsData: (CTokenInfo | null)[] | null | undefined,
    enterMarketDialog: (market: CTokenInfo) => void,
    supplyMarketDialog: (market: CTokenInfo) => void,
    borrowMarketDialog: (market: CTokenInfo) => void,
    darkMode: boolean
}
const Markets: React.FC<Props> = (props : Props) => {
    const [showMore, setShowMore] = useState<boolean>(false)

    const handleSupplyMore = () : void => {
        setShowMore(!showMore)
    }

    const handleBorrowMore = () : void => {
        setShowMore(!showMore)
    }

    return (
        <Section className="markets-section">
            <div className="markets">
            <MarketContainer>
                <MarketContainerTitle>
                    Supply Market
                </MarketContainerTitle>
                <SupplyMarket
                    generalData={props.generalData}
                    marketsData = {props.marketsData}
                    enterMarketDialog = {props.enterMarketDialog}
                    supplyMarketDialog={props.supplyMarketDialog}
                    more={showMore}
                    darkMode={props.darkMode}
                />
                {props.marketsData && props.marketsData.length > 6 ? <MarketContainerShowMore onClick={handleSupplyMore}>
                {
                    !showMore ? (
                          "SHOW MORE"
                    ) : (
                          "SHOW LESS"
                    )
                  }
                </MarketContainerShowMore> : null}
            </MarketContainer>
            
            <MarketContainer>
                <MarketContainerTitle>
                    Borrow Market
                </MarketContainerTitle>
                <BorrowMarket generalData={props.generalData} marketsData = {props.marketsData} borrowMarketDialog={props.borrowMarketDialog} more={showMore}/>
                {props.marketsData && props.marketsData.length > 6 ?<MarketContainerShowMore onClick={handleBorrowMore}>
                {
                    !showMore ? (
                          "SHOW MORE"
                    ) : (
                          "SHOW LESS"
                    )
                  }
                </MarketContainerShowMore> : null}
            </MarketContainer>
            
        </div>
        </Section>
    )
}

export default Markets