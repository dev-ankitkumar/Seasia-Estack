import axios from "axios";
const base_URL = "https://stgphys.appsndevs.com/seasiaforms/public/api/";

const categoryGet = async () => {
  const response = await axios.get(base_URL + "getcategory");
  return response.data;
};
const categoryService = {
  categoryGet,
};
export default categoryService;
