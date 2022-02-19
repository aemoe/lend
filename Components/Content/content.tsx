import { ethers} from "ethers"
import { BigNumber } from "../../pages/libs/bigNumber"
import React, { useEffect,  useRef, useState } from "react"
import {CTOKEN_ABI, TOKEN_ABI, CETHER_ABI, BACKSTOP_MASTERCHEF_ABI, BACKSTOP_MASTERCHEF_ABI_V2 } from "../../pages/libs/abi"
import GeneralDetails from "../GeneralDetails/generalDetails"
import { MasterChefVersion, Network } from "../../pages/libs/networks"
import { Comptroller, getComptrollerData } from "../../Classes/comptrollerClass"
import { CTokenInfo} from "../../Classes/cTokenClass"
import { GeneralDetailsData, getGeneralDetails } from "../../Classes/generalDetailsClass"
import Markets from "../Markets/markets"
import EnterMarketDialog from "../Markets/MarketsDialogs/enterMarketDialog"
import BorrowMarketDialog from "../Markets/MarketsDialogs/borrowMarketsDialog"
import SupplyMarketDialog from "../Markets/MarketsDialogs/supplyMarketDialog"
import { fetchData} from "./fetchData"
import {GaugeV4, getGaugesData} from "../../Classes/gaugeV4Class";

const MaxUint256 = BigNumber.from(ethers.constants.MaxUint256)

//const gasLimit = "150000";
// const gasLimitSupplyDai = "535024";
// const gasLimitSupplySnx = "450000";
// const gasLimitSupplySusd = "450000";
// const gasLimitWithdrawDai = "550000";
// const gasLimitWithdrawSnx = "550000";
// const gasLimitWithdrawSusd = "550000";
// const gasLimitWithdraw = "450000";
// const gasLimitEnable = "70000";
// const gasLimitEnableDai = "66537";
// const gasLimitBorrow = "702020";
// const gasLimitBorrowDai = "729897";
// const gasLimitRepayDai = "535024";
// const gasLimitRepaySusd = "400000";
// const gasLimitEnterMarket = "112020";

type MetamaskError = {
  code: number;
  data: any;
  message: string;
};

interface Props{
  network: Network | null,
  setSpinnerVisible: React.Dispatch<React.SetStateAction<boolean>>,
  hndPrice: number,
  address: string,
  provider: ethers.providers.Web3Provider | null,
  spinnerVisible: boolean,
  darkMode: boolean,
  toastError: (error: string) => void,
  setHndEarned: React.Dispatch<React.SetStateAction<BigNumber | null>>,
  setHndBalance: React.Dispatch<React.SetStateAction<BigNumber | null>>
  setHundredBalance: React.Dispatch<React.SetStateAction<BigNumber | null>>
  updateEarned: boolean,
  setUpdateEarned: React.Dispatch<React.SetStateAction<boolean>>
  setHasClaimed: React.Dispatch<React.SetStateAction<boolean>>
}

const Content: React.FC<Props> = (props : Props) => {
    const [comptrollerData, setComptrollerData] = useState<Comptroller | null>(null)
    const [marketsData, setMarketsData] = useState<(CTokenInfo | null)[] | null | undefined>(null)
    const [gaugesV4Data, setGaugesV4Data] = useState<(GaugeV4 | null)[] | null | undefined>(null)
    const [generalData, setGeneralData] = useState<GeneralDetailsData | null>(null)
    const [selectedMarket, setSelectedMarket] = useState<CTokenInfo | null>(null)
    const [openEnterMarket, setOpenEnterMarket] = useState(false)
    const [openSupplyMarketDialog, setOpenSupplyDialog] = useState(false)
    const [openBorrowMarketDialog, setOpenBorrowMarketDialog] = useState(false)
    const [update, setUpdate] = useState<boolean>(false)
    const [completed, setCompleted] = useState<boolean>(false)

    const [updateErrorCounter, setUpdateErrorCounter] = useState<number>(0)
    const [updateHandle, setUpdateHandle] = useState<number | null>(null)

    const comptrollerDataRef = useRef<Comptroller | null>(null)
    const spinner = useRef<React.Dispatch<React.SetStateAction<boolean>> | null>(null)
    const updateRef = useRef<boolean | null>()
    const marketsRef = useRef<(CTokenInfo | null)[] | null | undefined>(null)
    const generalDataRef = useRef<GeneralDetailsData | null>(null)

    const selectedMarketRef = useRef<CTokenInfo | null>(null)
    const provider = useRef<ethers.providers.Web3Provider | null>(null)
    const userAddress = useRef<string | null>(null)
    const network = useRef<Network | null>(null)
    const updateErrorCounterRef = useRef<number>(0)

    const updateEarnedRef = useRef<boolean>(false)
    const hndPriceRef = useRef<number>(0)

    provider.current = props.provider
    userAddress.current = props.address
    network.current = props.network
    comptrollerDataRef.current = comptrollerData
    marketsRef.current = marketsData
    generalDataRef.current = generalData

    hndPriceRef.current = props.hndPrice
    
    updateRef.current = update
    spinner.current = props.setSpinnerVisible
    selectedMarketRef.current = selectedMarket
    updateErrorCounterRef.current = updateErrorCounter
    updateEarnedRef.current = props.updateEarned

    useEffect(() => {
      updateErrorCounterRef.current = updateErrorCounter
    },[updateErrorCounter])

    useEffect(() => {
      hndPriceRef.current = props.hndPrice
    },[props.hndPrice])

    useEffect(() => {
      const callUpdate = async () => {
        await dataUpdate()
      }

      updateEarnedRef.current = props.updateEarned
      if(props.updateEarned)
        callUpdate()
    },[props.updateEarned])

    const updateMarkets = (markets: CTokenInfo[], gauges: GaugeV4[], hndBalance: BigNumber, hundredBalace: BigNumber, compAccrued: BigNumber, cToken?: CTokenInfo, spinner?: string): void =>{
      if(marketsRef.current){
        markets.map((m) => {
          if(marketsRef.current && m){
            const market = marketsRef.current.find(x => x?.underlying.symbol === m.underlying.symbol)
            if (market){
              if(cToken && market.underlying.symbol === cToken.underlying.symbol && spinner){
                m.spinner = spinner === "spinner" ? false : market.spinner
                m.supplySpinner = spinner==="supply" ? false : market.supplySpinner
                m.withdrawSpinner = spinner === "withdraw" ? false : market.withdrawSpinner
                m.borrowSpinner = spinner === "borrow" ? false : market.borrowSpinner
                m.repaySpinner = spinner === "repay" ? false : market.repaySpinner
                m.stakeSpinner = spinner === "stake" ? false : market.stakeSpinner
                m.unstakeSpinner = spinner === "unstake" ? false : market.unstakeSpinner
                m.mintSpinner = spinner === "mint" ? false : market.mintSpinner
                if(market.backstop && m.backstop){
                  m.backstopDepositSpinner = spinner === "deposit" ? false : market.backstopDepositSpinner
                  m.backstopWithdrawSpinner = spinner === "backstopWithdraw" ? false : market.backstopWithdrawSpinner
                  m.backstopClaimSpinner = spinner === "backstopClaim" ? false : market.backstopClaimSpinner
                }
              }
              else{
                m.spinner = market.spinner
                m.supplySpinner = market.supplySpinner
                m.withdrawSpinner = market.withdrawSpinner
                m.borrowSpinner = market.borrowSpinner
                m.repaySpinner = market.repaySpinner
                m.stakeSpinner = market.stakeSpinner
                m.unstakeSpinner = market.unstakeSpinner
                m.mintSpinner = market.mintSpinner
                if(m.backstop && market.backstop){
                  m.backstopDepositSpinner = market.backstopDepositSpinner  
                  m.backstopWithdrawSpinner = market.backstopWithdrawSpinner
                  m.backstopClaimSpinner = market.backstopClaimSpinner
                }
              }
            }
          }
          return true
        })
      }
      const data = getGeneralDetails(markets, gauges, compAccrued)
      setMarketsData(markets)
      setGeneralData(data)
      props.setHndEarned(data.earned)
      props.setHndBalance(hndBalance)
      props.setHundredBalance(hundredBalace)
      // props.setHasClaimed(hasClaimed)
      if(selectedMarketRef.current && markets){
        const market = markets.find(x=>x?.underlying.symbol === selectedMarketRef.current?.underlying.symbol)
        if (market){
          setSelectedMarket(market)
        }
      }
    }

    const dataUpdate = async (cToken?: CTokenInfo, spinnerUpdate?:string) => {
      if(provider.current && network.current && userAddress.current){
        if(!comptrollerDataRef.current){
          const comptroller = await getComptrollerData(provider.current, network.current)
          setComptrollerData(comptroller)
        }
        if(provider.current && comptrollerDataRef.current){
          const gauges = await getGaugesData(provider.current, userAddress.current, network.current)
          const markets = await fetchData({ allMarkets: comptrollerDataRef.current.allMarkets, userAddress: userAddress.current, comptrollerData: comptrollerDataRef.current, network: network.current, marketsData: marketsRef.current, provider: provider.current, hndPrice: hndPriceRef.current, gaugesData: gauges })

          updateMarkets(markets.markets, gauges, markets.hndBalance, markets.hundredBalace, markets.comAccrued, cToken, spinnerUpdate)

          setGaugesV4Data(gauges)
        }
      }
    }

    const handleUpdate = async (market?: CTokenInfo, spinnerUpdate?: string) : Promise<void> => {
      //await dataUpdate(market, spinnerUpdate)
      try {
        //console.log(`Update every: ${updateErrorCounterRef.current * 10 + 10}sec`)
        if(updateHandle) clearTimeout(updateHandle)
        if(!updateRef.current){
          if(spinner.current) spinner.current(true)
        }
        
        await dataUpdate(market, spinnerUpdate)

        if(spinner.current && !updateRef.current) spinner.current(false)
        setUpdate(true)

        props.setUpdateEarned(false)
        setUpdateErrorCounter(0) 
        setUpdateHandle(setTimeout(handleUpdate, 10000))
      } 
      catch (error) {
        console.log(error)
        if(marketsRef.current)
          setUpdateHandle(setTimeout(handleUpdate, (updateErrorCounterRef.current < 2 ? updateErrorCounterRef.current + 1 : updateErrorCounterRef.current) * 10000 + 10000, market, spinnerUpdate))
        else{
          if(updateErrorCounterRef.current < 2)
            setUpdateHandle(setTimeout(handleUpdate, (updateErrorCounterRef.current + 1) * 1000, market, spinnerUpdate ))
          else if (updateErrorCounterRef.current === 3)
            setUpdateHandle(setTimeout(handleUpdate, 5000, market, spinnerUpdate))
          else if (updateErrorCounterRef.current === 7)
          {
            if(spinner.current && !updateRef.current) spinner.current(false)
            const err = error as MetamaskError
            props.toastError(`${err?.message.replace(".", "")} on Page Load\n${err?.data?.message}\nPlease refresh the page after a few minutes.`)
          }
          else
            setUpdateHandle(setTimeout(handleUpdate, 10000, market, spinnerUpdate))
        }
        setUpdateErrorCounter(updateErrorCounterRef.current+1)
      }
    }

    //Get Comptroller Data
    useEffect(() => {
        const getData= async () => {
            await handleUpdate()
        }
        setComptrollerData(null)
        setMarketsData(null)
        setGeneralData(null)
        setSelectedMarket(null)
        setOpenBorrowMarketDialog(false)
        setOpenSupplyDialog(false)
        setGaugesV4Data(null)
        if(updateHandle) clearTimeout(updateHandle)
        props.setSpinnerVisible(true)
        setUpdate(false)

        if(provider.current && network.current && network.current.chainId && userAddress.current && userAddress.current !== ""){
          getData()
        }
        else props.setSpinnerVisible(false)


        return() => {
          if(updateHandle) clearTimeout(updateHandle)
        }

    },[props.provider])

    const getMaxAmount = async (market: CTokenInfo, func?: string) : Promise<BigNumber> => {
        if (market.isNativeToken && props.provider) {
          const gasRemainder = BigNumber.parseValue("0.1")
          
          if(func === "repay" && provider.current){
            const balance = market.borrowBalanceInTokenUnit.subSafe(gasRemainder)
            return balance.gt(BigNumber.from("0")) ? balance : BigNumber.from("0") 
          }
          else if(func === "supply" && provider.current){
            const balance = market.underlying.walletBalance.gt(BigNumber.from("0")) ? market.underlying.walletBalance.subSafe(gasRemainder) : market.underlying.walletBalance
          
            return balance.gt(BigNumber.from("0")) ? balance : BigNumber.from("0") 
          }
        }
        
      return market.underlying.walletBalance
    }

    const getMaxRepayAmount = async (market: CTokenInfo) : Promise<BigNumber> => {
      if(market.isNativeToken) handleUpdate(market, "repay")
      
      const maxRepayFactor = BigNumber.from("1").addSafe(market.borrowRatePerBlock)//BigNumber.from("1").add(market.borrowApy); // e.g. Borrow APY = 2% => maxRepayFactor = 1.0002
      
      const amount = BigNumber.parseValueSafe(market.borrowBalanceInTokenUnit.mulSafe(maxRepayFactor).toString(), market.underlying.decimals)
      
      return amount // The same as ETH for now. The transaction will use -1 anyway.
    }

    const enterMarketDialog = (market: CTokenInfo) : void => {
      setSelectedMarket(market)
      setOpenEnterMarket(true)
    }

    const closeMarketDialog = () : void => {
      if(!props.spinnerVisible){
        setOpenEnterMarket(false)
        setSelectedMarket(null)
      }
    }

    const handleEnterMarket = async(symbol: string): Promise<void> => {
      if(marketsRef.current){
        let market = marketsRef.current.find(m => m?.underlying.symbol === symbol)
        if (market && provider.current && comptrollerDataRef.current && network.current && userAddress.current){
          try{
            if (spinner.current) spinner.current(true)
            const addr = [market.pTokenAddress]
            const signer = provider.current.getSigner()
            const signedComptroller = comptrollerDataRef.current.comptroller.connect(signer)
            const tx = await signedComptroller.enterMarkets(addr)
            if (spinner.current) spinner.current(false)
            market = marketsRef.current.find(m => m?.underlying.symbol === symbol)
            if(market) market.spinner = true
            console.log(tx)
            setOpenEnterMarket(false)
            const receipt = await tx.wait()
            console.log(receipt)
          }
          catch (err){
            console.log(err)
          }
          finally{
            if (spinner.current) spinner.current(false)
            market = marketsRef.current.find(x=> x?.underlying.symbol === symbol)
            if (market) 
              await handleUpdate(market, "spinner")
          }
        }
      }
    }

    const handleExitMarket = async (symbol: string): Promise<void> => {
      if(marketsRef.current){
        let market = marketsRef.current.find(m => m?.underlying.symbol === symbol)
        if (market && provider.current && comptrollerDataRef.current && userAddress.current && network.current){
          try{
            if(spinner.current) spinner.current(true)
            const signer = provider.current.getSigner()
            const signedComptroller = comptrollerDataRef.current.comptroller.connect(signer)
            const tx = await signedComptroller.exitMarket(market.pTokenAddress)
            if(spinner.current) spinner.current(false)
            market.spinner = true
            console.log(tx)
            setOpenEnterMarket(false)
            const receipt = await tx.wait() 
            console.log(receipt)
          }
          catch (err){
            console.log(err)
          }
          finally{
            if (spinner.current) spinner.current(false)
            market = marketsRef.current.find(x=> x?.underlying.symbol === symbol)
            if (market) 
              await handleUpdate(market, "spinner")
          }
        }
      }
    }
    
    const supplyMarketDialog = (market: CTokenInfo) => {
      setSelectedMarket(market)
      setOpenSupplyDialog(true)
    }

    const closeSupplyMarketDialog = () =>{
      if(!props.spinnerVisible){
        setOpenSupplyDialog(false)
        setSelectedMarket(null)
      }
    }

    const handleEnable = async (symbol: string, borrowDialog: boolean): Promise<void> => {
      if (spinner.current) spinner.current(true)
      if(marketsRef.current){
        let market = marketsRef.current.find(x=> x?.underlying.symbol === symbol)
        if(market && provider.current && network.current && userAddress.current){
          try{
            const signer = provider.current.getSigner()
            if(market.underlying.address){
              const contract = new ethers.Contract(market.underlying.address, TOKEN_ABI, signer);
              const tx = await contract.approve(market.pTokenAddress, MaxUint256._value)
              if (spinner.current) spinner.current(false)
              console.log(tx)
              borrowDialog ? market.repaySpinner = true : market.supplySpinner = true
              if(selectedMarketRef.current)
                borrowDialog ? selectedMarketRef.current.repaySpinner = true : selectedMarketRef.current.supplySpinner = true
            
              const receipt = await tx.wait()
              console.log(receipt)
            }
          }
          catch(err){
            const error = err as MetamaskError
            props.toastError(`${error?.message.replace(".", "")} on Approve\n${error?.data?.message}`)
            console.log(err)

          }
          finally{
            if (spinner.current) spinner.current(false)
            market = marketsRef.current.find(x =>x?.underlying.symbol === symbol)
            if(market){
              borrowDialog ? await handleUpdate(market, "repay") : await handleUpdate(market, "supply")
            }

            // setUpdate(true)
            // if(provider.current && network.current && userAddress.current){
            //   const comptroller = await getComptrollerData(provider.current, userAddress.current, network.current)
            //   setComptrollerData(comptroller)
            // }
            // if(selectedMarketRef.current && selectedMarketRef.current.symbol === symbol)
            //   borrowDialog ? selectedMarketRef.current.repaySpinner = false : selectedMarketRef.current.supplySpinner = false
          }
        }
      }
    }

    const handleSupply = async (symbol: string, amount: string) : Promise<void> => {
      if (marketsRef.current){
        if (spinner.current) spinner.current(true)
        let market = marketsRef.current.find(x =>x?.underlying.symbol === symbol)
        if(market && provider.current){
          try{
            setCompleted(false)
            const value = BigNumber.parseValueSafe(amount, market.underlying.decimals)
            const am = (market.isNativeToken) ? {value: value._value} : value._value
            if(selectedMarketRef.current)
              selectedMarketRef.current.supplySpinner = true
            market.supplySpinner = true
            const signer = provider.current.getSigner()
            const token = (market.isNativeToken) ? CETHER_ABI : CTOKEN_ABI
            const ctoken = new ethers.Contract(market.pTokenAddress, token, signer)
            const tx = await ctoken.mint(am)

            if (spinner.current) spinner.current(false)

            console.log(tx)
            const receipt = await tx.wait()
            console.log(receipt)
            setCompleted(true)
          }
          catch(err){
            console.log(err)
          }
          finally{
            if (spinner.current) spinner.current(false)
            market = marketsRef.current.find(x =>x?.underlying.symbol === symbol)
            if(market){
              await handleUpdate(market, "supply")
            }
              

            // if(provider.current && network.current && userAddress.current){
            //   const comptroller = await getComptrollerData(provider.current, userAddress.current, network.current)
            //   setComptrollerData(comptroller)
            // }
            // if(selectedMarketRef.current && selectedMarketRef.current.symbol === symbol)
            //   selectedMarketRef.current.supplySpinner = false
          }
        }
      }
      
    }

    const handleWithdraw = async (symbol: string, amount: string, max: boolean) : Promise<void> => {
      if(marketsRef.current){
        if (spinner.current) spinner.current(true)
        let market = marketsRef.current.find(x=>x?.underlying.symbol === symbol)
        if(market && provider.current){
          try{
            setCompleted(false)
            const signer = provider.current.getSigner()
            const token = market.isNativeToken ? CETHER_ABI : CTOKEN_ABI
            const ctoken = new ethers.Contract(market.pTokenAddress, token, signer)

            if (selectedMarketRef.current)
              selectedMarketRef.current.withdrawSpinner = true

            market.withdrawSpinner = true
            console.log(max)
            if (max){
              const accountSnapshot = await ctoken.getAccountSnapshot(userAddress.current)
              const withdraw = ethers.BigNumber.from(accountSnapshot[1].toString())
              const tx = await ctoken.redeem(withdraw)
              if (spinner.current) spinner.current(false)
              console.log(tx)
              const receipt = await tx.wait()
              console.log(receipt)
              setCompleted(true)
            }
            else{
              const withdraw = BigNumber.parseValueSafe(amount, market.underlying.decimals)
              const tx = await ctoken.redeemUnderlying(withdraw._value)
              if (spinner.current) spinner.current(false)
              console.log(tx)
              const receipt = await tx.wait()
              console.log(receipt)
            }
          }
          catch(err){
            console.log(err)
          }
          finally{
            if (spinner.current) spinner.current(false)
            market = marketsRef.current.find(x =>x?.underlying.symbol === symbol)
            if(market){
              setUpdate(true)
              await handleUpdate(market, "withdraw")
            }

            // market = marketsRef.current.find(x => x?.symbol === symbol)
            // if(market)
            //   market.withdrawSpinner = false
            // setUpdate(true)
            // if(provider.current && network.current && userAddress.current){
            //   const comptroller = await getComptrollerData(provider.current, userAddress.current, network.current)
            //   setComptrollerData(comptroller)
            // }
            // if(selectedMarketRef.current && selectedMarketRef.current.symbol === symbol)
            //   selectedMarketRef.current.withdrawSpinner = false
          }
        }
      }
    }

    const borrowMarketDialog = (market: CTokenInfo) : void => {
      setSelectedMarket(market)
      setOpenBorrowMarketDialog(true)
    }

    const closeBorrowMarketDialog = () => {
      if(!props.spinnerVisible){
        setOpenBorrowMarketDialog(false)
        setSelectedMarket(null)
      }
  }

  const handleBorrow = async (symbol: string, amount: string) => {
    if (marketsRef.current){
      if (spinner.current) spinner.current(true)
      let market = marketsRef.current.find(x => x?.underlying.symbol === symbol)
      if(market && provider.current){
        try{
          setCompleted(false)
          const value = BigNumber.parseValueSafe(amount, market.underlying.decimals)
          if (selectedMarketRef.current)
            selectedMarketRef.current.borrowSpinner = true
          market.borrowSpinner = true
          const signer = provider.current.getSigner()
          const token = market.isNativeToken ? CETHER_ABI : CTOKEN_ABI
          const ctoken = new ethers.Contract(market.pTokenAddress, token, signer)
          const tx = await ctoken.borrow(value._value)

          if (spinner.current) spinner.current(false)

          console.log(tx)
          const receipt = await tx.wait()
          console.log(receipt)
          setCompleted(true)
        }
        catch(err){
          console.log(err)
        }
        finally{
          if (spinner.current) spinner.current(false)
          market = marketsRef.current.find(x =>x?.underlying.symbol === symbol)
          if(market){
              setUpdate(true)
              await handleUpdate(market, "borrow")
          }
          // if(market)
          //   market.borrowSpinner = false
          // setUpdate(true)
          
          // if(provider.current && network.current && userAddress.current){
          //   const comptroller = await getComptrollerData(provider.current, userAddress.current, network.current)
          //   setComptrollerData(comptroller)
          // }
          
          // if(selectedMarketRef.current && selectedMarketRef.current.symbol === symbol)
          //   selectedMarketRef.current.borrowSpinner = false
        }
      }
    }
  }

  const handleRepay = async(symbol: string, amount: string, fullRepay: boolean) => {
    if(marketsRef.current){
      if (spinner.current) spinner.current(true)
      let market = marketsRef.current.find(x => x?.underlying.symbol === symbol)
      if(market && provider.current){
        try{
          setCompleted(false)
          const value = BigNumber.parseValueSafe(amount, market.underlying.decimals)
          const am = (market.isNativeToken) ? ({value: value._value}) : 
                   (fullRepay ? ethers.constants.MaxUint256 : value._value)
          if(selectedMarketRef.current)
            selectedMarketRef.current.repaySpinner = true

          market.repaySpinner = true
          const signer = provider.current.getSigner()
          const tokenABI = (market.isNativeToken) ? CETHER_ABI : CTOKEN_ABI
          const ctoken = new ethers.Contract(market.pTokenAddress, tokenABI, signer)
          
          const tx = await ctoken.repayBorrow(am)
          
          if (spinner.current) spinner.current(false)

          console.log(tx)
          const receipt = await tx.wait()
          console.log(receipt)
          setCompleted(true)
        }
        catch(err){
          console.log(err)
        }
        finally{
          if (spinner.current) spinner.current(false)
          market = marketsRef.current.find(x =>x?.underlying.symbol === symbol)
          if(market){
              setUpdate(true)
              await handleUpdate(market, "repay")
            }
        }
      }
    }
  }

  const handleApproveBackstop = async (symbol: string): Promise<void> => {
    if (spinner.current) spinner.current(true)
    if(marketsRef.current){
      let market = marketsRef.current.find(x=> x?.underlying.symbol === symbol)
      if(market && market.backstop && provider.current && network.current && userAddress.current){
        try{
          const signer = provider.current.getSigner()
          if(market.underlying.address && network.current.backstopMasterChef){
            const contract = new ethers.Contract(market.underlying.address, TOKEN_ABI, signer);
            const tx = await contract.approve(network.current.backstopMasterChef.address, MaxUint256._value)
            if (spinner.current) spinner.current(false)
            console.log(tx)
            market.backstopDepositSpinner = true
            if(selectedMarketRef.current && selectedMarketRef.current.backstop)
              selectedMarketRef.current.backstopDepositSpinner = true
          
            const receipt = await tx.wait()
            console.log(receipt)
          }
        }
        catch(err){
          const error = err as MetamaskError
          props.toastError(`${error?.message.replace(".", "")} on Approve\n${error?.data?.message}`)
          console.log(err)

        }
        finally{
          if (spinner.current) spinner.current(false)
          market = marketsRef.current.find(x =>x?.underlying.symbol === symbol)
          if(market && market.backstop){
            await handleUpdate(market, "deposit")
          }
        }
      }
    }
  }

  const handleBackstopDeposit = async (symbol: string, amount: string) : Promise<void> => {
    if (marketsRef.current && network.current && network.current.backstopMasterChef){
      if (spinner.current) spinner.current(true)
      let market = marketsRef.current.find(x =>x?.underlying.symbol === symbol)
      
      if(market && market.backstop && provider.current && network.current.backstopMasterChef){
        try{
          setCompleted(false)
          const value = BigNumber.parseValueSafe(amount, market.underlying.decimals)
          const am = value._value
          if(selectedMarketRef.current && selectedMarketRef.current.backstop)
            selectedMarketRef.current.backstopDepositSpinner = true
          market.backstopDepositSpinner = true

          const signer = provider.current.getSigner()
          const backstopAbi = network.current.backstopMasterChef.version === MasterChefVersion.v1 ? BACKSTOP_MASTERCHEF_ABI : BACKSTOP_MASTERCHEF_ABI_V2
          const backstop = new ethers.Contract(network.current.backstopMasterChef.address, backstopAbi, signer)
          const tx = await backstop.deposit(market.backstop.pool.poolId, am, userAddress.current)

          if (spinner.current) spinner.current(false)

          console.log(tx)
          const receipt = await tx.wait()
          console.log(receipt)
        }
        catch(err){
          console.log(err)
        }
        finally{
          if (spinner.current) spinner.current(false)
          market = marketsRef.current.find(x =>x?.underlying.symbol === symbol)
          if(market){
            await handleUpdate(market, "deposit")
          }
          setCompleted(true)
        }
      }
    }
  }

  const handleBackstopWithdraw = async (symbol: string, amount: string) : Promise<void> => {
    if (marketsRef.current && network.current && network.current.backstopMasterChef){
      if (spinner.current) spinner.current(true)
      let market = marketsRef.current.find(x =>x?.underlying.symbol === symbol)
      
      if(market && market.backstop && provider.current && network.current.backstopMasterChef){
        try{
          setCompleted(false)
          market.backstopWithdrawSpinner = true
          if(selectedMarketRef.current && selectedMarketRef.current.backstop)
            selectedMarketRef.current.backstopWithdrawSpinner = true
          const value = BigNumber.parseValueSafe(amount, market.backstop.decimals)
          const am = value._value
          const signer = provider.current.getSigner()
          const backstopAbi = network.current.backstopMasterChef.version === MasterChefVersion.v1 ? BACKSTOP_MASTERCHEF_ABI : BACKSTOP_MASTERCHEF_ABI_V2
          const backstop = new ethers.Contract(network.current.backstopMasterChef.address, backstopAbi, signer)
          const tx = await backstop.withdrawAndHarvest(market.backstop.pool.poolId, am, userAddress.current)

          if (spinner.current) spinner.current(false)

          console.log(tx)
          const receipt = await tx.wait()
          console.log(receipt)
        }
        catch(err){
          console.log(err)
        }
        finally{
          if (spinner.current) spinner.current(false)
          market = marketsRef.current.find(x =>x?.underlying.symbol === symbol)
          if(market){
            await handleUpdate(market, "backstopWithdraw")
            if(selectedMarketRef.current && selectedMarketRef.current.underlying.symbol === market.underlying.symbol)
              selectedMarketRef.current.backstopWithdrawSpinner = false
          }
          setCompleted(true)
        }
      }
    }
  }

  const handleBackstopClaim = async (symbol: string) : Promise<void> => {
    if (marketsRef.current && network.current && network.current.backstopMasterChef){
      if (spinner.current) spinner.current(true)
      let market = marketsRef.current.find(x =>x?.underlying.symbol === symbol)
      
      if(market && market.backstop && provider.current && network.current.backstopMasterChef){
        try{
          setCompleted(false)
          market.backstopClaimSpinner = true
          if(selectedMarketRef.current && selectedMarketRef.current.backstop)
            selectedMarketRef.current.backstopClaimSpinner = true
          const signer = provider.current.getSigner()
          const backstopAbi = network.current.backstopMasterChef.version === MasterChefVersion.v1 ? BACKSTOP_MASTERCHEF_ABI : BACKSTOP_MASTERCHEF_ABI_V2
          const backstop = new ethers.Contract(network.current.backstopMasterChef.address, backstopAbi, signer)
          const tx = await backstop.harvest(market.backstop.pool.poolId, userAddress.current)

          if (spinner.current) spinner.current(false)

          console.log(tx)
          const receipt = await tx.wait()
          console.log(receipt)
        }
        catch(err){
          console.log(err)
        }
        finally{
          if (spinner.current) spinner.current(false)
          market = marketsRef.current.find(x =>x?.underlying.symbol === symbol)
          if(market){
            await handleUpdate(market, "backstopClaim")
          }
          setCompleted(true)
        }
      }
    }
  }

  const handleStake = async (symbol: string | undefined, gaugeV4: GaugeV4 | null | undefined, amount: string) => {
      if(marketsRef.current){
          if (spinner.current) spinner.current(true)
          let market = marketsRef.current.find(x => x?.underlying.symbol === symbol)
          if(market && provider.current){
              try{
                  setCompleted(false)

                  if(selectedMarketRef.current)
                      selectedMarketRef.current.stakeSpinner = true

                  market.stakeSpinner = true

                  await gaugeV4?.stakeCall(amount)

                  if (spinner.current) spinner.current(false)

                  setCompleted(true)
              }
              catch(err){
                  console.log(err)
              }
              finally{
                  if (spinner.current) spinner.current(false)
                  market = marketsRef.current.find(x =>x?.underlying.symbol === symbol)
                  if(market){
                      setUpdate(true)
                      await handleUpdate(market, "stake")
                  }
              }
          }
      }
  }

  const handleApproveStake = async (symbol: string | undefined, gaugeV4: GaugeV4 | null | undefined) => {
      if(marketsRef.current){
          if (spinner.current) spinner.current(true)
          let market = marketsRef.current.find(x => x?.underlying.symbol === symbol)
          if(market && provider.current){
              try{
                  setCompleted(false)

                  if(selectedMarketRef.current)
                      selectedMarketRef.current.stakeSpinner = true

                  market.stakeSpinner = true

                  await gaugeV4?.approveCall()

                  if (spinner.current) spinner.current(false)

                  setCompleted(true)
              }
              catch(err){
                  console.log(err)
              }
              finally{
                  if (spinner.current) spinner.current(false)
                  market = marketsRef.current.find(x =>x?.underlying.symbol === symbol)
                  if(market){
                      setUpdate(true)
                      await handleUpdate(market, "stake")
                  }
              }
          }
      }
  }

    const handleUnstake = async (symbol: string | undefined, gaugeV4: GaugeV4 | null | undefined, amount: string) => {
        if(marketsRef.current){
            if (spinner.current) spinner.current(true)
            let market = marketsRef.current.find(x => x?.underlying.symbol === symbol)
            if(market && provider.current){
                try{
                    setCompleted(false)

                    if(selectedMarketRef.current)
                        selectedMarketRef.current.unstakeSpinner = true

                    market.unstakeSpinner = true

                    await gaugeV4?.unstakeCall(amount)

                    if (spinner.current) spinner.current(false)

                    setCompleted(true)
                }
                catch(err){
                    console.log(err)
                }
                finally{
                    if (spinner.current) spinner.current(false)
                    market = marketsRef.current.find(x =>x?.underlying.symbol === symbol)
                    if(market){
                        setUpdate(true)
                        await handleUpdate(market, "unstake")
                    }
                }
            }
        }
    }

    const handleMint = async (symbol: string | undefined, gaugeV4: GaugeV4 | null | undefined) => {
        if(marketsRef.current){
            if (spinner.current) spinner.current(true)
            let market = marketsRef.current.find(x => x?.underlying.symbol === symbol)
            if(market && provider.current){
                try{
                    setCompleted(false)

                    if(selectedMarketRef.current)
                        selectedMarketRef.current.mintSpinner = true

                    market.mintSpinner = true

                    await gaugeV4?.mintCall()

                    if (spinner.current) spinner.current(false)

                    setCompleted(true)
                }
                catch(err){
                    console.log(err)
                }
                finally{
                    if (spinner.current) spinner.current(false)
                    market = marketsRef.current.find(x =>x?.underlying.symbol === symbol)
                    if(market){
                        setUpdate(true)
                        await handleUpdate(market, "mint")
                    }
                }
            }
        }
    }
    
    return (
        <div className="content">
            <GeneralDetails generalData={generalData}/>
            <Markets
                generalData = {generalDataRef.current}
                marketsData = {marketsData}
                enterMarketDialog={enterMarketDialog}
                supplyMarketDialog={supplyMarketDialog}
                borrowMarketDialog={borrowMarketDialog}
                darkMode={props.darkMode}
            />
            <EnterMarketDialog open={openEnterMarket} market={selectedMarket} generalData={generalData} closeMarketDialog = {closeMarketDialog} 
              handleEnterMarket={handleEnterMarket} handleExitMarket={handleExitMarket}/>
            <SupplyMarketDialog
                completed={completed}
                open={openSupplyMarketDialog}
                market={selectedMarketRef.current}
                generalData={generalData}
                closeSupplyMarketDialog={closeSupplyMarketDialog}
                darkMode={props.darkMode}
                handleEnable = {handleEnable}
                handleSupply={handleSupply}
                handleWithdraw={handleWithdraw}
                handleStake={handleStake}
                handleUnstake={handleUnstake}
                handleMint={handleMint}
                getMaxAmount={getMaxAmount}
                spinnerVisible={props.spinnerVisible}
                gaugeV4={gaugesV4Data?.find(g => g?.generalData.lpToken.toLowerCase() === selectedMarketRef.current?.pTokenAddress.toLowerCase())}
                handleApproveBackstop={handleApproveBackstop}
                handleBackstopDeposit={handleBackstopDeposit}
                handleBackstopWithdraw={handleBackstopWithdraw}
                handleBackstopClaim={handleBackstopClaim}
                handleApproveStake={handleApproveStake}
            />
            <BorrowMarketDialog completed={completed} open={openBorrowMarketDialog} market={selectedMarket} generalData={generalData} 
              closeBorrowMarketDialog={closeBorrowMarketDialog} darkMode={props.darkMode} getMaxAmount={getMaxAmount} handleEnable = {handleEnable}
              handleBorrow={handleBorrow} handleRepay={handleRepay} getMaxRepayAmount={getMaxRepayAmount} spinnerVisible={props.spinnerVisible}/> 
        </div>
    )
}

export default Content