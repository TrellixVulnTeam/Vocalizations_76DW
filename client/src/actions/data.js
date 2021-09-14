import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/';

export const singleFileUpload = async (data, options) => {
    try {
        const response = await axios.post(apiUrl + 'singleFile', data, options); // options = CircularProgress
        return response;
    } catch (error) {
        throw error;
    }
}
export const getSingleFiles = async () => {
    try {
        const {data} = await axios.get(apiUrl + 'getSingleFiles');
        return data;
    } catch (error) {
        throw error;
    }
}
