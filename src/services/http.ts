import Axios, {AxiosInstance} from 'axios';

const BASE_URL: string = 'http://localhost/api/v1/';

const HelpApi: AxiosInstance = Axios.create({
  baseURL: BASE_URL,
});

export default HelpApi;
