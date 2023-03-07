import ICONS from "./icons";
import { IMAGES } from "./images";
import  { COLORS, SIZES, getFont,FONTS} from "./theme";
import {Dimensions} from 'react-native'

const {width, height}= Dimensions.get('screen');

const screenWidth=width
const screenHeight= height

const wp2 = widthPerc => {
	return  width* widthPerc /100;
}

const hp2 = heightPerc => {
	return height * heightPerc/100;
}
export {
	IMAGES,
	ICONS,
	COLORS,
	SIZES,
screenHeight,
screenWidth,
	wp2,
	hp2,
	getFont,
	FONTS
};
