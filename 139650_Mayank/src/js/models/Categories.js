
import firebase from 'firebase';


export default class Categories {

    async getAllCategories() {
        try {
            if (this.result == null) {
                const eventref = firebase.database().ref('Category');
                const snapshot = await eventref.once('value');
                const value = snapshot.val();
                this.result = value;
                this.persistCatData();
            }
            else{
                this.readCatStorage();
            }

        }
        catch (error) {
            console.log(`Categories Model:${error}`);
        }
    }

    persistCatData() {
        localStorage.setItem('catData', JSON.stringify(this.result));
    }


    readCatStorage() {
        const storage = JSON.parse(localStorage.getItem('catData'));
        // Restoring likes from the localStorage
        if (storage) this.result = storage;

    }


}

