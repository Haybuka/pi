import { useMutation } from "react-query"
import axios from '../index'

const registerMerchantRequest = (data) => {
  return axios.post('v1/merchant-onboard', { data })
}


const updateMerchantRequest = (data) => {
  return axios.post('v1/update-merchant', { data })
}


export const useMerchantRegisterRequest = (options) => {
  return useMutation(registerMerchantRequest, { select: () => { console.log("data trasnformed") }, ...options })
}


export const useMerchantUpdateRequest = (options) => {
  return useMutation(updateMerchantRequest, { select: () => { console.log("data trasnformed") }, ...options })
}
