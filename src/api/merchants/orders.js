import { useQuery } from "react-query"
import axios from '../index'




export const getOrders = ({ queryKey }) => {
  // const page = queryKey[1] || 0
  return axios.get(`v1/get-order`)
}



export const useGetOrders = (options = {}) => {
  // const { page } = options
  return useQuery(["orders"], getOrders,
    {
      select: (data) => data?.data,
      keepPreviousData: true,
      enabled: true,
      ...options
    })
}







