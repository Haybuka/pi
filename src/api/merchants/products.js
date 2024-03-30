import { useMutation, useQuery, useQueryClient } from "react-query"
import axios from '../index'
//merchant

const createMerchantProductRequest = (data) => {
  return axios.post('v1/product', { data })
}


const createMerchantProductImage = (formData) => {

  return axios.post('v1/product/image', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
}


export const fetchMerchantProductCategories = ({ queryKey }) => {
  const page = queryKey[1] || 0
  return axios.get(`v1/product/get?searchObj={"limit" : 10,"page" : ${page}}`)
}
export const useCreateMerchantProductRequest = (options) => {
  return useMutation(createMerchantProductRequest, { select: () => { console.log("data trasnformed") }, ...options })
}


export const useCreateMerchantProductImageRequest = (options) => {
  const queryClient = useQueryClient()
  return useMutation(createMerchantProductImage, {
    select: (data) => data.data,
    onSuccess: () => {
      queryClient.invalidateQueries("merchantProducts")
    },

    ...options
  })
}

export const useGetMerchantProductCategories = (options = {}) => {
  const { page } = options
  return useQuery(["merchantProducts", page], fetchMerchantProductCategories,
    {
      select: (data) => data?.data?.content?.products,
      keepPreviousData: true,
      enabled: true,
      ...options
    })
}







