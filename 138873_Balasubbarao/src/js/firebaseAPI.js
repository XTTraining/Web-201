import { config } from './base';
const firebase = require("firebase");

require("firebase/firestore/dist/index.cjs");

//FIRE STORE API - ADD, UPDATE, SET AND DELETE DOCUMENTS.
export default class FirestoreAPI {

    //INIT  THE FIREBASE APP- BY PASSING APIKEY, AUTHDOMAIN AND PROJECTID.
    constructor() {
        firebase.initializeApp({
            apiKey: config.apiKey,
            authDomain: config.authDomain,
            projectId: config.projectId
        });
        //UPDATE THE FIREBASE SETTINGS WITH TAMPSTAMP SANPSHOTS.
        this._db = firebase.firestore();
        const settings = { timestampsInSnapshots: true };
        this._db.settings(settings);
    }

    //GET DOC
    //collectionName - FIRESTORE COLLECTION NAME.
    //docName - DOCUMENT NAME.
    async getItem(collectionName, docName) {
        let data;
        await this._db.collection(collectionName).doc(docName).get().then(function (doc) {
            data = { "docId": doc.id, "data": doc.data() };
        }).catch(function (error) {

        });
        return data;
    }
    //ADD DOC
    //collectionName - FIRESTORE COLLECTION NAME.
    //docData - JSON DATA OF DOCUMENT.
    addItem(collectionName, docData) {
        this._db.collection(collectionName).add(docData).then(function (docRef) {

        }).catch(function (error) {

        });
    }

    //SET DOC
    //collectionName - FIRESTORE COLLECTION NAME.
    //docName - DOCUMENT NAME.
    //docData - JSON DATA OF DOCUMENT.
    addItem(collectionName, docName, docData) {
        this._db.collection(collectionName).doc(docName).set(docData).then(function (docRef) {

        }).catch(function (error) {

        });
    }

    //GET ITEM
    //collectionName - FIRESTORE COLLECTION NAME.
    //docName - DOCUMENT NAME.
    deleteItem(collectionName, docName) {
        this._db.collection(collectionName).doc(docName).delete().then(function (docRef) {

        }).catch(function (error) {

        });
    }

    //LIST METHOD.
    //collectionName - FIRESTORE COLLECTION NAME.
    async list(collectionName) {
        let result = [];
        await this._db.collection(collectionName).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                result.push({ "docId": doc.id, "data": doc.data() });
            });
        });

        return result;
    }
}







