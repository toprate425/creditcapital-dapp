import {
  TREASURY_WALLET_REQUEST,
  TREASURY_WALLET_SUCCESS,
  TREASURY_WALLET_FAIL,
  TREASURY_INFO_SUCCESS,
  TREASURY_INFO_REQUEST,
  TREASURY_AMOUNT_SUCCESS,
  TREASURY_AMOUNT_REQUEST,
} from './constants'

const initialState = {
  loading: false,
  DummyUsdc: '',
  error: false,
  USDCAmount: '',
  tranHash: '',
  depositedAmount: null,
  totalDepositedLoading: false,
  totalDepositedAmount: null,
  depositedLoading: false,
}

export const defaultReducer = (state = initialState, action) => {
  switch (action.type) {
    case TREASURY_WALLET_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
        DummyUsdc: action.payload,
      }
    case TREASURY_INFO_REQUEST:
      return {
        ...state,
        depositedLoading: true,
      }
    case TREASURY_INFO_SUCCESS:
      return {
        ...state,
        depositedAmount: action.payload,
        depositedLoading: false,
      }
    case TREASURY_WALLET_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        DummyUsdc: '',
        USDCAmount: action.payload.usdcAmount,
        tranHash: action.payload.tranHash,
      }
    case TREASURY_WALLET_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        DummyUsdc: '',
      }
    case TREASURY_AMOUNT_REQUEST:
      return {
        ...state,
        totalDepositedLoading: true,
        totalDepositedAmount: null,
      }
    case TREASURY_AMOUNT_SUCCESS:
      return {
        ...state,
        totalDepositedLoading: false,
        totalDepositedAmount: action.payload,
      }

    default:
      return state
  }
}
