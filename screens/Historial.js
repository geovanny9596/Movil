import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class App extends Component {
  
  state ={
    data:[]
  }

  fetchData= async()=>{
    id = await AsyncStorage.getItem('idc');
    const response = await fetch('https://maxbri.com.mx/App/ListarViajes.php?idc=14');
    const users = await response.json();
    this.setState({data: users});

  }
componentDidMount(){
  this.fetchData();
}
  render() {
    return (
      <View >

       <FlatList
       data={this.state.data}
       keyExtractor={(item,index) => index.toString()}
       renderItem={({item}) =>

       <ScrollView>
        <View style={style.ViewStyle}> 
       <Text></Text>
       <Text></Text>
           

                    <View style={style.header}>
                       <Text></Text>
                       {/**  <Text style={style.txtStyle}>Datos del Conductor</Text>
                        <Text></Text>
         
                        <View style={{flexDirection: 'row'}}>
                         <Text style={style.txtStyle2}>Nombre Completo:</Text>
                         <Text style={style.txtStyle3}>{item.Nombre} {item.Apellidos}</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
                         <Text style={style.txtStyle2}> Color Del Vehiculo: </Text>
                         <Text style={style.txtStyle3}>{this.state.Color} </Text>
        </View>  
        <Text></Text>      
         <View style={{flexDirection: 'row'}}>
                         <Text style={style.txtStyle2}>Marca y Modelo Del Vehiculo:</Text>
                         <Text style={style.txtStyle3}>{this.state.MarcaYSubmarca} {this.state.Modelo}</Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
                         <Text style={style.txtStyle2}>Placas del Placas:</Text>
                         <Text style={style.txtStyle3}> {this.state.Placas} </Text>
        </View>
        <Text></Text>
        <Text style={{ borderColor:'#444242',
        marginBottom:1,
        backgroundColor:'#444242'}}></Text> 
    */}
                        <Text style={style.txtStyle}>Datos del Viajes</Text>
                        <Text></Text>
                        <View style={{flexDirection: 'row'}}>
                        <Text style={style.txtStyle2}>Nombre Conductor:</Text>

<Text style={style.txtStyle3}>{ item.Nombre_Conductor}</Text>
        </View>  
        <Text></Text>
                        <View style={{flexDirection: 'row'}}>

               
                         <Text style={style.txtStyle2}>Origen:</Text>

                         <Text style={style.txtStyle3}>{ item.Origen}</Text>
        </View>

        <Text></Text>
        <View style={{flexDirection: 'row'}}>
                         <Text style={style.txtStyle2}>Destino: </Text>
                         <Text style={style.txtStyle3}>{ item.Destino} </Text>
        </View>  
        <Text></Text>      
         <View style={{flexDirection: 'row'}}>
                         <Text style={style.txtStyle2}>Duración:</Text>
                         <Text style={style.txtStyle3}>{ item.Duracion} </Text>
        </View>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
                         <Text style={style.txtStyle2}>Tarifa:</Text>
                         <Text style={style.txtStyle3}>{ item.tarifa} </Text>

                     
        </View>     
        <Text></Text>  
        <View style={{flexDirection: 'row'}}>
                         <Text style={style.txtStyle2}>Fecha Termino:</Text>
                         <Text style={style.txtStyle3}>{ item.Fecha_termino} </Text>

                     
        </View>  
        <Text></Text>  
        <View style={{flexDirection: 'row'}}>
                         <Text style={style.txtStyle2}>Estado:</Text>
                         <Text style={style.txtStyle3}>{ item.Estado} </Text>

                     
        </View>  
        <Text></Text>
                    </View>


               
       
       
      </View>
      </ScrollView>

       }

       />
      </View>
    );
  }
}

export const style = StyleSheet.create({
    ViewStyle: {
        flex: 1,
        alignItems: "center", justifyContent:'center' 
   
   
     },
     header: {
        width: '90%',
        position: 'relative',
        top: 0,
        left: 0,
        borderWidth: 1,  // Set border width.  
    borderColor: '#444242',  // Set border Hex Color code here. 
    borderRadius: 10,

      },
      txtStyle: {
        fontSize:30,
        textAlign: 'center',
  
        fontWeight: "bold"
      },
      txtStyle2: {
        fontSize:20,
        textAlign: 'center',
        flex: 1, flexWrap: 'wrap',
        fontWeight: "bold"
      },
      txtStyle3: {
        fontSize:20,
        textAlign: 'center',
        flex: 1, flexWrap: 'wrap'
        
      },
      text:{fontSize:15},
    viewWrapper:{
        flex:1
    },
    viewForm:{
        flex:2, 
        padding:10
    },
    viewData:{
        flex:4
    },
    textInput:{
        padding:10,
        fontSize:15,
        borderRadius:15, 
        borderWidth:1,
        borderColor:'#CCCCCC',
        marginBottom:10,
        backgroundColor:'#dedede'
    },
    viewList:{
        width: '100%',
        position: 'relative',
        top: 0,
        left: 0,
        borderBottomWidth:1,
        borderBottomColor:'#dedede'
    },
    textListNama:{
        flex:3,
        fontSize:20,
        fontWeight:'bold'
    },
    textListEdit:{
        color:'blue',
        marginRight:20
    },
    textListDelete:{
        color:'red'
    }
})
