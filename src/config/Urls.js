export const API_BASED_URL = 'https://lamaison.clickysoft.net/api/v1/';

  export const getApi = endpoint => API_BASED_URL + endpoint;

  export const RegisterUrl = getApi('register');
  export const LoginUrl = getApi('login');
  export const LogoutUrl = getApi('logout');
  export const ForgetPasswordUrl = getApi('forgot-password');
  export const VerifyCodeUrl = getApi('verify-code');
  export const ResetPasswordUrl = getApi('reset-password');
  export const PiecesUrl = getApi('pieces');
  export const ColorsUrl = getApi('colors');
  export const StylesUrl = getApi('styles');
  export const SizesUrl = getApi('sizes');
  export const ProductUploadUrl = getApi('products');
  export const GalleriesUrl = getApi('gallery/list');
  export const CustomerAdvisesUrl = getApi('customer-advises');
  export const WishListsUrl = getApi('wishlists/list');
  export const AddWishListUrl = getApi('wishlists');
  export const CreateGalleryUrl = getApi('galleries');
  export const AddToBasketUrl = getApi('baskets');
  export const FTSUrl = getApi('fts');