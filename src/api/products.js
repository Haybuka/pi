import { useMutation, useQuery } from "react-query"
import axios from './index'
const fetchProductCategories = (data) => {
  return axios.get('v1/product/category/-')
}

const createProductRequest = (data) => {
  return axios.post('v1/product/category', { data })
}

const fetchProductCategory = ({ queryKey }) => {
  const id = queryKey[1]

  return axios.get(`v1/product/category/${id}`)
}

export const useGetProductCategories = (options = {}) => {
  return useQuery("products-category", fetchProductCategories,
    {
      select: (data) => data?.data.content.categories,
      refetchOnMount: true,
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
  return useMutation(createProductRequest, { select: () => { console.log("data trasnformed") }, ...options })
}
