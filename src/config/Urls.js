export const API_BASED_URL = 'https://lamaison.clickysoft.net/api/v1/';

  export const getApi = endpoint => API_BASED_URL + endpoint;

  export const RegisterUrl = getApi('register');
  export const LoginUrl = getApi('login');
  export const LogoutUrl = getApi('logout');
  export const ForgetPasswordUrl = getApi('forgot-password');
  export const VerifyCodeUrl = getApi('verify-code');
  export const ResetPasswordUrl = getApi('reset-password');
  export const getCategories = getApi('categories');
  export const getCollection = getApi('collection/list');
  export const createCollection = getApi('collection');
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
  export const GetBrandProductsById = getApi('product/brand');
  export const FollowUrl = getApi('follow');
  export const UnfollowUrl = getApi('unfollow');
  export const GetBrandFollowingList = getApi('following/brands/list');
  export const GetBrandFollowerList = getApi('follower/brands/list');
  export const GetEditorFollowingList = getApi('following/editors/list');
  export const GetEditorFollowerList = getApi('follower/editors/list');
  export const UpdateProfile = getApi('change/picture');
  export const GetShippingAddress = getApi('get/address');
  export const ChangeShippingAddress = getApi('change/address');
  export const GetProductInfoById = getApi('products/');
  export const ProductLike = getApi('product/type/like');
  export const ProductDislike = getApi('product/type/dislike');
  export const ProductShare = getApi('products/share');
  export const GetAppNotice = getApi('app-notice');
  export const RegisterGuest = getApi('register/guest');
  export const ProductImageUpdate = getApi('product/image/update');
  export const GetVirtualWardrobe = getApi('wardrobe/');
  export const GetRegions = getApi('shippings');
  export const GetCountries = getApi('countries/');
  export const GetRegionsAll = getApi('all/shippings');
  export const AddShipping = getApi('shipping/price');
  export const SaveShippingInfo = getApi('shipping/information');
  export const GetBrandShippingInfo = getApi('shipping/brand');
  export const GetNotifications = getApi('notifications');
  export const GetBrandInfo = getApi('profile/brand/');
  export const GetEditorInfo = getApi('profile/editor/');
  export const GetBrandAbout = getApi('get/about');
  export const SaveBrandAbout = getApi('change/about');
  export const RemoveFromWishlist = getApi('wishlists/');
  export const SearchUrl = getApi('product/search?page=');
  export const GetUserBasket = getApi('baskets');
  export const CreateGuestOrder = getApi('orders/guests');
  export const BasketQuantityIncreamentDecreament = getApi('baskets/quantity');
  export const CreateEditorOrder = getApi('orders');
  export const BuyNowOrderEditor = getApi('orders/editor/buy-now');
  export const BuyNowOrderGuest = getApi('orders/guest/buy-now');
  export const GetAnalytics = getApi('analytics');
  export const EditorSearch = getApi('editor/search');
  export const GetReviews = getApi('reviews/product/');
  export const PostReview = getApi('review/product');
  export const Newsfeed = getApi('news-feed?page=');
  export const Popular = getApi('popular');
  export const GetBrandOrders = getApi('orders/brands?page=');
  export const GetOrdersByEditorAndGuest = getApi('orders/');
  export const VerifyAccount = getApi('verify-account');
  export const ChangePassword = getApi('change-password');
  export const ShippingAvailability = getApi('product/shipping/availability');
  export const AddComment = getApi('product/add/comment');
