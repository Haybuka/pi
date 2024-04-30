import axios from "axios";
import { useQuery } from "react-query"


export const getAddressLatLng = ({ queryKey }) => {
  const lat = queryKey[1];
  const lng = queryKey[2];
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBaGoyMCRC4tf2_z5Ob7r_XFGcP-jdEtgg`)
}

export const useGetAddressByLatLng = (options = {}) => {

  const { latitude, longitude } = options;
  return useQuery(["latLngAddress", latitude, longitude], getAddressLatLng,
    {
      select: (data) => data?.data?.results[0]?.formatted_address,
      keepPreviousData: true,
      enabled: true,
      ...options
    })
}