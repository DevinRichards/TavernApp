import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation"
import LoginPage from "../components/LoginPage";
import LoginFormModal from "../components/LoginFormModal";
import ServerIndex from "../components/Servers/ServerIndexNavbar";
// import ServerIndex from "../components/Servers/ServerIndex";

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // useEffect(() => {
  //   // Redirect to the login page once the authentication check is complete
  //   if (isLoaded) {
  //     navigate("/login");
  //   }
  // }, [isLoaded, navigate]);

  return (
    <>
      <ModalProvider>
        <ServerIndex/>
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
}
