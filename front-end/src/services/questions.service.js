import axios from "axios";
import authHeader from "./auth-header";

const API_URL1 = "http://localhost:3000/questions/";
const API_URL2 = "http://localhost:3000/keywords/";

class QuestionsService {
    /*create(title, text, author){
        const author2 = parseInt(author);
        return axios.post(API_URL + "create", {
            title,
            text,
            author2
        });

    }*/
    async create(title, text, author, keywords) {
        let Q_ID = 0;
        const author2 = parseInt(author);
        Q_ID = await axios.post(API_URL1 + "create", {
            title,
            text,
            author2
        });
        console.log("Q_ID")
        console.log(Q_ID)
        const keyword = keywords.split(',');
        let i;
        for (i = 0; i < keyword.length; i++) {
            let elem = keyword[i]
            console.log("Print keyword")
            console.log(elem)
            let q_id = Q_ID.data.x
            /*console.log("Typeof")
            console.log(typeof q_id) //Prints: string
            console.log(q_id) //Prints: 81

             */
            let q_id2 = parseInt(q_id)
            console.log("Typeof")
            console.log(typeof q_id2) //Prints number
            console.log(q_id2) //Print 81
            await axios.post(API_URL2 + "attach", {keyword: elem, Q_ID: q_id})
        }
    }

    view_answers(){
        return JSON.parse(API_URL1 + 'view_answers/:id', { headers: authHeader() });
    }

    viewAllQuestions(){
    return axios.get(API_URL1);
    }

    getCurrentQuestion() {
        return JSON.parse(localStorage.getItem('user'));
        ;
    }

}
export default new QuestionsService();