import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, IMAGES, hp2, wp2 } from '../../../theme';
import { RFValue } from 'react-native-responsive-fontsize';

const PasswordValidationRow = ({ password }) => {
  const special = /[!@#\$%\^\&*\)\(+=._-]/g;
  const numeric = /[0-9]/;

  // Perform validation
  const isValidLength = password.length >= 8;
  const hasNumericCharacter = numeric.test(password);
  const hasSpecialCharacter = password.match(special);

  // Determine if any validation rule fails
  const isRed = !isValidLength || !hasNumericCharacter || !hasSpecialCharacter;

  // Determine the image to display based on the validation result
  const dangerImage = isRed ? IMAGES.dangerRed : IMAGES.dangerBlack;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30 }}>
      {/* Danger Image */}
      <Image source={dangerImage} style={{ marginRight: 10 }} />

      {/* Texts */}
      <View style={{ width: wp2(80) }}>
        <Text
          style={[
            styles.textTwo,
            { color: isValidLength ? COLORS.black : '#EC2D30' },
          ]}
        >
          Must be at least 8 characters
        </Text>
        <Text
          style={[
            styles.textTwo,
            { color: hasNumericCharacter ? COLORS.black : '#EC2D30' },
          ]}
        >
          Must include at least 1 Numerical character
        </Text>
        <Text
          style={[
            styles.textTwo,
            { color: hasSpecialCharacter ? COLORS.black : '#EC2D30' },
          ]}
        >
          Must include at least 1 special character ( Examples !”£$)
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    textTwo: {fontWeight: '400', fontSize: RFValue(8)},

  });
  
export default PasswordValidationRow;
