import axios from "axios";
import { API_ADDRESS } from "../helpers/constant";

const apiAddress = API_ADDRESS;

const EditorService = {
    RunCode: (model:any) => {
        return axios.post(`${apiAddress}/compiler/${model.language}`, model, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export default EditorService;