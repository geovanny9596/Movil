import {useEffect, useState, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Swal from 'react-native-sweet-alert';
import openMap from 'react-native-open-maps';

export const viajeProg = async (id) => {
    const resp = await axios.get( `https://maxbri.com.mx/App/ViajesActuales.php?idc=${id}`);
    //const resp = await axios.get( `http://192.168.1.77/ViajesActuales.php?idc=${id}`);
    return resp.data;
}

export const abrirMaps = async (edo, id, via, ini, fin, tarifa) => {
    if (edo == 'Recoger Cliente') {
//        fin = ;
//        console.log(fin);
        viaje_btn(false);
        getInfo('currLoc').then((ubic)=> {
            openMap({ start:ubic.lat+','+ubic.lon, end:ini});
        })
    }
    else if (edo == 'Iniciar Viaje') {
        viaje_btn(true);
        openMap({ start:ini, end:fin});
    }
    else if (edo == 'Finalizar Viaje') {
        Swal.showAlertWithOptions({
            title: '¡Viaje Finalizado',
            subTitle: 'Tarifa: '+tarifa,
            confirmButtonTitle: 'OK',
            confirmButtonColor: '#000',
            otherButtonTitle: 'Cancel',
            otherButtonColor: '#dedede',
            style: 'success',
            cancellable: false
          });
        viaje_btn(null);
        await axios.get( `https://maxbri.com.mx/App/StatViaje.php?idc=${id}&via=${via}`); 
        //axios.get( `http://192.168.1.77/StatViaje.php?idc=${id}&via=${via}`); 
    }
}

export const rptUbic = async (lt, ln) => {
    id = await AsyncStorage.getItem('id');
    await axios.get( `https://maxbri.com.mx/App/UpLoc.php?idc=${id}&lt=${lt}&ln=${ln}`); 
    //axios.get( `http://192.168.1.77/UpLoc.php?idc=${id}&lt=${lt}&ln=${ln}`); 
}

 export const viaje_btn = (proceso) => {
    //AsyncStorage.removeItem('viaje');
//    viatemp = JSON.stringify({'via' : proceso});
    if (proceso != null)
    saveInfo('viaje',{'via' : proceso});
    else 
    AsyncStorage.removeItem('viaje');
}

export const saveInfo = async (item, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(item, jsonValue);
    }
    catch (e) {        
    }
}

export const getInfo = async (item) =>{
    try {
        const jsonValue = await AsyncStorage.getItem(item);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      }
      catch (e) {
      }
  }