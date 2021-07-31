import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL = "http://localhost:3000/answers/";


class AnswersService {
    async create(text, Q_ID) {
        console.log("Create answer service")
        console.log(Q_ID)
        const currentUser = AuthService.getCurrentUser();
        const token = currentUser.access_token;
        return axios.post("http://localhost:3001/answers/create", {
            text: text,
            question: {Q_ID: Q_ID},
            //author2
        },
            { headers: {
                    Authorization: `Bearer ${token}`,
                    //request,
                }})
            .catch(error => {console.log(error.response)})}

    async findAnswers(id){
        console.log("Find answers servive")
        console.log(id)
        return await axios
            .get('http://localhost:3001/view_answers/'+id, { params: { id: id } })
            .then((response) => {
                console.log(response.data);
                return response.data;
            });
    }
}
export default new AnswersService();