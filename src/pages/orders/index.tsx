import Pagination from '../../components/pagination';
import OrderTable from '../../components/order-table';
import Display from '../../components/display';

const AllOrders = () => {
  return (
    <div>
      <Display>
        <OrderTable />
        <Pagination />
      </Display>
    </div>
  );
};

export default AllOrders;
