import axios from "axios";

const API_URL1 = "http://localhost:3000/questions/date/count/";

class HomepageService {
    async countPerDate(date){
        console.log("Importan!!!")
        const ret = await axios
            .get("http://localhost:3003/questions/date/count/" + date,
                {params: {dateID: date}})
            .then((response) => {
                console.log(response.data);
                return response.data;
            });
        console.log("Output")
        console.log(parseInt(ret["TotalQuestionsPerDate"]))
        return parseInt(ret["TotalQuestionsPerDate"])
    }
    async today() {
        console.log("TODAYYY")
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        console.log("HEEEREEEE!")
        const ret = await axios
            .get("http://localhost:3003/questions/date/count/" + today,
                {params: {dateID: today}})
            .then((response) => {
                console.log(response.data);
                return response.data;
            });
        console.log("Output")
        console.log(ret)
        return parseInt(ret["TotalQuestionsPerDate"])
    }
    async yesterday() {
        var today = new Date();
        var yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        today.toDateString()
        yesterday.toDateString()

        console.log("print today")
        console.log(today)
        console.log("print yesterday")
        console.log(yesterday)

        var dd = String(yesterday.getDate()).padStart(2, '0');
        var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = yesterday.getFullYear();

        yesterday = yyyy + '-' + mm + '-' + dd;

        const ret = await axios
            .get("http://localhost:3003/questions/date/count/" + yesterday,
                {params: {dateID: yesterday}})
            .then((response) => {
                console.log(response.data);
                return response.data;
            });
        console.log("Output")
        console.log(ret)
        return parseInt(ret["TotalQuestionsPerDate"])
    }
    async lastweek(){
        const ret = await axios.get("http://localhost:3003/lastweek/")
            .then((response) => {
                console.log(response.data);
                return response.data;
            });
        return parseInt(ret["TotalQuestionsLastWeek"])
    }
}
export default new HomepageService();