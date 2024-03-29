import React, {useState} from 'react';
import {
  StyleSheet,
 
  TouchableOpacity,
  
} from 'react-native';



import {
  
  ICONS,

  wp2,
  hp2,

} from '../theme';

export default function ColorBox(props) {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => (selected ? setSelected(false) : setSelected(true))}
        style={[styles.color, {backgroundColor: props.color}]}>
        {selected && (
          <ICONS.AntDesign
            name="checkcircle"
            size={20}
            color="#0F2ABA"
            style={{
              position: 'absolute',
              right: wp2(2),
              top: hp2(0.5),
              zIndex: 999,
            }}
          />
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  color: {
    width: wp2(30),
    height: hp2(15),
    backgroundColor: 'red',
    borderRadius: wp2(2),
    marginVertical: hp2(1),
    marginHorizontal: wp2(1),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
