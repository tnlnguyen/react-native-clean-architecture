import axios from 'axios';
import { reset } from '~Base/Navigation/Navigation';
import { AuthKey } from '~Core/Utils/Enum';
import { AppUrl } from '~Config';

const refreshing = null;

const setToken = (credentials) => {
  // Cleanup old token
  localStorage.removeItem(AuthKey.ACCESS_TOKEN_KEY);
  localStorage.setItem(AuthKey.ACCESS_TOKEN_KEY, credentials.accessToken);
  localStorage.setItem(AuthKey.REFRESH_TOKEN_KEY, credentials.refreshToken);

  // We can force the expires time for testing purposes
  const expiresIn = parseInt(credentials.expiresIn);
  const refreshExpiresIn = parseInt(credentials.refreshExpiresIn);

  //Calculate the expires time for access token and refresh token
  const currentTime = new Date().getTime();
  const tokenExpiry = new Date(currentTime + expiresIn * 1000).getTime();
  const refreshTokenExpiry = new Date(currentTime + refreshExpiresIn * 1000).getTime();

  localStorage.setItem(AuthKey.ACCESS_TOKEN_EXPIRY_KEY, tokenExpiry.toString());
  localStorage.setItem(AuthKey.REFRESH_TOKEN_EXPIRY_KEY, refreshTokenExpiry.toString());
};

const getNewToken = async () => {
  const { data: credentials } = await axios.post(
    `${AppUrl.API_URL}/authenticate/v1/auth/refresh-token`,
    {
      refreshToken: getRefreshToken(),
    }
  );

  setToken(credentials);
};

const getToken = async () => {
  const currentToken = localStorage.getItem(AuthKey.ACCESS_TOKEN_KEY);
  if (!currentToken) {
    return null;
  }

  const tokenExpiry = localStorage.getItem(AuthKey.ACCESS_TOKEN_EXPIRY_KEY);
  const currentTime = new Date().getTime();

  if (tokenExpiry > currentTime) {
    // Return valid access token
    return currentToken;
  }

  const refreshTokenExpiry = localStorage.getItem(AuthKey.REFRESH_TOKEN_EXPIRY_KEY);
  if (refreshTokenExpiry > currentTime) {
    // Refresh token valid, refreshing token..
    if (!refreshing) {
      refreshing = getNewToken();
    }

    await refreshing;
    refreshing = null;

    return localStorage.getItem(AuthKey.ACCESS_TOKEN_KEY);
  }

  return null;
};

const getRefreshToken = () => {
  return localStorage.getItem(AuthKey.REFRESH_TOKEN_KEY);
};

const logout = ({ name, params }) => {
  localStorage.removeItem(AuthKey.ACCESS_TOKEN_KEY);
  localStorage.removeItem(AuthKey.REFRESH_TOKEN_KEY);
	reset('LoginScreen')
};

export { setToken, getNewToken, getToken, getRefreshToken, logout };
