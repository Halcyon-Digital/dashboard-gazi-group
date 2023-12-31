import { useState } from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import PageRoutes from "../pages";
import Login from "../pages/login";
import { useAppSelector } from "../redux/hooks";
import "./index.scss";
function BaseTemplate() {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useAppSelector((state) => state.auth);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  return (
    <div className="container-fluid">
      {user && user?.user?.role_id === 1 ? (
        <div className="row">
          <div className={isOpen ? "col-md-2" : "sidebar-none"}>
            <SideBar handleClose={handleClose} />
          </div>

          <div className={isOpen ? "col-md-10" : "col-md-12"}>
            <Header isOpen={isOpen} handleOpen={handleOpen} />
            <main className="main-area">
              <PageRoutes />
            </main>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
export default BaseTemplate;
