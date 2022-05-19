import axios from "axios";
const base_URL = "https://stgphys.appsndevs.com/seasiaforms/public/api/";

//register
const register = async (userData) => {
  const response = await axios.post(base_URL + "register", userData);
  console.log(response, "response");
  if (response.data.access_token) {
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  }
};

//login
const login = async (userData) => {
  const response = await axios.post(base_URL + "login", userData);
  if (response.data.access_token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//logout
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};
export default authService;
