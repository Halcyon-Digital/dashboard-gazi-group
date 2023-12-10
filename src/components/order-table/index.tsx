import Row from '../table/row';
import Column from '../table/column';
import { IOrder } from '../../interfaces/order';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deleteOrder, reset, updateOrder } from '../../redux/order/orderSlice';
import { ChangeEvent, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import './index.scss';
import SingleItem from './singleItem';

interface IProps {
  orders: IOrder[];
  handleAllSelectedOrders?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectedOrder?: (orderId: number) => void;
  selectedOrders: number[];
}

const OrderTable = ({
  orders,
  handleAllSelectedOrders,
  handleSelectedOrder,
  selectedOrders,
}: IProps) => {
  const dispatch = useAppDispatch();
  const { isUpdate, message } = useAppSelector((state) => state.order);
  const componentRef = useRef<HTMLDivElement>(null);
  // const [invoiceVisible, setInvoiceVisible] = useState(false);
  const handleOrderDelete = (id: number) => {
    dispatch(deleteOrder([id]));
  };

  const handleStatusChange = (
    orderId: number,
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(
      updateOrder({ id: orderId, orderData: { order_status: e.target.value } })
    );
  };

  const handlePaymentChange = (
    orderId: number,
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(
      updateOrder({
        id: orderId,
        orderData: { delivery_method: e.target.value },
      })
    );
  };

  useEffect(() => {
    if (isUpdate) {
      toast.success(`${message}`);
    }
    return () => {
      dispatch(reset());
    };
  }, [isUpdate, dispatch]);

  return (
    <div className="order-table">
      <>
        <Row className="row">
          <Column className="col-md-1">
            <form>
              <input
                type="checkbox"
                name="select-all"
                id="select-all"
                onChange={(e) =>
                  handleAllSelectedOrders
                    ? handleAllSelectedOrders(e)
                    : console.log('first')
                }
              />
            </form>
          </Column>
          <Column className="col-md-1">Order Num.</Column>
          <Column className="col-md-1">Invoice NO</Column>
          <Column className="col-md-1">Total Amount</Column>
          <Column className="col-md-1">Customer</Column>
          <Column className="col-md-2">Contact No</Column>
          <Column className="col-md-1">Num. of Products</Column>
          <Column className="col-md-1">Payment Status</Column>
          <Column className="col-md-1">Delivery Status</Column>
          <Column className="col-md-1">Order From</Column>
          <Column className="col-md-1">Options</Column>
        </Row>
      </>
      <>
        {orders.map((order, index) => (
          <SingleItem
            key={index}
            order={order}
            handleOrderDelete={handleOrderDelete}
            handlePaymentChange={handlePaymentChange}
            handleStatusChange={handleStatusChange}
            handleSelectedOrder={handleSelectedOrder}
            selectedOrders={selectedOrders}
          />
        ))}
      </>
    </div>
  );
};

export default OrderTable;
