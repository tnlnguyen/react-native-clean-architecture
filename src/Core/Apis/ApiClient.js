import axios from 'axios';
import { setToken, getNewToken, getToken, getRefreshToken, logout } from '~Core/Apis/Configs/Auth';
import { AppUrl } from '~Config';
import { HeaderKey } from '~Core/Utils/Enum';
import { SCREEN } from '~Core/Utils/Screens';
import { API_URL } from '@env';

const requestInterceptor = async (config) => {
  const token = await getToken();
  if (!!token) {
    config.headers[HeaderKey.AUTH_HEADER_KEY] = token;
  }
  console.log('adsf', API_URL)
  console.log('API::REQUEST', config);
  return config;
};

const responseInterceptor = async (response) => {
  const { status } = response;
  if (status === 401) {
    console.log('API::ERROR', error?.response);
    logout({ name: SCREEN.LOGIN });
  }

  console.log('API::DONE', { url: response?.request?.responseURL });
  return response;
};

export const buildClient = (config, enableInterceptor = true) => {
  const instance = axios.create(config);
  console.log(instance);
  if (enableInterceptor) {
    instance.interceptors.request.use(requestInterceptor);
    instance.interceptors.response.use(responseInterceptor);
  }

  return instance;
};

export const AxiosInstance = buildClient({ baseURL: AppUrl.API_URL });
