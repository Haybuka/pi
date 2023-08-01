import { useMutation } from "react-query"
import axios from './index'
const loginAdminRequest = (data) => {
  return axios.post('v1/admin/auth', { data })
}

const loginMerchantRequest = (data) => {
  return axios.post('v1/merchant/auth', { data })
}


export const useAdminLoginRequest = (options) => {
  return useMutation(loginAdminRequest, { select: () => { console.log("data trasnformed") }, ...options })
}

export const useMerchantLoginRequest = (options) => {
  return useMutation(loginMerchantRequest, { select: () => { console.log("data trasnformed") }, ...options })
}