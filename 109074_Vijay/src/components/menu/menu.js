import firebaseConnector from '../../common/firebaseConnector';

export default class Menu{   
 
    constructor(getMenuHtml){
        var fbc = new firebaseConnector();
        this.menuitems = fbc.getItems(getMenuHtml);
    }     
    getMenu() {         
        return this.menuitems;
    }
}