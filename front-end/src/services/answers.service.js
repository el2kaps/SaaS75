import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/answers/";


class AnswersService {
    async create(text, Q_ID, author) {
        const author2 = parseInt(author);
        return axios.post(API_URL + "create", {
            text,
            Q_ID,
            author
        });
    }

}
export default new AnswersService();