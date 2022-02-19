import ETHlogo from "../../public/images/ETH-logo.svg"
import MATIClogo from "../../public/images/MATIC-logo.png"
import AAVElogo from "../../public/images/AAVE-logo.svg"
import DAIlogo from "../../public/images/DAI-logo.svg"
import LINKlogo from "../../public/images/LINK-logo.svg"
import USDClogo from "../../public/images/USDC-logo.svg"
import USDTlogo from "../../public/images/USDT-logo.svg"
import WBTClogo from "../../public/images/WBTC-logo.svg"
import BUSDlogo from "../../public/images/BUSD-logo.png"
import COMPlogo from "../../public/images/COMP-logo.svg"
import LRClogo from "../../public/images/LRC-logo.png"
import SNXlogo from "../../public/images/SNX-logo.svg"
import TUSDlogo from "../../public/images/TUSD-logo.png"
import UNIlogo from "../../public/images/UNI-logo.svg"
import YFIlogo from "../../public/images/YFI-logo.svg"
import SUSDlogo from "../../public/images/SUSD-logo.png"
import XDAIlogo  from "../../public/images/XDAI-logo.png"
import SUSHIlogo  from "../../public/images/SUSHI-logo.svg"
import BALlogo  from "../../public/images/BAL-logo.png"
import CRVlogo  from "../../public/images/CRV-logo.png"
import MKRlogo  from "../../public/images/MKR-logo.png"
import HHTlogo from "../../public/images/HHT-logo.png"
import HUSDlogo from "../../public/images/HUSD-logo.png"
import MDXlogo from "../../public/images/MDX-logo.png"
import BAGSlogo from "../../public/images/MDX-logo.png"
import HBCHlogo from "../../public/images/HBCH-logo.png"
import HFILlogo from "../../public/images/HFIL-logo.png"
import HLTClogo from "../../public/images/HLTC-logo.png"
import HDOTlogo from "../../public/images/HDOT-logo.png"
import BNBlogo from "../../public/images/BNB-logo.png"
import ADAlogo from "../../public/images/ADA-logo.png"
import ALPHAlogo from "../../public/images/ALPHA-logo.png"
import ATOMlogo from "../../public/images/ATOM-logo.png"
import AUTOlogo from "../../public/images/AUTO-logo.png"
import BANDlogo from "../../public/images/BAND-logo.png"
import BCHlogo from "../../public/images/BCH-logo.png"
// import BTCBlogo from "../../public/images/BTCB-logo.png"
import CAKElogo from "../../public/images/CAKE-logo.png"
import CREAMlogo from "../../public/images/CREAM-logo.png"
import DFlogo from "../../public/images/DF-logo.png"
import DOTlogo from "../../public/images/DOT-logo.png"
import EOSlogo from "../../public/images/EOS-logo.png"
import FILlogo from "../../public/images/FIL-logo.png"
import LINAlogo from "../../public/images/LINA-logo.png"
import LTClogo from "../../public/images/LTC-logo.png"
import PAXGlogo from "../../public/images/PAXG-logo.png"
import RAMPlogo from "../../public/images/RAMP-logo.png"
import SXPlogo from "../../public/images/SXP-logo.png"
import TWTlogo from "../../public/images/TWT-logo.png"
import VAIlogo from "../../public/images/VAI-logo.png"
import BZRXlogo from "../../public/images/BZRX-logo.png"
import XRPlogo from "../../public/images/XRP-logo.png"
import XTZlogo from "../../public/images/XTZ-logo.png"
import XVSlogo from "../../public/images/XVS-logo.png"
import YFIIlogo from "../../public/images/YFII-logo.png"
import REPlogo from "../../public/images/REP-logo.png"
import BATlogo from "../../public/images/BAT-logo.png"
import ZRXlogo from "../../public/images/ZRX-logo.png"
import KNClogo from "../../public/images/KNC-logo.png"
import MANAlogo from "../../public/images/MANA-logo.png"
import ARBITRUMlogo from "../../public/images/ARBITRUM-logo.png"
import HUNDREDlogo from "../../public/images/HUNDRED-logo.png"
import ONElogo from "../../public/images/ONE-logo.svg"
import OPTlogo from "../../public/images/OPT-logo.png"
import IOTXlogo from "../../public/images/IOTX-logo.svg"
import MIMlogo from "../../public/images/MIM-logo.svg"
import FRAXlogo from "../../public/images/FRAX-logo.svg"
import SPELLlogo from "../../public/images/SPELL-logo.svg"
import DODOlogo from "../../public/images/DODO-logo.svg"
import FTMlogo from "../../public/images/FTM-logo\.svg"
import BTClogo from "../../public/images/BTC-logo.svg"
import MOVRlogo from "../../public/images/MOVR-logo.png"
import USTlogo from "../../public/images/UST-logo.png"
import HRENBTClogo from "../../public/images/RENBTC-logo.png"

const Logos: { [key: string]: string } = {
    "ETH"       : ETHlogo,
    "WETH"      : ETHlogo,
    "AETH"      : ETHlogo,
    "MATIC"     : MATIClogo,
    "AAVE"      : AAVElogo,
    "DAI"       : DAIlogo,
    "LINK"      : LINKlogo,
    "USDC"      : USDClogo,
    "USDT"      : USDTlogo,
    "WBTC"      : WBTClogo,
    "BUSD"      : BUSDlogo,
    "COMP"      : COMPlogo,
    "LRC"       : LRClogo,
    "SNX"       : SNXlogo,
    "TUSD"      : TUSDlogo,
    "UNI"       : UNIlogo,
    "YFI"       : YFIlogo,
    "sUSD"      : SUSDlogo,
    "SUSD"      : SUSDlogo,
    "XDAI"      : XDAIlogo,
    "xDAI"      : XDAIlogo,
    "SUSHI"     : SUSHIlogo,
    "BAL"       : BALlogo,
    "CRV"       : CRVlogo,
    "MKR"       : MKRlogo,
    "HT"        : HHTlogo,
    "HUSD"      : HUSDlogo,
    "MDX"       : MDXlogo,
    "BAGS"      : BAGSlogo,
    "HBCH"      : HBCHlogo,
    "HFIL"      : HFILlogo,
    "HLTC"      : HLTClogo,
    "HDOT"      : HDOTlogo,
    "BNB"       : BNBlogo,
    "ADA"       : ADAlogo,
    "ALPHA"     : ALPHAlogo,
    "ATOM"      : ATOMlogo,
    "AUTO"      : AUTOlogo,
    "BAND"      : BANDlogo,
    "BCH"       : BCHlogo,
    "BTCB"      : BTClogo,
    "Cake"      : CAKElogo,
    "CREAM"     : CREAMlogo,
    "DF"        : DFlogo,
    "DOT"       : DOTlogo,
    "EOS"       : EOSlogo,
    "FIL"       : FILlogo,
    "LINA"      : LINAlogo,
    "LTC"       : LTClogo,
    "PAXG"      : PAXGlogo,
    "RAMP"      : RAMPlogo,
    "SXP"       : SXPlogo,
    "TWT"       : TWTlogo,
    "VAI"       : VAIlogo,
    "BZRX"      : BZRXlogo,
    "XRP"       : XRPlogo,
    "XTZ"       : XTZlogo,
    "XVS"       : XVSlogo,
    "YFII"      : YFIIlogo,
    "REP"       : REPlogo,
    "BAT"       : BATlogo,
    "ZRX"       : ZRXlogo,
    "KNC"       : KNClogo,
    "MANA"      : MANAlogo,
    "ARBITRUM"  : ARBITRUMlogo,
    "HND"       : HUNDREDlogo,
    "ONE"       : ONElogo,
    "tUSDC"     : USDClogo,
    "OPT"       : OPTlogo,
    "IOTX"      : IOTXlogo,
    "IOTX-T"    : IOTXlogo,
    "MIM"       : MIMlogo,
    "FRAX"      : FRAXlogo,
    "SPELL"     : SPELLlogo,
    "DODO"      : DODOlogo,
    "FTM"       : FTMlogo,
    "fUSDT"     : USDTlogo,
    "BTC"       : WBTClogo,
    "MOVR"      : MOVRlogo,
    "ioETH"     : ETHlogo,
    "ioUSDT"    : USDTlogo,
    "ioWBTC"    : WBTClogo,
    "ioBUSD"    : BUSDlogo,
    "ioUSDC"    : USDClogo,
    "BNB.bsc"   : BNBlogo,
    "1ETH"      : ETHlogo,
    "1USDC"     : USDClogo,
    "1USDT"     : USDTlogo,
    "1WBTC"     : WBTClogo,
    "UST"       : USTlogo,
    "WBTC.eth"  : WBTClogo,
    "renBTC"   : HRENBTClogo
}

export default Logos