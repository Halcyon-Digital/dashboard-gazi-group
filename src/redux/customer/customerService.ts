import axios from '../../lib';
import { ICustomerResponse } from '../../interfaces/customer';

// get all products
const getAllCustomer = async (filter: {
  [key: string]: string | number;
}): Promise<ICustomerResponse> => {
  let url = `/users`;
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

// Update Order
const updateCustomer = async (
  id: number,
  orderData: { [key: string]: string }
) => {
  const { data } = await axios.patch(`/users/${id}`, orderData);
  return data;
};

const deleteCustomer = async (ids: [number]) => {
  const { data } = await axios.delete(`/users/?ids=[${ids}]`);
  return data;
};

const customerService = {
  getAllCustomer,
  deleteCustomer,
  updateCustomer,
};

export default customerService;
