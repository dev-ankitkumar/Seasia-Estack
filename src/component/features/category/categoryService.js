import axios from "axios";
const base_URL = "https://stgphys.appsndevs.com/seasiaforms/public/api/";

const categoryGet = async () => {
  const response = await axios.get(base_URL + "getcategory");
  return response.data;
};
const authService = {
  categoryGet,
};
export default authService;
