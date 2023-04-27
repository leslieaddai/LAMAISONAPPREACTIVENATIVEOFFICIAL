export const API_BASED_URL = 'https://lamaison.clickysoft.net/api/v1/';

  export const getApi = endpoint => API_BASED_URL + endpoint;

  export const RegisterUrl = getApi('register');
  export const LoginUrl = getApi('login');