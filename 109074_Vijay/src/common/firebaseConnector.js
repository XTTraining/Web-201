export default class firbaseConnector {

    constructor() {

    }

    clearDatabase() {
        app.auth().signInAnonymously().then(function () {
            var rootRef = app.database().ref('menu');
            //console.log(rootRef);
            return rootRef.remove();
        });
    }

    addItem(cat, name, img, desc, vergetarian, price) {
        app.auth().signInAnonymously().then(function () {
            //var rootRef= app.database().ref('user');
            // console.log(rootRef);
            // return rootRef.remove();
            var rootRef = app.database().ref();
            var postData = {
                name: name,
                imageurl: img,
                description: desc,
                vergetarian: vergetarian,
                price: price
            };
            var newPostKey = rootRef.push().key;
            console.log(newPostKey);
            var updates = {};
            updates['/menu/' + cat+'/items'+ '/' + newPostKey] = postData;

            return rootRef.update(updates).then(function () {
                console.log('values added');
            });
        });
    }

    getItems(callbackfunction) {
        app.auth().signInAnonymously().then(function () {
            //var rootRef= app.database().ref('user');
            // console.log(rootRef);
            // return rootRef.remove();
            var rootRef = app.database().ref();
            return rootRef.once("value").then(function (snapshsot) {
                callbackfunction(snapshsot.val());
            });
        });
    }
}