import { useMutation, useQuery, useQueryClient } from "react-query"
import axios from './index'


//merchant


const createMerchantProductRequest = (data) => {
  return axios.post('v1/product', { data })
}

const updateMerchantProductRequest = (data) => {
  return axios.put('v1/product', { data })
}

export const useCreateMerchantProductRequest = (options) => {
  const queryClient = useQueryClient()
  return useMutation(createMerchantProductRequest, {
    onSuccess: () => {
      options.onSuccess();
      queryClient.invalidateQueries("merchantProducts")
    },
    ...options
  })
}

export const useUpdateMerchantProductRequest = (options) => {
  const queryClient = useQueryClient()
  return useMutation(updateMerchantProductRequest, {
    onSuccess: () => {
      options.onSuccess();
      queryClient.invalidateQueries("merchantProducts")
    },
    ...options
  })
}


//admin
const fetchProductCategories = (data) => {
  return axios.get('v1/product/category/-')
}

const createAdminProductRequest = (data) => {
  return axios.post('v1/product/category', { data })
}

const updateProductRequest = (data) => {
  return axios.put('v1/product/category', { data })
}

const deleteProductRequest = (data) => {
  return axios.delete('v1/product/category', { data })
}

const fetchProductCategory = ({ queryKey }) => {
  const id = queryKey[1]

  return axios.get(`v1/product/category/${id}`)
}


//admin
export const useGetProductCategories = (options = {}) => {
  return useQuery("products-category", fetchProductCategories,
    {
      select: (data) => data?.data.content.categories,
      ...options
    })
}

export const useGetProductCategory = (options = {}) => {
  const { dataTransform, id, ...rest } = options

  return useQuery(["products-category", id], fetchProductCategory,
    {
      select: (data) => data?.data.content.category,
      refetchOnMount: true,
      ...rest
    })
}



export const useCreateCategoryRequest = (options) => {
  return useMutation(createAdminProductRequest, { select: () => { console.log("data trasnformed") }, ...options })
}

export const useUpdateCategoryRequest = (options) => {


  return useMutation(updateProductRequest, { ...options })
}

export const useDeleteProductCategoryRequest = (options) => {
  return useMutation(deleteProductRequest, { select: () => { console.log("data trasnformed") }, ...options })
}

