import db from "../database/db.js"
// import web3 from "web3"
// import {
//     ethers
// } from "ethers"
// import {
//     initWeb3,
//     initContract
// } from '../libs/utils'
// import tokenConfig from '../../contract.config'
// import axios from 'axios'
// import BigNumber from "bignumber.js"
// import {
//     getLemdPrice,
//     getTokensPrice
// } from '../../api/api'
// import fs from "fs"


// const Op = db.Op
// const Lend = db.Lend
// const Airdrop = db.Airdrop


// export async function airdrop(req, res) {
//     const {
//         address,
//         telegram,
//         twitter,
//         tweet
//     } = req.query

//     const findResult = await Airdrop.findAll({
//         where: {
//             [Op.or]: [{
//                 address: address
//             }, {
//                 telegram: telegram
//             }, {
//                 twitter: twitter
//             }, {
//                 tweet: tweet
//             }],
//         },
//     })

//     let callBackData = {
//         success: true,
//         status: 200,
//         message: "Success",
//         data: null,
//     }

//     // console.log("findResult.length", findResult.length)

//     // if(findResult.length > 0){
//     //     callBackData = {
//     //         success: false,
//     //         status: 200,
//     //         message: "Fail",
//     //         data: null,
//     //     }
//     //     res.status(200)
//     //     res.json(callBackData)
//     //     return
//     // }

//     const result = await Airdrop.create({
//         address: address,
//         telegram: telegram,
//         twitter: twitter,
//         tweet: tweet,
//         status: 1,
//     })
//     res.status(200)
//     res.json(callBackData)
// }

// export async function getTotalValueLocked(req, res) {
//     const result = await Lend.sum("market_size")
//     let callBackData = {
//         success: true,
//         status: 200,
//         message: "Success",
//         data: result,
//     }
//     res.status(200)
//     res.json(callBackData)
// }

// export async function getLendInfo(req, res) {
//     const result = await Lend.findAll()
//     let callBackData = {
//         success: true,
//         status: 200,
//         message: "Success",
//         data: result,
//     }
//     res.status(200)
//     res.json(callBackData)
// }

// export async function updateLendTotalInfo(req, res) {
//     // try {
//     const {
//         OKT,
//         OKB,
//         USDT,
//         ETHK,
//         BTCK,
//         DAIK,
//         USDC,
//         UNIK
//     } = tokenConfig.lend.tokens
//     const {
//         lEther,
//         lOKB,
//         lUSDT,
//         lETHK,
//         lBTCK,
//         lDAIK,
//         lUSDC,
//         lUNIK
//     } = tokenConfig.lend.lTokens
//     const {
//         lemdDistribution
//     } = tokenConfig.lend.controller
//     const lemdPrice = await getLemdPrice()
//     const prices = await getTokensPrice()
//     const {
//         data
//     } = prices.data

//     console.log(
//         "pairs_price",
//         data.pairs[0].token0Price,
//         data.pairs[1].token0Price,
//         data.pairs[3].token0Price,
//         data.pairs[4].token0Price,
//         data.pairs[2].token0Price,
//     )
//     await getLendInfoFromToken(OKT.abi, OKT.address, lEther.abi, lEther.address, lemdDistribution.abi, lemdDistribution.address, lemdPrice, data.pairs[0].token0Price, "")
//     await getLendInfoFromToken(OKB.abi, OKB.address, lOKB.abi, lOKB.address, lemdDistribution.abi, lemdDistribution.address, lemdPrice, data.pairs[1].token0Price, "")
//     await getLendInfoFromToken(USDT.abi, USDT.address, lUSDT.abi, lUSDT.address, lemdDistribution.abi, lemdDistribution.address, lemdPrice, data.pairs[4].token0Price, "")
//     await getLendInfoFromToken(ETHK.abi, ETHK.address, lETHK.abi, lETHK.address, lemdDistribution.abi, lemdDistribution.address, lemdPrice, data.pairs[5].token0Price, "")
//     await getLendInfoFromToken(BTCK.abi, BTCK.address, lBTCK.abi, lBTCK.address, lemdDistribution.abi, lemdDistribution.address, lemdPrice, data.pairs[2].token0Price, "")
//     // await getLendInfoFromToken(DAIK.abi, DAIK.address, lDAIK.abi, lDAIK.address, lemdDistribution.abi, lemdDistribution.address, lemdPrice, "1.0005")
//     // await getLendInfoFromToken(USDC.abi, USDC.address, lUSDC.abi, lUSDC.address, lemdDistribution.abi, lemdDistribution.address, lemdPrice, "1.0001")
//     // await getLendInfoFromToken(UNIK.abi, UNIK.address, lUNIK.abi, lUNIK.address, lemdDistribution.abi, lemdDistribution.address, lemdPrice, data.pairs[3].token0Price, "")
//     let callBackData = {
//         message: "Success",
//         data: data.pairs,
//     }
//     res.status(200)
//     res.json(callBackData)
//     // } catch (error) {
//     //     res.status(400)
//     //     res.json({ message: "Bad Request", error: error })
//     // }
// }

// export async function getLendInfoFromToken(tokenAbi, tokenAddress, lTokenAbi, lTokenAddress, lemdDistributionAbi, lemdDistributionAddress, lemdPrice, tokenPrice, account) {
//     const web3 = initWeb3()
//     const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress)
//     const lTokenContract = new web3.eth.Contract(lTokenAbi, lTokenAddress)
//     const lemdDistributionContract = new web3.eth.Contract(lemdDistributionAbi, lemdDistributionAddress)
//     var digits = 18
//     var ethMantissa = 1e10
//     var tokenName
//     if (tokenAddress == "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
//         digits = 18
//         ethMantissa = 1e18
//         tokenName = "OKT"
//     } else {
//         tokenName = await tokenContract.methods.name().call()
//     }
//     const blocksPerDay = 15 * 60 * 24
//     const daysPerYear = 365
//     tokenPrice = new BigNumber(tokenPrice).times(new BigNumber(10).pow(18))
//     console.log("tokenPrice", tokenPrice.toString())
//     const supplyRatePerBlock = await lTokenContract.methods.supplyRatePerBlock().call()
//     const borrowRatePerBlock = await lTokenContract.methods.borrowRatePerBlock().call()
//     console.log("supplyRatePerBlock", supplyRatePerBlock, "borrowRatePerBlock", borrowRatePerBlock)
//     // const supplyApy = ((Math.pow((supplyRatePerBlock / 1e18) * blocksPerDay + 1, daysPerYear) - 1) * 100).toFixed(2)
//     // const borrowApy = ((((Math.pow((borrowRatePerBlock / 1e18 * blocksPerDay) + 1, daysPerYear))) - 1) * 100).toFixed(2)
//     const totalSupply = await lTokenContract.methods.totalSupply().call()
//     console.log("totalSupply", totalSupply)
//     const exchangeRate = (await lTokenContract.methods.exchangeRateCurrent().call()) / ethMantissa
//     console.log("exchangeRate", exchangeRate)
//     const cash = await lTokenContract.methods.getCash().call()
//     console.log("cash", cash)
//     const totalBorrowsCurrent = await lTokenContract.methods.totalBorrowsCurrent().call()
//     console.log("totalBorrowsCurrent", totalBorrowsCurrent)
//     const totalBorrow = new BigNumber(totalBorrowsCurrent).div(new BigNumber(10).pow(digits)).times(tokenPrice).div(new BigNumber(10).pow(18)).toFixed(2)
//     console.log("totalBorrow", totalBorrow)
//     const marketSize = (new BigNumber(cash).plus(totalBorrowsCurrent)).times(tokenPrice).div(new BigNumber(10).pow(18)).div(new BigNumber(10).pow(18)).toFixed(2)
//     console.log("marketSize", marketSize)
//     const utilizationRate = new BigNumber(totalBorrowsCurrent).div(new BigNumber(totalBorrowsCurrent).plus(cash))
//     const borrowApy = utilizationRate.times(0.05).div(0.85).times(100).toFixed(2)
//     console.log("borrowApy", borrowApy)
//     const supplyApy = (new BigNumber(borrowApy).times(1 - 0.1) * utilizationRate).toFixed(2)
//     console.log("supplyApy", supplyApy)

//     const lemdSpeedPerBlock = new BigNumber(await lemdDistributionContract.methods.lemdSpeeds(lTokenAddress).call()).div(new BigNumber(10).pow(18)).times(lemdPrice)
//     console.log("lemdSpeed", lemdSpeedPerBlock.toFixed())
//     const supplyRewardAPY = new BigNumber(lemdSpeedPerBlock).times(blocksPerDay).times(daysPerYear).div(marketSize).times(100).toFixed(2)
//     const borrowRewardAPY = new BigNumber(lemdSpeedPerBlock).times(blocksPerDay).times(daysPerYear).div(totalBorrow).times(100).toFixed(2)
//     console.log("supplyRewardAPY", supplyRewardAPY)
//     console.log("borrowRewardAPY", borrowRewardAPY)
//     const totalSupplyAPY = parseFloat(supplyApy) + parseFloat(supplyRewardAPY == Infinity ? 0 : supplyRewardAPY)
//     const totalBorrowAPY = parseFloat(borrowApy) - parseFloat(borrowRewardAPY == Infinity ? 0 : borrowRewardAPY)
//     console.log("totalSupplyAPY", totalSupplyAPY)
//     console.log("totalBorrowAPY", totalBorrowAPY)
//     const selectIndex = await Lend.findOne({
//         attributes: ["id"],
//         where: {
//             token_name: tokenName,
//         },
//     })
//     const insertLendInfo = await Lend.upsert({
//         id: selectIndex ? selectIndex.id : null,
//         token_name: tokenName,
//         market_size: marketSize,
//         total_borrow: totalBorrow,
//         deposit_total_apy: totalSupplyAPY,
//         borrow_total_apy: totalBorrowAPY,
//         supply_apy: supplyApy,
//         supply_distribution_apy: supplyRewardAPY,
//         borrow_apy: borrowApy,
//         borrow_distribution_apy: borrowRewardAPY,
//         status: 1,
//     })

// }

// export async function updatePriceOracle(req, res) {
//     try {
//         const web3 = initWeb3()
//         const {
//             priceOracle
//         } = tokenConfig.lend.controller
//         web3.eth.accounts.wallet.create(1, "54674321§3456764321§345674321§3453647544±±±§±±±!!!43534534534534")
//         const mnemonic = fs.readFileSync(".secret").toString().trim()
//         web3.eth.accounts.wallet.add(mnemonic)
//         this.priceOracle = new web3.eth.Contract(priceOracle.abi, priceOracle.address)
//         const {
//             lEther,
//             lOKB,
//             lUSDT,
//             lETHK,
//             lBTCK,
//             lDAIK,
//             lUSDC,
//             lUNIK
//         } = tokenConfig.lend.lTokens
//         const prices = await getTokensPrice()
//         const {
//             data
//         } = prices.data
//         console.log(
//             "pairs_price",
//             data.pairs[0].token0Price,
//             data.pairs[1].token0Price,
//             data.pairs[3].token0Price,
//             data.pairs[4].token0Price,
//             data.pairs[2].token0Price,
//         )
//         // console.log(lEther.address, data.pairs[0].token0Price)
//         // await this.priceOracle.methods
//         //     .setUnderlyingPrice(lEther.address, ethers.utils.parseEther("555"))
//         //     .send({
//         //         from: "0xaf4944eBFEc95497f1A1D3B1a955ABbe828f842b",
//         //         gas: 200000
//         //     })
//         await this.priceOracle.methods
//             .setUnderlyingPrice(lEther.address, ethers.utils.parseEther(parseFloat(data.pairs[0].token0Price).toFixed(2)))
//             .send({
//                 from: "0xaf4944eBFEc95497f1A1D3B1a955ABbe828f842b",
//                 gas: 200000
//             })
//         await this.priceOracle.methods
//             .setUnderlyingPrice(lOKB.address, ethers.utils.parseEther(parseFloat(data.pairs[1].token0Price).toFixed(2)))
//             .send({
//                 from: "0xaf4944eBFEc95497f1A1D3B1a955ABbe828f842b",
//                 gas: 200000
//             })
//         await this.priceOracle.methods
//             .setUnderlyingPrice(lUSDT.address, ethers.utils.parseEther(parseFloat(data.pairs[4].token0Price).toFixed(2)))
//             .send({
//                 from: "0xaf4944eBFEc95497f1A1D3B1a955ABbe828f842b",
//                 gas: 200000
//             })
//         await this.priceOracle.methods
//             .setUnderlyingPrice(lETHK.address, ethers.utils.parseEther(parseFloat(data.pairs[5].token0Price).toFixed(2)))
//             .send({
//                 from: "0xaf4944eBFEc95497f1A1D3B1a955ABbe828f842b",
//                 gas: 200000
//             })
//         await this.priceOracle.methods
//             .setUnderlyingPrice(lBTCK.address, ethers.utils.parseEther(parseFloat(data.pairs[2].token0Price).toFixed(2)))
//             .send({
//                 from: "0xaf4944eBFEc95497f1A1D3B1a955ABbe828f842b",
//                 gas: 200000
//             })
//         // await this.priceOracle.methods
//         //     .setUnderlyingPrice(lUSDC.address, ethers.utils.parseEther("1.001"))
//         //     .send({
//         //         from: "0xaf4944eBFEc95497f1A1D3B1a955ABbe828f842b",
//         //         gas: 200000
//         //     })
//         // await this.priceOracle.methods
//         //     .setUnderlyingPrice(lDAIK.address, ethers.utils.parseEther("1.0005"))
//         //     .send({
//         //         from: "0xaf4944eBFEc95497f1A1D3B1a955ABbe828f842b",
//         //         gas: 200000
//         //     })
//         // await this.priceOracle.methods
//         //     .setUnderlyingPrice(lUNIK.address, ethers.utils.parseEther(parseFloat(data.pairs[3].token0Price).toFixed(2)))
//         //     .send({
//         //         from: "0xaf4944eBFEc95497f1A1D3B1a955ABbe828f842b",
//         //         gas: 200000
//         //     })
//         let callBackData = {
//             success: true,
//             status: 200,
//             message: "Success",
//             data: null,
//         }
//         res.status(200)
//         res.json(callBackData)
//     } catch (error) {
//         res.status(400)
//         res.json({
//             message: "Bad Request",
//             error: error
//         })
//     }
// }