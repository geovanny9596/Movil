import React, {useState, useEffect} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const [data, setData] = useState([]);
 

  useEffect(async () => {
   getViajes();
  }, []);

  const getViajes = async() => {
    //Traes es id del usario logeado que se encuentra en el Storage
    const id = await AsyncStorage.getItem('id');
   
    try {
        const result = await axios.get(
            `https://maxbri.com.mx/App/ListarViajes.php?idc=${id}`,
        );
    
       
        setData(result.data)
    } catch (error) {
        console.log(error);
    }
   
  
    // setData(result.data);
  }
  return (
    <View>
      <ScrollView>
        {data.map(item => (
          <View style={style.ViewStyle}>
            <Text></Text>
            <Text></Text>
            <View style={style.header} key={item.Id_user}>
              <Text></Text>

              <Text style={style.txtStyle}>Datos del Viajes</Text>
              <Text></Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={style.txtStyle2}>Nombre Conductor:</Text>

                <Text style={style.txtStyle3}>{item.Nombre_Conductor}</Text>
              </View>
              <Text></Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={style.txtStyle2}>Origen:</Text>

                <Text style={style.txtStyle3}>{item.Origen}</Text>
              </View>

              <Text></Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={style.txtStyle2}>Destino: </Text>
                <Text style={style.txtStyle3}>{item.Destino} </Text>
              </View>
              <Text></Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={style.txtStyle2}>Duración:</Text>
                <Text style={style.txtStyle3}>{item.Duracion} </Text>
              </View>
              <Text></Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={style.txtStyle2}>Tarifa:</Text>
                <Text style={style.txtStyle3}>{item.tarifa} MXM </Text>
              </View>
              <Text></Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={style.txtStyle2}>Fecha Termino:</Text>
                <Text style={style.txtStyle3}>{item.Fecha_termino} </Text>
              </View>
              <Text></Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={style.txtStyle2}>Estado:</Text>
                <Text style={style.txtStyle3}>{item.Estado} </Text>
              </View>
              <Text></Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export const style = StyleSheet.create({
  ViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '90%',
    position: 'relative',
    top: 0,
    left: 0,
    borderWidth: 1, // Set border width.
    borderColor: '#444242', // Set border Hex Color code here.
    borderRadius: 10,
  },
  txtStyle: {
    fontSize: 30,
    textAlign: 'center',

    fontWeight: 'bold',
  },
  txtStyle2: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  txtStyle3: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  text: {fontSize: 15},
  viewWrapper: {
    flex: 1,
  },
  viewForm: {
    flex: 2,
    padding: 10,
  },
  viewData: {
    flex: 4,
  },
  textInput: {
    padding: 10,
    fontSize: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 10,
    backgroundColor: '#dedede',
  },
  viewList: {
    width: '100%',
    position: 'relative',
    top: 0,
    left: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
  },
  textListNama: {
    flex: 3,
    fontSize: 20,
    fontWeight: 'bold',
  },
  txt: {
    color: '#2C3E50',
    fontWeight: 'bold',
    fontSize: 20,
    position: 'absolute',
    top: 25,
  },
  btn_tch2: {width: '75%', justifyContent: 'center', marginTop: 30},

  textListEdit: {
    color: 'blue',
    marginRight: 20,
  },
  textListDelete: {
    color: 'red',
  },
});
export default App;
