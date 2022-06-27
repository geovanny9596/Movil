import React, {useState, useContext} from 'react'; 
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { TextInput } from 'react-native-paper';
import { login } from '../services/services'; 
import {AuthContext} from '../App'



const Login = ({navigation}) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const { signIn } = useContext(AuthContext);
  const onPressHan=()=>{
    navigation.navigate('Registrarse')
  }
    return (
      <View style={style.view}>
        <Image style={ style.img } source={require('../assets/img/grupo.png')} resizeMode='contain' />
        <Text style={style.tittle}>BIENVENIDO USUARIO</Text>
        <TextInput label='Usuario' left={<TextInput.Icon name='account' />} style={style.ipText} value={user} onChangeText={setUser}/>
        <TextInput label='Contraseña' secureTextEntry left={<TextInput.Icon name='lock' />} style={style.ipText} value={pass} onChangeText={setPass} />
        
        <TouchableOpacity style={style.btn_tch} onPress={() => signIn({user,pass})} >
          <Image source={require('../assets/img/btn_login.png')} style={style.btn_img} ></Image>
          <Text style={style.btn_txt}>LOGIN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={style.btn_tch} onPress={(onPressHan) } >
          <Text style={style.txt}>¿Aun no estas registrado? Registrate Aqui.</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={style.btn_tch2} onPress={() => Linking.openURL('https://maxbri.com.mx/AvisoPrivacidad/Avisodeprivacidad.html')} >
          <Text style={style.txt}>Aviso de privacidad</Text>
        </TouchableOpacity>
      </View>
    );
} 

const style = StyleSheet.create ({
  view:{flex: 1, alignItems: "center", justifyContent:'center' },
  img:{ width:'75%', height:'20%', marginBottom:50 },
  tittle:{fontSize:40, fontWeight:'bold', marginBottom:15, color:'#2C3E50'},
  txt : {textAlignVertical:'center', textAlign:'center', color:'#2C3E50', fontWeight:'bold'},
  ipText:{borderWidth:1, borderRadius:5, borderColor:'#66aefc', backgroundColor:'#ebf4f7', width:'75%', marginBottom:15, marginTop:15},
  btn_tch : {width:'75%', justifyContent:'center', marginTop:30},
  btn_tch2 : {width:'75%', justifyContent:'center', marginTop:30},

  btn_img : {width:'100%', borderRadius:25, position:'absolute'},
  btn_txt : {textAlignVertical:'center', textAlign:'center', color:'#ebf4f7', fontWeight:'bold', fontSize:20},
  btn:{marginBottom:15, marginTop:25, width:'80%'},
});

export default Login;