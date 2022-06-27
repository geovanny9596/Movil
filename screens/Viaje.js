import { useFocusEffect, useIsFocused  } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { viajeProg, abrirMaps, viaje_btn, getInfo } from '../services/services';
import { ActivityIndicator, Colors } from 'react-native-paper';

const dimensions = Dimensions.get('screen');

const Viaje = () => {
    const [via, setVia] = useState('');
    const [fecha, setFecha] = useState('');
    const [txtbtn, setBtn] = useState('');
    const [id,setId] = useState('');
    const [error, setError] = useState(false);
    const [intv, setInt] = useState(0);
    
    useEffect(() => {
        getInfo('info').then((res) => {
            setId(res.id);
        });
    
       
        }); 

    return (
        <View style={style.vw}>
<Text style={style.txtB}><Icon name="car" size={30} color="#66aefc" />Registrar Viaje</Text>

      
       
            
        </View>
    );
}

const style = StyleSheet.create({
    vw :  { flex:1, justifyContent:'center', alignItems:'center'},
    txt : {color:'#2C3E50'},
    txtB : {color:'#2C3E50', fontWeight:'bold', fontSize:30},
    img : {width:'95%', height:dimensions.height / 4.00, resizeMode:'contain', top:25, borderRadius:5},
    btn_tch : {width:'75%', justifyContent:'center', marginTop:50},
    btn_img : {width:'100%', borderRadius:25, position:'absolute'},
    btn_txt : {textAlignVertical:'center', textAlign:'center', color:'#ebf4f7', fontWeight:'bold', fontSize:20}  
});

export default Viaje;