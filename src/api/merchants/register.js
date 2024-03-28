import { useMutation, useQueryClient } from "react-query"
import axios from '../index'

const registerMerchantRequest = (data) => {
  return axios.post('v1/merchant-onboard', { data })
}

const uploadMerchantLogoRequest = (formData) => {

  return axios.post('v1/upload-merchant-logo', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}


const updateMerchantRequest = (data) => {
  return axios.put('v1/update-merchant', { data })
}


export const useMerchantRegisterRequest = (options) => {

  return useMutation(registerMerchantRequest, { select: () => { console.log("data trasnformed") }, ...options })
}


export const useMerchantUpdateRequest = (options) => {
  const queryClient = useQueryClient()
  return useMutation(updateMerchantRequest, {
    select: () => { console.log("data trasnformed") },
    onSuccess: () => {
      queryClient.invalidateQueries("user")
    }, ...options
  })
}

export const useUploadMerchantLogoRequest = (options) => {
  const queryClient = useQueryClient()
  return useMutation(uploadMerchantLogoRequest, {
    select: (data) => data.data,
    onSuccess: () => {
      queryClient.invalidateQueries("user")
    },

    ...options
  })
}
