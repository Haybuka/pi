import { useMutation } from "react-query"
import axios from './index'
const loginRequest = (data) => {
  return axios.post('v1/admin/auth', { data })
}

export const useLoginRequest = (options) => {
  return useMutation(loginRequest, { select: () => { console.log("data trasnformed") }, ...options })
}