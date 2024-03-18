import { useMutation } from "react-query"
import axios from '../index'

const registerMerchantRequest = (data) => {
  return axios.post('v1/merchant-onboard', { data })
}



export const useMerchantRegisterRequest = (options) => {
  return useMutation(registerMerchantRequest, { select: () => { console.log("data trasnformed") }, ...options })
}

