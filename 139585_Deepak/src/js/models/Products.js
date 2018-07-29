import * as firebase from 'firebase/app';
import 'firebase/database';
import {
    firebaseConfig
} from '../config';
//const firebaseConfig = {
//        apiKey: "AIzaSyBMtE-rGdpW8rBCdv2BDnNKiOpUdkv2jvY",
//        authDomain: "foodapp-ebcc7.firebaseapp.com",
//        databaseURL: "https://foodapp-ebcc7.firebaseio.com",
//        projectId: "foodapp-ebcc7",
//        storageBucket: "foodapp-ebcc7.appspot.com",
//        messagingSenderId: "93558983893"
//    };
export default class Products {
    constructor() {}

    async getFirebaseData() {
        try {
            var _this = this;
            firebase.initializeApp(firebaseConfig);
            var firebaseRef = firebase.database().ref();
            const fData = await firebaseRef.once("value",  function (data)  {
                _this.data = data.val();
                console.log(data.val());
            },  function  (error)  {
                console.log("Error: "  +  error.code);
            });
        } catch (error) {
            console.log(`Error in Products->getFirebaseData: ${error}`);
        }
//        return Promise.resolve();
    }

    persistData() {
        localStorage.setItem('fire', JSON.stringify(this.data));
    }
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('fire'));
        if(storage) this.data = storage;
    }
}
