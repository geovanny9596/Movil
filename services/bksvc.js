//import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getInfo} from './services';

module.exports = async (loc) => {
    id = await AsyncStorage.getItem('id');
    getInfo('currLoc').then((loc)=> {
        await axios.get( `http://192.168.1.77/UpLoc.php?idc=${id}&lt=${loc.lt}&ln=${loc.ln}`); 
    })
    // do stuff
};

//export const rptUbic = async (lt, ln) => {
//} 
