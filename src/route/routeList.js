import GuestScreen from "../screens/unAuth/guestScreen";
import LoginScreen from "../screens/unAuth/loginScreen";
import SignupScreen from "../screens/unAuth/signupScreen";
import ResetPassScreen from "../screens/unAuth/resetPassScreen";
import FeedbackScreen from "../screens/auth/feedbackScreen";
import AccountTypeScreen from "../screens/unAuth/accountTypeScreen";
import SplashScreen from "../screens/unAuth/splashScreen";
import WelcomeScreen from "../screens/unAuth/welcomeScreen";
import NotificationScreen from "../screens/auth/notificationScreen";
import OrderTrackingScreen from "../screens/auth/orderTrackingScreen";
import DestinationScreen from "../screens/unAuth/destinationScreen";
import ConfirmationScreen from "../screens/auth/confirmationScreen";
import CustomerSupportScreen from "../screens/auth/customerSupportScreen";
import LookbookScreen from "../screens/guest/lookbookScreen";
import WardrobeScreen from "../screens/guest/wardrobeScreen";
import CollectionScreen from "../screens/guest/collectionScreen";
import GalleryScreen from "../screens/guest/galleryScreen";
import HomeScreen from "../screens/guest/homeScreen";
import ListViewScreen from "../screens/guest/listViewScreen";
import FTS100 from "../screens/guest/FTS100";
import BrandProfileScreen from "../screens/guest/brandProfileScreen";
import EditorProfileScreen from "../screens/guest/editorProfileScreen";
import NextPickupScreen from "../screens/guest/nextPickupScreen";
import DressingRoomScreen from "../screens/guest/dressingRoomScreen";
import ImageViewScreen from "../screens/guest/imageViewScreen";
import BasketScreen from "../screens/guest/basketScreen";
import CheckoutScreen from "../screens/guest/checkoutScreen";
import SearchScreen from "../screens/auth/searchScreen";
import AnalyticsScreen from "../screens/auth/analyticsScreen";
import ImageUploadScreen from "../screens/auth/imageUploadScreen";

export const stackRouteList = [
    {name:"guestScreen", component:GuestScreen},//
    {name:"loginScreen", component:LoginScreen},//
    {name:"signupScreen", component:SignupScreen},//
    {name:"resetPassScreen", component:ResetPassScreen},//
    {name:"feedbackScreen", component:FeedbackScreen},
    {name:"accountTypeScreen", component:AccountTypeScreen},
    {name:"splashScreen", component:SplashScreen},
    {name:"welcomeScreen", component:WelcomeScreen},
    {name:"notificationScreen", component:NotificationScreen},
    {name:"orderTrackingScreen", component:OrderTrackingScreen},
    {name:"destinationScreen", component:DestinationScreen},
    {name:"confirmationScreen", component:ConfirmationScreen},//
    {name:'customerSupportScreen',component:CustomerSupportScreen},
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
    {name:'analyticsScreen',component:AnalyticsScreen},
    {name:'imageUploadScreen',component:ImageUploadScreen},
    
]