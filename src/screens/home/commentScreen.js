import React, {useState} from 'react';
import {
  StyleSheet,
  View,

  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';

import {

  RFValue as rfv,
} from 'react-native-responsive-fontsize';

import {

  ICONS,
  COLORS,

  wp2,
  hp2,

} from '../../theme';


import CommentComp from './commentComp';
import LineComp from '../../components/lineComp';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {AddComment} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import moment from 'moment';

import LoaderComp from '../../components/loaderComp';

export default function CommentScreen(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  const [uniqDates, setUniqDates] = useState();
  pid = props?.route?.params?.product_id;
  commentsArr = props?.route?.params?.comments;
  const [desc, setDesc] = useState('');
// console.log(props?.route?.params?.comments)
  

  const onSend = () => {
    if (desc !== '') {
      setLoading(true);

      let obj = {
        user_id: user?.userData?.id,
        product_id:pid,
        comment: desc,
      };

     

      axios
        .post(AddComment, obj, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then(async function (res) {
          
          commentsArr?.push({comment:desc,created_at:new Date()});
          setDesc('');
          setLoading(false);
          successMessage('Comment Added!');
        })
        .catch(function (error) {
          
          setLoading(false);
        
          errorMessage(errorHandler(error))
        });
    } else {
      errorMessage('Please fill details!');
    }
  };

  return (
    <>
     <View style={{position: 'absolute', zIndex: 999}}>
        {loading && <LoaderComp />}
      </View>

    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <View style={styles.headWrap}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{marginLeft: wp2(3), marginRight: wp2(5)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.commentText}>Comments</Text>
      </View>

      <>
          {commentsArr?.length!==0? 
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:hp2(2)}}>
            
            {commentsArr?.filter((v,i,a)=>a.findIndex(v2=>moment(v2?.created_at).format('MM/YY')===moment(v?.created_at).format('MM/YY'),) === i,).map((item,index)=>moment(item?.created_at).format('MM/YY'))?.map((item,index)=>{
          
            return(
              <>
              <LineComp date={item} key={index} />

          {commentsArr?.map((item2, index2) => {
                    if (moment(item2?.created_at).format('MM/YY') === item)
                      return (
                        <CommentComp data={item2} key={index2} />
                      );
                  })}
              </>
            )
          })}
          </ScrollView>
          :<View style={{alignItems:'center',justifyContent:'center',flex:1,}}><Text>Comments Not Available</Text></View>}
      </>

      <View style={styles.textBox}>
        <TextInput
          placeholder={'Write your text here...'}
          placeholderTextColor={'grey'}
          style={styles.inputTxt}
          onChangeText={val => setDesc(val)}
          value={desc}
        />
      </View>

      <TouchableOpacity onPress={onSend} style={styles.button}>
        <Text style={styles.buttonText}>Add your comment</Text>
      </TouchableOpacity>
    </View>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
  },
  commentText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(24),
  },
  textBox: {
    width: wp2(88),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    height: hp2(6),
    
  },
  button: {
    width: wp2(88),
    height: hp2(6),
    backgroundColor: 'white',
    borderRadius: wp2(4),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    alignSelf: 'center',
    marginVertical: hp2(1),
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: rfv(14),
  },
  inputTxt: {
    flex: 1,
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(14),
  },
});
