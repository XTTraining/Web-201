import axios from 'axios';
import {servicePath} from './config'

export default class MenuItem {


    async getMenuItems() {
        try {
            const res = await axios(servicePath);
                    console.log(res);
           
            this.menuItems = res.data.map(element => { 
                console.log('in');
           return  {
            
            id:element.id,
            title : element.title,
            description : element.description,
            currency : element.currency,
            photoLarge :element.photoLarge,
            price : element.price,
            photoSmall : element.photoSmall,
            foodType : element.foodType 
           } 
        });
        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
        console.log("items");
        console.log(this);
    }
//  getMenuItems() {
//      console.log('in')
//    var prom=   fetch(servicePath)
//                 .then(res=>{console.log('json()');res.json()})
//                 .then(data=>data.map(element => { 
//                     console.log('in');
//                return  {
//                 title : element.title,
//                 description : element.description,
//                 currency : element.currency,
//                 photoLarge :element.photoLarge,
//                 price : element.price,
//                } 
//               }))
//               .catch(function (error) {
//                 // handle error
//             console.log(error);
//         })
//         prom.resolve();
//         console.log('out');
// }

}//class end     console.log('test');
        
                
