import { FormEvent, useEffect, useState } from 'react';
import Display from '../../components/display';
import Input from '../../components/forms/text-input';
import TextArea from '../../components/forms/textarea';
import DescriptionInput from '../../components/description';
import Column from '../../components/table/column';
import { Button } from '../../components/button';
import axios from '../../lib';
import { API_URL } from '../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import CardBody from '../../components/card-body';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { reset, updatePages } from '../../redux/pages/pageSlice';
import { toast } from 'react-toastify';

const initialState = {
  title: '',
  slug: '',
  meta_title: '',
  meta_description: '',
};

const UpdatePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isUpdate } = useAppSelector((state) => state.pages);
  const [pageData, setPageData] = useState(initialState);
  const [content, setContent] = useState('');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updatePages({ ...pageData, content, id: Number(slug) }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/pages/${slug}`);
        const data = response.data.data;

        // Set state values based on the fetched data
        setPageData({
          title: data.title || '',
          slug: data.slug || '',
          meta_title: data.meta_title || '',
          meta_description: data.meta_description || '',
        });
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    if (isUpdate) {
      toast.success('Page updated successfully');
      setPageData(initialState);
      setContent('');
      navigate('/setup/pages');
    }
    return () => {
      dispatch(reset());
    };
  }, [isUpdate, navigate, dispatch]);

  return (
    <div>
      <CardBody header="Update Page" to="/setup/pages" text="Back" />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Column className="col-md-8">
            <Display>
              <Input
                htmlFor="title"
                label="Title *"
                placeholder="Enter Title"
                name="title"
                value={pageData.title}
                onChange={handleChange}
                required
              />
              <Input
                htmlFor="slug"
                label="Slug *"
                name="slug"
                value={pageData.slug}
                onChange={handleChange}
                placeholder="Enter Slug"
                required
              />
              <div className="des-none">
                <TextArea label="Description" value={content} required />
              </div>
              <DescriptionInput value={content} setValue={setContent} />
            </Display>
          </Column>
          <Column className="col-md-4">
            <Display>
              <Input
                htmlFor="Metatitle"
                name="meta_title"
                value={pageData.meta_title}
                onChange={handleChange}
                placeholder="Enter Title"
                required
              />
              <TextArea
                label="Meta Description"
                name="meta_description"
                value={pageData.meta_description}
                onChange={handleChange}
                placeholder="Meta description"
                required
              />
              <Button type="submit">Update</Button>
            </Display>
          </Column>
        </div>
      </form>
    </div>
  );
};

export default UpdatePage;
