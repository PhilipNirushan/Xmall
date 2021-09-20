import axios from 'axios'
import {
  SHOP_LIST_REQUEST,
  SHOP_LIST_SUCCESS,
  SHOP_LIST_FAIL,
  SHOP_DETAILS_FAIL,
  SHOP_DETAILS_SUCCESS,
  SHOP_DETAILS_REQUEST,
  SHOP_DELETE_REQUEST,
  SHOP_DELETE_SUCCESS,
  SHOP_DELETE_FAIL,
  SHOP_CREATE_REQUEST,
  SHOP_CREATE_SUCCESS,
  SHOP_CREATE_FAIL,
  SHOP_UPDATE_REQUEST,
  SHOP_UPDATE_SUCCESS,
  SHOP_UPDATE_FAIL,
  SHOP_CREATE_REVIEW_REQUEST,
  SHOP_CREATE_REVIEW_SUCCESS,
  SHOP_CREATE_REVIEW_FAIL,
  SHOP_TOP_REQUEST,
  SHOP_TOP_SUCCESS,
  SHOP_TOP_FAIL,
  // SHOP_USERID_REQUEST,
  // SHOP_USERID_SUCCESS,
  // SHOP_USERID_FAIL,
} from '../constants/shopConstants'

export const listShops =
  (keyword = '') =>
  async dispatch => {
    try {
      dispatch({ type: SHOP_LIST_REQUEST })

      const { data } = await axios.get(`/api/shops?keyword=${keyword}`)

      dispatch({
        type: SHOP_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: SHOP_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listShopDetails = id => async dispatch => {
  try {
    dispatch({ type: SHOP_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/shops/${id}`)

    dispatch({
      type: SHOP_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SHOP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// export const listShopDetailsByUserId = () => async dispatch => {
//   try {
//     dispatch({ type: SHOP_USERID_REQUEST })

//     const { data } = await axios.get(`/api/shopsuserid`)

//     dispatch({
//       type: SHOP_USERID_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     dispatch({
//       type: SHOP_USERID_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     })
//   }
// }

export const deleteShop = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHOP_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/shops/${id}`, config)

    dispatch({ type: SHOP_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: SHOP_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createShop = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHOP_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/shops`, {}, config)

    dispatch({ type: SHOP_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SHOP_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateShop = shop => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHOP_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/shops/${shop._id}`, shop, config)

    dispatch({ type: SHOP_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SHOP_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createShopReview =
  (shopId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SHOP_CREATE_REVIEW_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.post(`/api/shops/${shopId}/reviews`, review, config)

      dispatch({ type: SHOP_CREATE_REVIEW_SUCCESS })
    } catch (error) {
      dispatch({
        type: SHOP_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listTopShops = () => async dispatch => {
  try {
    dispatch({ type: SHOP_TOP_REQUEST })

    const { data } = await axios.get(`/api/shops/top`)

    dispatch({
      type: SHOP_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SHOP_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
