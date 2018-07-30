import firebase from 'firebase';
import 'firebase/database';
import * as constant from '../views/config';


var config = {
    apiKey: constant.apiKey,
    authDomain: constant.authDomain,
    databaseURL: constant.databaseURL,
    projectId: constant.projectId,
    storageBucket: constant.storageBucket,
    messagingSenderId: constant.messagingSenderId
};
firebase.initializeApp(config);

