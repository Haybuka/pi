import { useMutation, useQuery } from "react-query"
import axios from './index'

const loginAdminRequest = (data) => {
  return axios.post('v1/admin/auth', { data })
}

const loginMerchantRequest = (data) => {
  return axios.post('v1/merchant/auth', { data })
}

const getSelf = (data) => {
  return axios.get('v1/get-self')
}


export const useAdminLoginRequest = (options) => {
  return useMutation(loginAdminRequest, { select: () => { console.log("data trasnformed") }, ...options })
}

export const useMerchantLoginRequest = (options) => {
  return useMutation(loginMerchantRequest, { select: () => { console.log("data trasnformed") }, ...options })
}


export const useGetSelf = (options = {}) => {
  return useQuery("user", getSelf,
    {
      select: (data) => data?.data.content.profile,
      ...options
    })
}