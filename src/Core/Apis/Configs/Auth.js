import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reset } from '~Base/Navigation/Navigation';
import { AuthKey } from '~Core/Utils/Enum';
import { AppUrl } from '~Config';


const refreshing = null;

const setToken = async (credentials) => {
  // Cleanup old token
  await AsyncStorage.removeItem(AuthKey.ACCESS_TOKEN_KEY);
  await AsyncStorage.setItem(AuthKey.ACCESS_TOKEN_KEY, credentials.accessToken);
  await AsyncStorage.setItem(AuthKey.REFRESH_TOKEN_KEY, credentials.refreshToken);

  // We can force the expires time for testing purposes
  const expiresIn = parseInt(credentials.expiresIn);
  const refreshExpiresIn = parseInt(credentials.refreshExpiresIn);

  //Calculate the expires time for access token and refresh token
  const currentTime = new Date().getTime();
  const tokenExpiry = new Date(currentTime + expiresIn * 1000).getTime();
  const refreshTokenExpiry = new Date(currentTime + refreshExpiresIn * 1000).getTime();

  await AsyncStorage.setItem(AuthKey.ACCESS_TOKEN_EXPIRY_KEY, tokenExpiry.toString());
  await AsyncStorage.setItem(AuthKey.REFRESH_TOKEN_EXPIRY_KEY, refreshTokenExpiry.toString());
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
  const currentToken = await AsyncStorage.getItem(AuthKey.ACCESS_TOKEN_KEY);
  if (!currentToken) {
    return null;
  }

  const tokenExpiry = await AsyncStorage.getItem(AuthKey.ACCESS_TOKEN_EXPIRY_KEY);
  const currentTime = new Date().getTime();

  if (tokenExpiry > currentTime) {
    // Return valid access token
    return currentToken;
  }

  const refreshTokenExpiry = await AsyncStorage.getItem(AuthKey.REFRESH_TOKEN_EXPIRY_KEY);
  if (refreshTokenExpiry > currentTime) {
    // Refresh token valid, refreshing token..
    if (!refreshing) {
      refreshing = getNewToken();
    }

    await refreshing;
    refreshing = null;

    return await AsyncStorage.getItem(AuthKey.ACCESS_TOKEN_KEY);
  }

  return null;
};

const getRefreshToken = async () => {
  return await AsyncStorage.getItem(AuthKey.REFRESH_TOKEN_KEY);
};

const logout = async ({ name, params }) => {
  await AsyncStorage.removeItem(AuthKey.ACCESS_TOKEN_KEY);
  await AsyncStorage.removeItem(AuthKey.REFRESH_TOKEN_KEY);
	reset('LoginScreen')
};

export { setToken, getNewToken, getToken, getRefreshToken, logout };
