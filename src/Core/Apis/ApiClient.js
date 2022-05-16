import axios from 'axios';
import { setToken, getNewToken, getToken, getRefreshToken, logout } from '~Core/Apis/Configs/Auth';
import { AppUrl } from '~Config';
import { HeaderKey } from '~Core/Utils/Enum';
import { SCREEN } from '~Core/Utils/Screens';

const requestInterceptor = async (config) => {
  const token = await getToken();
  if (!!token) {
    config.headers[HeaderKey.AUTH_HEADER_KEY] = token;
  }

  return config;
};

const responseInterceptor = async (response) => {
  const { status } = response;
  if (status === 401) {
    logout({ name: SCREEN.LOGIN });
  }

  return response;
};

export const buildClient = (config, enableInterceptor = true) => {
  const instance = axios.create(config);
  if (enableInterceptor) {
    instance.use(requestInterceptor);
    instance.use(responseInterceptor);
  }

  return instance;
};

export const AxiosInstance = buildClient({ baseURL: AppUrl.API_URL });
