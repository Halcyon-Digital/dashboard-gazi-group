import { ILcation, ILocationResponse } from './../../interfaces/location';
import axios from '../../lib';

// get all Emis
const getLocations = async (filter: {
  [key: string]: string | number;
}): Promise<ILocationResponse> => {
  let url = `/shippings`;
  if (filter && Object.keys(filter).length > 0) {
    const queryString = Object.entries(filter)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');

    // Add query string to the URL
    url += `?${queryString}`;
  }
  const { data } = await axios.get(url);

  return data;
};

const createLocation = async (productData: ILcation) => {
  const { data } = await axios.post(`/shippings`, productData);
  return data;
};

const updateLocation = async (id: number | string, categoryData: ILcation) => {
  const { data } = await axios.patch(`/shippings/${id}`, categoryData);
  return data;
};

const deleteLocation = async (locationId: number) => {
  const { data } = await axios.delete(`/shippings/?ids=[${locationId}]`);
  return data;
};

const locationService = {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
};

export default locationService;
