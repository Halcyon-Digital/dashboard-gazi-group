import axios from 'axios';
import { API_URL } from '../../constants';
import { IRefund, IRefundResponse } from '../../interfaces/refund';

export interface ICreateResponse {
  message: string;
  data: IRefund[];
}

const getRefund = async (): Promise<IRefundResponse> => {
  const { data } = await axios.get(`${API_URL}/refunds`);
  return data;
};

const updateRefund = async (refundData: Partial<IRefund>) => {
  const { data } = await axios.patch(
    `${API_URL}/refunds/${refundData.id}`,
    refundData
  );
  return data.data;
};

const deleteRefund = async (faqId: number | string) => {
  const { data } = await axios.delete(`${API_URL}/refunds/?ids=[${faqId}]`);
  return data.data;
};

const refundService = {
  getRefund,
  updateRefund,
  deleteRefund,
};

export default refundService;
