
import { useMutation, useQueryClient } from "react-query"
import axios from '../index'

const createCategoryImage = (formData) => {

  return axios.post('v1/product/category-image', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
}

export const useCreateCategoryImageRequest = (options) => {
  const queryClient = useQueryClient()
  return useMutation(createCategoryImage, {
    select: (data) => data.data,
    onSuccess: () => {
      queryClient.invalidateQueries("products-category")
    },

    ...options
  })
}