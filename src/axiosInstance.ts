// utils/axiosInstance.ts ou similar
import axios from "axios";
import { store } from "./redux/store"; // Importa store
import { logoutUser } from "./redux/slices/authSlices";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg = error.response?.data?.message;

   if (error.response?.status === 401 && msg === "jwt expired") {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("guestId");

  const event = new CustomEvent("sessionExpired");
  window.dispatchEvent(event);
}
    return Promise.reject(error);
  }
);

export default axiosInstance;
