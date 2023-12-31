import { ChangeEvent, useEffect, useState } from "react";
import DeleteButton from "../../components/button/delete";
import EditButton from "../../components/button/edit";
import ViewButton from "../../components/button/view";
import CardBody from "../../components/card-body";
import CustomIconArea from "../../components/custom-icon-area";
import Display from "../../components/display";
import Filter from "../../components/filter";
import ToggleButton from "../../components/forms/checkbox";
import Pagination from "../../components/pagination";
import Column from "../../components/table/column";
import Row from "../../components/table/row";
import { API_ROOT } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getProducts, reset } from "../../redux/products/product-slice";

const StockOutProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, totalCount } = useAppSelector(
    (state) => state.product
  );
  const [displayItem, setDisplayItem] = useState(10);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const totalPage = Math.ceil(totalCount / displayItem);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPageNumber(selectedItem.selected + 1);
  };

  const handleDisplayItem = (e: ChangeEvent<HTMLSelectElement>) => {
    setDisplayItem(Number(e.target.value));
  };

  useEffect(() => {
    dispatch(
      getProducts({ page: pageNumber, limit: displayItem, quantity: 0 })
    );
    return () => {
      dispatch(reset());
    };
  }, [dispatch, pageNumber, displayItem]);

  return (
    <div>
      <CardBody header="Stock Out Products" to="/categories/create" />
      <Display>
        <Filter handleDisplayItem={handleDisplayItem} />
        <Row className="row text-bold">
          <Column className="col-md-1">#</Column>
          <Column className="col-md-1">Images</Column>
          <Column className="col-md-3">Name</Column>
          <Column className="col-md-1">Stock</Column>
          <Column className="col-md-1">Regular Price</Column>
          <Column className="col-md-1">Discount Price</Column>
          <Column className="col-md-1">Status</Column>
          <Column className="col-md-1">Show Home Page</Column>
          <Column className="col-md-2">Action</Column>
        </Row>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          products.map((product, index) => (
            <Row key={index} className="row">
              <Column className="col-md-1">
                {product.id}
                {/* <input
                  checked={selectedProducts.includes(product.id as number)}
                  onClick={() => handleSelectedProducts(product.id as number)}
                  type="checkbox"
                  name=""
                  id=""
                /> */}
              </Column>
              <Column className="col-md-1">
                <img
                  src={`${API_ROOT}/images/product/${product.image}`}
                  alt="brand"
                />
              </Column>
              <Column className="col-md-3">{product.title}</Column>
              <Column className="col-md-1">{product.quantity}</Column>
              <Column className="col-md-1">৳ {product.regular_price}</Column>
              <Column className="col-md-1">৳ {product.discount_price}</Column>
              <Column className="col-md-1">
                <ToggleButton isChecked={product.is_visible == 1} />
              </Column>
              <Column className="col-md-1">
                <ToggleButton isChecked={product.is_homepage} />
              </Column>
              <Column className="col-md-2">
                <CustomIconArea>
                  <ViewButton href="/products" />
                  <EditButton editUrl={`/products/edit/1`} />
                  <DeleteButton onClick={() => console.log("first")} />
                </CustomIconArea>
              </Column>
            </Row>
          ))
        )}
        <Pagination
          pageCount={pageNumber}
          handlePageClick={handlePageChange}
          totalPage={totalPage}
        />
      </Display>
    </div>
  );
};

export default StockOutProducts;
