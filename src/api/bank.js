
import { useQuery } from "react-query"
import axios from 'axios'

export const _getBankProvider = async () => {
  const response = await axios.get('https://rauserv2.tapdev.site:1443/v1/get-va-providers');
  return response.data;
};

export const useGetBank = (options) => {
  return useQuery({
    queryKey: ['bank'],
    queryFn: _getBankProvider,
    ...options
  });
};