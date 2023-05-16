export const API_BASED_URL = 'https://lamaison.clickysoft.net/api/v1/';

  export const getApi = endpoint => API_BASED_URL + endpoint;

  export const RegisterUrl = getApi('register');
  export const LoginUrl = getApi('login');
  export const LogoutUrl = getApi('logout');
  export const ForgetPasswordUrl = getApi('forgot-password');
  export const VerifyCodeUrl = getApi('verify-code');
  export const ResetPasswordUrl = getApi('reset-password');
  export const getCategories = getApi('categories');
  export const getCollection = getApi('collection');