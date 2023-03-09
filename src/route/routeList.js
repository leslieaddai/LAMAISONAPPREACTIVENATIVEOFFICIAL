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

export const stackRouteList = [
    {name:"guestScreen", component:GuestScreen},
    {name:"loginScreen", component:LoginScreen},
    {name:"signupScreen", component:SignupScreen},
    {name:"resetPassScreen", component:ResetPassScreen},
    {name:"feedbackScreen", component:FeedbackScreen},
    {name:"accountTypeScreen", component:AccountTypeScreen},
    {name:"splashScreen", component:SplashScreen},
    {name:"welcomeScreen", component:WelcomeScreen},
    {name:"notificationScreen", component:NotificationScreen},
    {name:"orderTrackingScreen", component:OrderTrackingScreen},
    {name:"destinationScreen", component:DestinationScreen},
    {name:"confirmationScreen", component:ConfirmationScreen},
    {name:'customerSupportScreen',component:CustomerSupportScreen},
    {name:'lookbookScreen',component:LookbookScreen},
    {name:'wardrobeScreen',component:WardrobeScreen},
    {name:'collectionScreen',component:CollectionScreen},
    {name:'galleryScreen',component:GalleryScreen},
    
]