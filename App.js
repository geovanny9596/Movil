import 'react-native-gesture-handler';
import React, {useEffect, useState, useReducer, createContext, useMemo, useContext} from 'react'; 
import { Text, Image, StyleSheet } from 'react-native';
import Login from './screens/Login';
import Registrarse from './screens/Registrarse';
import Home from './screens/Home';
import Viaje from './screens/Viaje';
import Ajustes from './screens/Ajustes';

import Historial from './screens/Historial';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton, Menu } from 'react-native-paper';
import { saveInfo, rptUbic } from './services/services';
import axios from 'axios';
import Swal from 'react-native-sweet-alert';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Geolocation from 'react-native-geolocation-service';
//import Geolocation from '@react-native-community/geolocation';
import BackgroundTimer from 'react-native-background-timer';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export const AuthContext = createContext();

export const App = () => {
  const [state,dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type){
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
  // Fetch the token from storage then navigate to our appropriate place
  const bootstrapAsync = async () => {
    let userToken;

    try {
      userToken = await AsyncStorage.getItem('id');
    } catch (e) {
      // Restoring token failed
    }

    // After restoring token, we may need to validate it in production apps

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    dispatch({ type: 'RESTORE_TOKEN', token: userToken });
  };

  bootstrapAsync();
}, []);


/*BackgroundTimer.setInterval( () => {
    Geolocation.getCurrentPosition( (info) =>{ 
      saveInfo('currLoc',{'lat':info.coords.latitude, 'lon':info.coords.longitude});
      rptUbic(info.coords.latitude,info.coords.longitude);
      console.log(info.coords);
  },
  (error) => {
    // See error code charts below.
    //console.log(error.code, error.message);
    if (error.code == 1)
      alert('¡Se requiere permiso de ubicacion! Permita la ubicacion y reinicie la App.');
  },
  //{ enableHighAccuracy: true, forceLocationManager:true, fastestInterval:1000 });
  { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, forceLocationManager:true, fastestInterval:5000 });
},4000);
/*

componentDidMount(() => {
  if (hasLocationPermission) {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
}) ;
    

    const interval = setInterval( async () => {
  Geolocation.getCurrentPosition( info =>{ 
    console.log('lat:'+info.coords.latitude+' lon:'+info.coords.longitude);
    saveInfo('currLoc',{'lat':info.coords.latitude, 'lon':info.coords.longitude});
    rptUbic(info.coords.latitude,info.coords.longitude);
  });
},4000);
*/
const authContext = useMemo(
  () => ({
    signIn: async (data) => {
      var tk = '';
      if (data.user!='' && data.pass!=''){
        const resp = await axios.get(`https://maxbri.com.mx/App/SesionClientes.php?usr=${data.user}&pwd=${data.pass}&stat=login`);
        //const resp = await axios.get( `http://192.168.1.77/Sesion.php?usr=${data.user}&pwd=${data.pass}&stat=login`);
//        const resp = await axios.get( `http://192.168.137.1/Sesion.php?usr=${data.user}&pwd=${data.pass}&stat=login`);
        if (resp.data!='0'){
            saveInfo('info', resp.data);
            saveInfo('id', resp.data['id']);
            tk =  resp.data['id'];
         }
    else 
        Swal.showAlertWithOptions({  
        title: 'Oops...',
        subTitle: 'No reconocemos tus datos',
        style: 'error'
        });
    }
    else
    Swal.showAlertWithOptions({  
        title: 'Oops...',
        subTitle: 'Debe ingresar todos los datos para continuar',
        style: 'warning'
    });
      // In a production app, we need to send some data (usually username, password) to server and get a token
      // We will also need to handle errors if sign in failed
      // After getting token, we need to persist the token using `SecureStore`
      // In the example, we'll use a dummy token
    if (tk != '')
      dispatch({ type: 'SIGN_IN', token: tk });
    },
    signOut: async () => {
      id = await AsyncStorage.getItem('id');
      await axios.get( `https://maxbri.com.mx/App/SesionClientes.php?idc=${id}&stat=logout`);
//      await axios.get( `http://192.168.1.77/Sesion.php?idc=${id}&stat=logout`);
      AsyncStorage.multiRemove(['info', 'id'], (err) => {
        dispatch({ type: 'SIGN_OUT' });
      });
    },
    signUp: async (data) => {
      // In a production app, we need to send user data to server and get a token
      // We will also need to handle errors if sign up failed
      // After getting token, we need to persist the token using `SecureStore`
      // In the example, we'll use a dummy token

      dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    },
  }),
  []
);

if (state.isLoading) {
  // We haven't finished checking for the token yet
  return <Text>Cargando...</Text>//<SplashScreen />;
} 

const Usuario = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <Tab.Navigator>
      <Tab.Screen name='Inicio' component={Home} options={{ tabBarIcon:() => <Icon name="home" size={30} color="#66aefc" />,  headerTitleAlign:'center', headerTintColor:'white', headerBackground: () => <Image source={require('./assets/img/header.png')}></Image>, headerRight: () => <IconButton icon='account-arrow-right'  color='white' onPress={() => signOut() } /> }}/>
      <Tab.Screen name='Tus Viajes' component={Historial} options={{ tabBarIcon:() => <Icon name="history" size={30} color="#66aefc" />, headerTitleAlign:'center', headerTintColor:'white', headerBackground: () => <Image source={require('./assets/img/header.png')}></Image>, headerTitle:'Historial de viajes', headerRight: () => <IconButton icon='account-arrow-right' color='white' onPress={() => signOut() } /> }}/>
      <Tab.Screen name='Registrar Viaje' component={Viaje} options={{ tabBarIcon:() => <Icon name="car" size={30} color="#66aefc" />, headerBackVisible:false, headerTitleAlign:'center', headerTintColor:'white', headerBackground: () => <Image source={require('./assets/img/header.png')}></Image>, headerTitle:'Viaje Actual', headerRight: () => <IconButton icon='account-arrow-right' color='white' onPress={() => signOut() } /> }}/>
      <Tab.Screen name='Ajustes' component={Ajustes} options={{ tabBarIcon:() => <Icon name="account-settings" size={30} color="#66aefc" />, headerBackVisible:false, headerTitleAlign:'center', headerTintColor:'white', headerBackground: () => <Image source={require('./assets/img/header.png')}></Image>, headerTitle:'Ajustes', headerRight: () => <IconButton icon='account-arrow-right' color='white' onPress={() => signOut() } /> }}/>

    </Tab.Navigator>
  );  
}
const Registro = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen   name='Registrarse' component={Registrarse}/>
        
     
      </Stack.Navigator>
    </NavigationContainer>
  )
  }
return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
        {state.userToken == null ? 
          ( <Stack.Screen name='Login' component={Login} options={{headerShown: false, animationTypeForReplace: state.isSignout ? 'pop' : 'push',}}/> )
          :
          ( <Stack.Screen name='Usuario' component={Usuario} options={{ headerShown:false }}/> )
         
        }
                <Stack.Screen name="Registrarse" component={Registrarse}></Stack.Screen>

      </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
    );
}

export default App;