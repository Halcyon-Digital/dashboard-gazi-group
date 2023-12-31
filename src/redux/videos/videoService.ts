import axios from '../../lib';
import { IVideo, IVideoResponse } from '../../interfaces/video';

export interface ICreateResponse {
  message: string;
  data: IVideo[];
}

const createNewVideo = async (
  videoData: IVideo
): Promise<Partial<ICreateResponse>> => {
  const { data } = await axios.post(`/videos`, videoData);
  return data;
};

const getVideos = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<IVideoResponse> => {
  const { data } = await axios.get(`/videos?page=${page}&limit=${limit}`);
  return data;
};

const updateVideo = async (videoData: Partial<IVideo>) => {
  const { data } = await axios.patch(`/videos/${videoData.id}`, videoData);
  return data.data;
};

const deleteVideo = async (videoId: number | string) => {
  /*  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }; */
  const { data } = await axios.delete(`/videos/?ids=[${videoId}]`);
  return data.data;
};

const videoService = {
  createNewVideo,
  getVideos,
  updateVideo,
  deleteVideo,
};

export default videoService;
