import {
  TREASURY_WALLET_REQUEST,
  TREASURY_WALLET_SUCCESS,
  TREASURY_WALLET_FAIL,
} from './constants'

import getContracts from '../Blockchain/contracts'

// actions
export const treasuryWalletAction = (amount) => async (dispatch, getState) => {
  try {
    const {
      profile: {walletType, userAddress},
    } = getState()

    const {usdc, web3, depositUSDC} = getContracts(walletType)
    const price = web3.utils.toWei(amount.toString())
    dispatch({
      type: TREASURY_WALLET_REQUEST,
      payload: amount,
    })

    await usdc.methods
      .approve(depositUSDC._address, price)
      .send({from: userAddress})

    const transaction = await depositUSDC.methods
      .buyToken(price)
      .send({from: userAddress})

    const tranHash = transaction.transactionHash
    const usdcAmount = web3.utils.fromWei(
      transaction.events.BuyToken.returnValues.usdcAmount.toString()
    )

    dispatch({
      type: TREASURY_WALLET_SUCCESS,
      payload: {tranHash, usdcAmount},
    })
  } catch (error) {
    dispatch({
      type: TREASURY_WALLET_FAIL,
      payload: error?.message,
    })
  }
}
