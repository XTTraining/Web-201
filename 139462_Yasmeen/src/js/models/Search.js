import firebase from 'firebase';
import config from '../config';
const ref = firebase.database().ref();
import { elements } from 'base';
'use strict';


export default class Search {
    constructor() {
        //this.query =query;
    }


    async find(searchTerm) {
        const  eventref  =  firebase.database().ref();
        const  snapshot  =  await  eventref.once('value');
        const  value  =  snapshot.val();
        this.foodItems = value.Items;
        this.categories = value.categories
    }
   
    filterBycategoryName(itemList, categoryList, selectedList, searchQry)
    {
        var filteredItems = [];
        var categoryListArr = [];
        var itemListArr = [];
        if(selectedList.length > 0)
        {
           categoryList.forEach(function(el){   
                selectedList.forEach(val =>{
                    if (el.categoryId === val) 
                    categoryListArr.push(el);
                }); 
            });
        }
        else{
            categoryListArr = categoryList;  
        }
        if(searchQry.length > 0)
        {
             searchQry = searchQry.toLowerCase();
             itemListArr =  itemList.filter(function(el){
             return (el.Name.toLowerCase()).indexOf(searchQry) > -1 ;
            });   
        }
        else{
            itemListArr = itemList;
        }
        categoryListArr.forEach(el => {
            var item = {};
            item.categoryName = el.Name;

            let listArr = itemListArr.filter(function(val)
            {      
                return (val.categoryId === el.categoryId);
            });
            item.list = listArr;

            if(item.list.length > 0){
                filteredItems.push(item);
            }  
        });
        this.filteredItems = filteredItems;
       return filteredItems;
    }
}

