import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL1 = "http://localhost:3001/questions/create";
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
        console.log("Create question")
        const currentUser = AuthService.getCurrentUser();
        const token = currentUser.access_token;
        let Q_ID = 0;
        const author2 = parseFloat(author);
        Q_ID = await axios.post("http://localhost:3001/questions/create", {
            title,
            text,
            //author2
        }, { headers: {
                Authorization: `Bearer ${token}`,
                //request,
            }});
        const keyword = keywords.split(',');
        let i;
        for (i = 0; i < keyword.length; i++) {
            let elem = keyword[i]
            console.log("Print keyword")
            console.log(elem)
            let q_id = Q_ID.data.Q_ID
            /*console.log("Typeof")
            console.log(typeof q_id) //Prints: string
            console.log(q_id) //Prints: 81
             */
            let q_id2 = parseInt(q_id)
            await axios.post("http://localhost:3001/keywords/attach", {keyword: elem,
                question: {Q_ID: q_id2}})
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
    async keywordSearch(key){
        console.log("Keyword Search!!!")
        console.log(key)
        return await axios
            .get('http://localhost:3001/keywords/search/'+key, { params: { id: key } })
            .then((response) => {
                console.log(response.data);
                return response.data;
            });
    }

}
export default new QuestionsService();