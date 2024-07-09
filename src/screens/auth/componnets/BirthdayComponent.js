import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {RFValue} from 'react-native-responsive-fontsize';
import {wp2} from '../../../theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CustomDatePicker = props => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(moment());

  const onChangeDate = selectedDate => {
    setDate(moment(selectedDate));
  };

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 10,
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        elevation: 8,
        marginVertical: 2,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#D4D4D4',
      }}
      activeOpacity={0}
      onPress={() => setShow(true)}>
      <View>
        <Modal
          transparent={true}
          animationType="slide"
          visible={show}
          supportedOrientations={'portrait'}
          onRequestClose={() => setShow(false)}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableHighlight
              style={{
                flex: 1,
                alignItems: 'flex-end',
                flexDirection: 'row',
              }}
              activeOpacity={1}
              visible={show}
              onPress={() => setShow(false)}>
              <TouchableHighlight
                underlayColor={'#FFF'}
                style={{
                  flex: 1,
                  borderColor: '#fff',
                  borderTopWidth: 1,
                }}>
                <View
                  style={{
                    backgroundColor: '#FFF',
                    height: 256,
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      marginTop: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <DatePicker
                      mode="date"
                      minimumDate={moment().subtract(120, 'years').toDate()}
                      date={date.toDate()}
                      maximumDate={new Date()}
                      onDateChange={onChangeDate}
                    />
                  </View>
                </View>
              </TouchableHighlight>
            </TouchableHighlight>
          </View>
        </Modal>
        <Text
          style={{
            paddingHorizontal: wp2(2),
            flex: 0,
            fontWeight: '400',
            color: '#4D4D4D',
            fontSize: 16,
            paddingTop: 12,
            fontFamily: 'Poppins-Regular',
          }}>
          {date.format('MMMM Do, YYYY')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomDatePicker;
