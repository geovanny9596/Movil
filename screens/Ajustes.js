import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView,Button,Image } from 'react-native';
import Swal from 'react-native-sweet-alert';
import validator from 'validator';

const date = Date.now();

export default class Registrarse extends Component {

  constructor(props) {
    super(props);
    this.state = {Nombre: '', Apellidos: '', Domicilio: '',Celular: '',email: '',usuario: '',password: ''};

  }
  

  Register = ({navigation}) => {
    let Nombre = this.state.Nombre;
    let Apellidos = this.state.Apellidos;
    let Domicilio = this.state.Domicilio;
    let Celular = this.state.Celular;
    let email = this.state.email;
    let usuario = this.state.usuario;
    let password = this.state.password;
 
 

    if (Nombre.length === 0 || Apellidos.length ===0 || Domicilio.length === 0 || Celular.length === 0 || email.length === 0 ||usuario.length === 0  ||password.length === 0 ) {
      Swal.showAlertWithOptions({  
        title: 'Oops...',
        subTitle: 'Se requieren tus datos',
        style: 'error'
        });
    }else {
      let InsertAPIURL = "https://maxbri.com.mx/App/Registrar.php";

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      let Data = {
        Nombre: Nombre,
        Apellidos: Apellidos,
        Domicilio: Domicilio,
        Celular: Celular,
        email: email,
        usuario: usuario,
        password: password
      };

      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
      .then((response) =>response.json())
      .then((response)=>{
        Swal.showAlertWithOptions({  
          title: 'Guardado',
          subTitle: 'Se guardo correctamente',
          style: 'success'
        });
        this.props.navigation.navigate('Login')
      })
      .catch((error) => {
        Swal.showAlertWithOptions({  
          title: 'Oops...',
          subTitle: 'Ocurrio un error'+error,
          style: 'error'
          });
      })
    }
  
  }
 
  render() {
  

    
    return(
      <ScrollView showsVerticalScrollIndicator={false}>
  
      <View style={styles.ViewStyle}> 

      <Text></Text>
  
<Text>
        <Text style={styles.subtitle2}>
        Nombre
       
        </Text>
    </Text>
        <TextInput 
          placeholder={"Tu Nombre"}
          placeholderTextColor={"#008080"}
          style={styles.txtStyle}
          onChangeText={Nombre => this.setState({Nombre})}
        />
        <Text>
        <Text style={styles.subtitle2}>
        Apellidos
       
        </Text>
    </Text>
        <TextInput 
          placeholder={"Tu Apellidos"}
          placeholderTextColor={"#008080"}
          style={styles.txtStyle}
          onChangeText={Apellidos => this.setState({Apellidos})}
        />
        <Text>
        <Text style={styles.subtitle2}>
        Domicilio
       
        </Text>
    </Text>
          <TextInput 
          placeholder={"Tu Domicilio"}
          placeholderTextColor={"#008080"}
          style={styles.txtStyle}
          onChangeText={Domicilio => this.setState({Domicilio})}
        />
        <Text>
        <Text style={styles.subtitle2}>
        Celular
       
        </Text>
    </Text>
          <TextInput 
          placeholder={"Tu Celular"}
          placeholderTextColor={"#008080"}
          style={styles.txtStyle}
          keyboardType="numeric"
          maxLength={10}
          pattern={"[0-9]{10,100}"}
          onChangeText={Celular => this.setState({Celular})}
        />
        <Text>
        <Text style={styles.subtitle2}>
        Correo
       
        </Text>
    </Text>
        <TextInput 
          placeholder={"Tu Correo"}
          placeholderTextColor={"#008080"}
          style={styles.txtStyle}

          onChangeText={email => this.setState({email})}
        />

        <Text>
        <Text style={styles.subtitle2}>
        Usuario
       
        </Text>
    </Text>
         <TextInput 
          placeholder={"Tu Usuario"}
          placeholderTextColor={"#008080"}
          style={styles.txtStyle}
          onChangeText={usuario => this.setState({usuario})}
        />
        <Text>
        <Text style={styles.subtitle2}>
        Contraseña
       
        </Text>
    </Text>
         <TextInput 
          placeholder={"Tu Contraseña"}
          placeholderTextColor={"#008080"}
          style={styles.txtStyle}
          onChangeText={password => this.setState({password})}
        />
          
        <Button
          title={"Actualizar"}
          onPress={this.Register}
        />
        <Text></Text>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
   ViewStyle: {
     flex: 1,
     alignItems: "center", justifyContent:'center' 

   }, header: {
    width: '100%',
    height: 200,
    position: 'relative',
    top: 0,
    left: 0,

  },
  subtitle2: {
    fontSize: 20,
    fontFamily: 'sans-serif',
    color: '#000000',
    margin: 10,
  },
  subtitle3: {
    fontSize: 20,
    fontFamily: 'sans-serif',
    color: '#ff0000',
    margin: 10,
  },
   tittle:{fontSize:50,  marginBottom:15, color:'#2C3E50'},
   tittle2:{fontSize:20,  marginBottom:15, color:'#2C3E50'},

   txtStyle: {
     borderBottomWidth: 1,
     width:'80%',
     borderBottomColor: '#008080',
     marginBottom: 30
   }
});