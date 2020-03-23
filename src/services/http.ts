import Axios, {AxiosInstance} from 'axios';

const BASE_URL: string = 'http://104.238.158.120/api/v1/';

const HelpApi: AxiosInstance = Axios.create({
  baseURL: BASE_URL,
});

export default HelpApi;
