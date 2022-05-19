import axios from "axios";
const base_URL = "https://stgphys.appsndevs.com/seasiaforms/public/api/";

//question get post by id
const questionGetByID = async (id) => {
  const response = await axios.get(
    base_URL + `question_id?questionId=${id.id}`
  );
  return response.data;
};

//answer By Id
const AnswerPostById = async (userdata, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(base_URL + `answer`, userdata, config);
  return response.data;
};
const questionIdService = {
  questionGetByID,
  AnswerPostById,
};
export default questionIdService;
