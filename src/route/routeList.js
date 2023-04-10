import GuestScreen from "../screens/auth/guestScreen";
import LoginScreen from "../screens/auth/loginScreen";
import SignupScreen from "../screens/auth/signupScreen";
import ResetPassScreen from "../screens/auth/resetPassScreen";
import FeedbackScreen from "../screens/feedback/feedbackScreen";
import AccountTypeScreen from "../screens/auth/accountTypeScreen";
import SplashScreen from "../screens/splash/splashScreen";
import WelcomeScreen from "../screens/welcome/welcomeScreen";
import NotificationScreen from "../screens/notification/notificationScreen";
import OrderTrackingScreen from "../screens/accountSetting/orderTrackingScreen";
import DestinationScreen from "../screens/accountSetting/destinationScreen";
import ConfirmationScreen from "../screens/checkout/confirmationScreen";
import CustomerSupportScreen from "../screens/feedback/customerSupportScreen";
import LookbookScreen from "../screens/lookbook/lookbookScreen";
import WardrobeScreen from "../screens/profileEditor/wardrobeScreen";
import CollectionScreen from "../screens/lookbook/collectionScreen";
import GalleryScreen from "../screens/profileBrand/galleryScreen";
import HomeScreen from "../screens/home/homeScreen";
import ListViewScreen from "../screens/home/listViewScreen";
import FTS100 from "../screens/fts100/FTS100";
import BrandProfileScreen from "../screens/profileBrand/brandProfileScreen";
import EditorProfileScreen from "../screens/profileEditor/editorProfileScreen";
import NextPickupScreen from "../screens/profileEditor/nextPickupScreen";
import DressingRoomScreen from "../screens/dressingRoom/dressingRoomScreen";
import ImageViewScreen from "../screens/imageView/imageViewScreen";
import BasketScreen from "../screens/basket/basketScreen";
import CheckoutScreen from "../screens/checkout/checkoutScreen";
import SearchScreen from "../screens/search/searchScreen";
import AnalyticsScreen from "../screens/accountSetting/analyticsScreen";
import ImageUploadScreen from "../screens/imageUploadGallery/imageUploadScreen";
import SettingsScreen from "../screens/accountSetting/settingsScreen";
import TermsScreen from "../screens/accountSetting/termsScreen";
import PrivacyScreen from "../screens/accountSetting/privacyScreen";
import CreateAccountScreen from "../screens/auth/createAccountScreen";
import SizeClothing from "../screens/filter/sizeClothing";
import ColourClothing from "../screens/filter/colourClothing";
import FilterScreen from "../screens/filter/filterScreen";
import PriceList from "../screens/filter/priceList";
import Style from "../screens/filter/style";
import Items from "../screens/filter/items";
import Continents from "../screens/filter/continents";
import ShippingAddress from "../screens/accountSetting/shippingAddress";
import EditProfile from "../screens/editProfile/editProfile";
import ProductType from "../screens/imageUploadLookbook/productType";
import ImageUploadLookbook from "../screens/imageUploadLookbook/imageUploadLookbook";
import ShippingLocation from "../screens/accountSetting/shippingLocation";
import SelectCoverPhoto from "../screens/lookbook/selectCoverPhoto";
import AddCollection from "../screens/lookbook/addCollection";
import Inventory from "../screens/inventory/inventory";
import ReuploadScreen from "../screens/inventory/reuploadScreen";
import Username from "../screens/editProfile/username";
import Email from "../screens/editProfile/email";
import Phone from "../screens/editProfile/phone";
import PasswordChange from "../screens/editProfile/passwordChange";
import About from "../screens/editProfile/about";
import FollowerList from "../screens/followers/followerList";

export const stackRouteList = [
    {name:"guestScreen", component:GuestScreen},//
    {name:"loginScreen", component:LoginScreen},//
    {name:"signupScreen", component:SignupScreen},//
    {name:"resetPassScreen", component:ResetPassScreen},//
    {name:"feedbackScreen", component:FeedbackScreen},//
    {name:"accountTypeScreen", component:AccountTypeScreen},//
    {name:"splashScreen", component:SplashScreen},
    {name:"welcomeScreen", component:WelcomeScreen},
    {name:"notificationScreen", component:NotificationScreen},//
    {name:"orderTrackingScreen", component:OrderTrackingScreen},//
    {name:"destinationScreen", component:DestinationScreen},//
    {name:"confirmationScreen", component:ConfirmationScreen},//
    {name:'customerSupportScreen',component:CustomerSupportScreen},//
    {name:'lookbookScreen',component:LookbookScreen},//
    {name:'wardrobeScreen',component:WardrobeScreen},//
    {name:'collectionScreen',component:CollectionScreen},//
    {name:'galleryScreen',component:GalleryScreen},//
    {name:'homeScreen',component:HomeScreen},//
    {name:'listViewScreen',component:ListViewScreen},//
    {name:'FTS100',component:FTS100},//
    {name:'brandProfileScreen',component:BrandProfileScreen},//
    {name:'editorProfileScreen',component:EditorProfileScreen},//
    {name:'nextPickupScreen',component:NextPickupScreen},//
    {name:'dressingRoomScreen',component:DressingRoomScreen},////
    {name:'imageViewScreen',component:ImageViewScreen},//
    {name:'basketScreen',component:BasketScreen},//
    {name:'checkoutScreen',component:CheckoutScreen},//
    {name:'searchScreen',component:SearchScreen},//
    {name:'analyticsScreen',component:AnalyticsScreen},//
    {name:'imageUploadScreen',component:ImageUploadScreen},//
    {name:'settingsScreen',component:SettingsScreen},//
    {name:'termsScreen',component:TermsScreen},//
    {name:'privacyScreen',component:PrivacyScreen},//
    {name:'createAccountScreen',component:CreateAccountScreen},//
    {name:'sizeClothing',component:SizeClothing},//
    {name:'colourClothing',component:ColourClothing},//
    {name:'filterScreen',component:FilterScreen},//
    {name:'priceList',component:PriceList},//
    {name:'style',component:Style},//
    {name:'items',component:Items},//
    {name:'continents',component:Continents},//
    {name:'shippingAddress',component:ShippingAddress},//
    {name:'editProfile',component:EditProfile},//
    {name:'productType',component:ProductType},//
    {name:'imageUploadLookbook',component:ImageUploadLookbook},//
    {name:'shippingLocation',component:ShippingLocation},//
    {name:'selectCoverPhoto',component:SelectCoverPhoto},//
    {name:'addCollection',component:AddCollection},//
    {name:'inventory',component:Inventory},//
    {name:'reuploadScreen',component:ReuploadScreen},//
    {name:'username',component:Username},//
    {name:'email',component:Email},//
    {name:'phone',component:Phone},//
    {name:'passwordChange',component:PasswordChange},//
    {name:'about',component:About},//
    {name:'followerList',component:FollowerList},//
    
]