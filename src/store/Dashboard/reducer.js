import {
    GET_Invested_Overview_FAIL,
    GET_Invested_Overview_SUCCESS,
    GET_MARKET_OVERVIEW_FAIL,
    GET_MARKET_OVERVIEW_SUCCESS,
    GET_WALLENT_BALANCE_SUCCESS
} from "./actiontype";

const INIT_STATE = {
    Marketoverview: [],
    error: {},
    WallentBalanceData: [],
    InvestedData: [],
}

const dashboard = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_MARKET_OVERVIEW_SUCCESS:
            return {
                ...state,
                Marketoverview: action.payload,
            }

        case GET_MARKET_OVERVIEW_FAIL:
            return {
                ...state,
                error: action.payload,
            }

        case GET_WALLENT_BALANCE_SUCCESS:
            return {
                ...state,
                WallentBalanceData: action.payload,
            }

        case GET_MARKET_OVERVIEW_FAIL:
            return {
                ...state,
                error: action.payload,
            }

        case GET_Invested_Overview_SUCCESS:
            return {
                ...state,
                InvestedData: action.payload,
            }

        case GET_Invested_Overview_FAIL:
            return {
                ...state,
                error: action.payload,
            }

        default:
            return state
    }
}

export default dashboard
