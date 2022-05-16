import axios from "axios";
const base_URL = "https://stgphys.appsndevs.com/seasiaforms/public/api/";

//question get
const questionGet = async () => {
  const response = await axios.get(base_URL + "showpost");
  //   console.log(response);
  //   if (response.data) {
  // localStorage.setItem("user", JSON.stringify(response.data));
  //   }
  return response.data;
};
//question post
const questionPost = async (userData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(base_URL + "post", userData, config);
  return response.data;
};

const questionIdService = {
  questionGet,
  questionPost,
};
export default questionIdService;
