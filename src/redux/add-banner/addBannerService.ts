import {
  IAdBanner,
  IAddBannerResponse,
  ISliderResponse,
} from '../../interfaces/addBanner';
import axios from '../../lib';

export interface ICreateResponse {
  message: string;
  data: IAdBanner[];
}

const createAddBanner = async (
  bannerData: FormData
): Promise<Partial<ICreateResponse>> => {
  const { data } = await axios.post(`/banners`, bannerData);
  return data;
};

const getAddBanner = async (): Promise<IAddBannerResponse> => {
  const url = `/banners?not_slider=true`;

  const { data } = await axios.get(url);

  return data;
};
const getSlider = async (): Promise<ISliderResponse> => {
  const url = `/banners/slider`;

  const { data } = await axios.get(url);

  return data;
};

const updateAddBanner = async (bannerData: Partial<IAdBanner> | FormData, id: number | string) => {
  const { data } = await axios.patch(`/banners/${id}`, bannerData);
  return data;
};

const deleteBanner = async (faqId: number | string) => {
  const { data } = await axios.delete(`/banners/?ids=[${faqId}]`);
  return data.data;
};

const addBannerService = {
  createAddBanner,
  getAddBanner,
  updateAddBanner,
  deleteBanner,
  getSlider,
};

export default addBannerService;
