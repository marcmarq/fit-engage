import { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

const useUserData = () => {
  const { userData, getUserData } = useContext(AppContext);

  useEffect(() => {
    if (!userData) {
      getUserData();
    }
  }, [getUserData, userData]);

  return userData;
};

export default useUserData;

