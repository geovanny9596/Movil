import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity} from 'react-native'; 
import {getInfo} from '../services/services';
//import Geolocation from '@react-native-community/geolocation';
  
const dimensions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [nm, setName] = useState('');

  useEffect(() => {
    getInfo('info').then((usr) => {
      setName(usr.Nombre);
    });      
  },[]); 

    return (
        <View style={ style.vw }>
          <Text style = { style.txt }>Bienvenido/a {nm} </Text>
          <Image style={style.img} source={require('../assets/img/serviciotaxi.png')} resizeMode='contain' ></Image> 
        </View>
);
}

const style = StyleSheet.create({
  vw :  { alignItems:'center', position:'relative' },
  img : {width:'95%', height:dimensions.height / 1.5, top:80, borderRadius:5},
  txt : {color:'#2C3E50', fontWeight:'bold', fontSize:20, position:'absolute', top:25},
  btn_tch : {width:'75%', justifyContent:'center', marginTop:50},
  btn_img : {width:'100%', borderRadius:25, position:'absolute'},
  btn_txt : {textAlignVertical:'center', textAlign:'center', color:'#ebf4f7', fontWeight:'bold', fontSize:20}
}); 

export default Home;