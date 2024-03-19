import { useQuery } from "react-query"
import axios from './'


export const getStates = ({ queryKey }) => {
  // const page = queryKey[1] || 0
  return axios.get(`v1/state`)
}



export const useGetStates = (options = {}) => {

  return useQuery(["state"], getStates,
    {
      select: (data) => data?.data,
      keepPreviousData: true,
      enabled: true,
      ...options
    })
}