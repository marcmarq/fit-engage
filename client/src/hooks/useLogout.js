import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useLogout = () => {
  const navigate = useNavigate();
  const { setIsLoggedin } = useContext(AppContext);

  const handleLogout = () => {
    setIsLoggedin(false);
    navigate("/login");
  };

  return handleLogout;
};

export default useLogout;

