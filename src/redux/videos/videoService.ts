import axios from 'axios';
import { API_URL } from '../../constants';
import { IVideo, IVideoResponse } from '../../interfaces/video';

export interface ICreateResponse {
  message: string;
  data: IVideo[];
}

const createNewVideo = async (
  videoData: IVideo
): Promise<Partial<ICreateResponse>> => {
  const { data } = await axios.post(`${API_URL}/videos`, videoData);
  return data;
};

const getVideos = async ({
  page,
  limit,
  token,
}: {
  page: number;
  limit: number;
  token: string;
}): Promise<IVideoResponse> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(
    `${API_URL}/videos?page=${page}&limit=${limit}`,
    config
  );
  return data;
};

const updateVideo = async (videoData: Partial<IVideo>) => {
  const { data } = await axios.patch(
    `${API_URL}/videos/${videoData.id}`,
    videoData
  );
  return data.data;
};

const deleteVideo = async (videoId: number | string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.delete(
    `${API_URL}/videos/?ids=[${videoId}]`,
    config
  );
  return data.data;
};

const videoService = {
  createNewVideo,
  getVideos,
  updateVideo,
  deleteVideo,
};

export default videoService;
