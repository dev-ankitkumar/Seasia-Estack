import axios from "axios";
const base_URL = "https://stgphys.appsndevs.com/seasiaforms/public/api/";

//question post vote by id
const questionPostByVoteId = async (userData, token) => {
  console.log("vote pack1");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log(userData);
  const response = await axios.post(base_URL + `vote`, userData, config);
  console.log(response);
  return response.data;
};
const questionByVote = {
  questionPostByVoteId,
};
export default questionByVote;
