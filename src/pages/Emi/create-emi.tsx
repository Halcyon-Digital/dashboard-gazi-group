import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import CardBody from '../../components/card-body';
import Input from '../../components/forms/text-input';
import Column from '../../components/table/column';
import { IEmi } from '../../interfaces/emi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createEmi, reset } from '../../redux/emi/emiSlice';
import { Button } from '../../components/button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const initialState = {
  bank_name: '',
  three_months: 0,
  six_months: 0,
  nine_months: 0,
  twelve_months: 0,
  eighteen_months: 0,
  twenty_four_months: 0,
  thirty_months: 0,
  thirty_six_months: 0,
};
const CreateEmi = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [emiData, setEmiData] = useState<IEmi>(initialState);
  const { isCreate } = useAppSelector((state) => state.emi);

  const handleEmiData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEmiData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createEmi(emiData));
  };

  useEffect(() => {
    if (isCreate) {
      toast.success('Emi bank added successfully');

      navigate('/emi');
    }
    return () => {
      dispatch(reset());
    };
  }, [isCreate, dispatch, navigate]);

  return (
    <div>
      <CardBody header="Available Emi" to="/emi" text="Back" />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Column className="col-md-12">
            <Input
              htmlFor="Bank Name"
              label="Bank Name *"
              name="bank_name"
              placeholder="Bank Name"
              onChange={handleEmiData}
              required
            />
          </Column>
          <Column className="col-md-6">
            <Input
              htmlFor="three_months"
              label="Three Months Rate"
              name="three_months"
              placeholder="Rate"
              onChange={handleEmiData}
            />
            <Input
              htmlFor="nine_months"
              label="Nine Months Rate"
              name="nine_months"
              placeholder="rate"
              onChange={handleEmiData}
            />
            <Input
              htmlFor="Eighteen_Months"
              label="Eighteen Months Rate"
              name="eighteen_months"
              placeholder="rate"
              onChange={handleEmiData}
            />
            <Input
              htmlFor="thirty_months"
              label="Thirty Months Rate"
              name="thirty_months"
              placeholder="rate"
              onChange={handleEmiData}
            />
          </Column>
          <Column className="col-md-6">
            <Input
              htmlFor="six_months"
              label="Six Months Rate"
              name="six_months"
              placeholder="rate"
              onChange={handleEmiData}
            />
            <Input
              htmlFor="twelve_months"
              label="Twelve Months Rate"
              name="twelve_months"
              placeholder="rate"
              onChange={handleEmiData}
            />
            <Input
              htmlFor="twenty_four_months"
              label="Twenty Four Months Rate"
              name="twenty_four_months"
              placeholder="rate"
              onChange={handleEmiData}
            />
            <Input
              htmlFor="thirty_six_months"
              label="Thirty Six Months Rate"
              name="thirty_six_months"
              placeholder="rate"
              onChange={handleEmiData}
            />
          </Column>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default CreateEmi;
