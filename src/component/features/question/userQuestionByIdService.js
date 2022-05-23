import axios from "axios";
const base_URL = "https://stgphys.appsndevs.com/seasiaforms/public/api/";

//User Posted Question By Id
const getuserQuestionById = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.get(base_URL + `question`, config);
  return response.data;
};

const userQuestionById = {
  getuserQuestionById,
};
export default userQuestionById;
