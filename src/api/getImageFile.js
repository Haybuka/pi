import { useQuery } from "react-query"
import axios from './index'

const getImageFile = ({ queryKey }) => {
  const alias = queryKey[1]
  return axios.get(`v1/file/get/${alias}`)
}


export const useGetImageFile = (options = {}) => {
  return useQuery(["image", options.fileAlias], getImageFile,
    {
      select: (data) => data?.data.content,
      ...options
    })
}