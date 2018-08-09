const $= require('jquery');
import { carousel,accordion } from './animation';
import { getFoodMenu,menuData } from './firebase';
import { getCookie,setCookie } from './cookies';
import { bindAccordion,bindOrder,bindCheckout,bindCartButton } from './bindHtml';

const cookieName="CartCookie";
const cookieExpiry=30;
$(document).ready(function(e){
    carousel();
    getFoodMenu();
    setTimeout(function(){         
        bindAccordion(menuData);  
        bindCartButton(getCookie(cookieName));      
        if($('.order-list').length>0)
        {
            let orderData=getCookie(cookieName);        
            if(orderData!="")
            {
                bindOrder(menuData,JSON.parse(orderData));
            }   
            else if(menuData==null||orderData=="")
            {
                $(".order-list").append("<a class='redirect-home' href=index.html>Continue Shopping</a>");
                return;
            }     
        }
     }, 2000);
     

    $(".features").on( "click", ".accordion", function(){
        const thisAccordion=this;   
        accordion(thisAccordion,e);
    });

    $(".container").on( "click", ".qtyplus", function(){
        let thisQty=$(this);
        let fieldName = thisQty.attr('field');  
        let thisQtyField= thisQty.parent().find('input[name='+fieldName+']');     
        let currentVal = parseInt(thisQtyField.val());

        if (!isNaN(currentVal) && currentVal < 5) {
            thisQtyField.val(currentVal+1);
        } else if(currentVal>=5){
            thisQtyField.val(5);
        } else {
            thisQtyField.val(0);
        }
    });

    $(".container").on( "click", ".qtyminus", function(){
        let thisQty=$(this);
        let fieldName = thisQty.attr('field');
        let thisQtyField= thisQty.parent().find('input[name='+fieldName+']'); 

        let currentVal = parseInt(thisQtyField.val());
        if (!isNaN(currentVal) && currentVal > 0) {
            thisQtyField.val(currentVal-1);
        }  else {
            thisQtyField.val(0);
        }
    });

    $(".features").on("click",".btn__cart",function(){

        let itemObject=new Object();
        let itemArray=[];
        let thisCart=$(this).parents(".panel-item");
        let cookieValue=getCookie(cookieName);

        itemObject.name=thisCart.find('.menu__name').html();
        itemObject.Id=thisCart.attr('data');
        itemObject.Parent=thisCart.attr('data-parent');
        itemObject.Qty=thisCart.find('.qty').val();
        itemObject.net=parseInt(thisCart.find('.price__tag').html().split('.')[1]);
        itemObject.tax=parseInt(thisCart.find('.price__tag').attr('data-tax'));
        
        if(itemObject.Id==="undefined" ||parseInt(itemObject.Id)===0 ||parseInt(itemObject.Qty)===0)
        {
            console.log("Wrong Input");
            return;
        }        

        if(cookieValue!="")
        {
            let flag=false;
            let cookieData=JSON.parse(cookieValue);
            for(let item in cookieData)
            {
                if(cookieData[item].Id===itemObject.Id)
                {
                    cookieData[item].Qty=parseInt(itemObject.Qty);
                    flag=true;
                }                
            }
            if(flag===false)
            {
                cookieData.push(itemObject);
            }
            itemArray=cookieData;
        }
        else
        {
            itemArray.push(itemObject);
        }

        setCookie(cookieName,JSON.stringify(itemArray),cookieExpiry);
        $(".cart__order i").attr('data-count',itemArray.length);
    });

    $(".features").on("click",".btn__buy",function(){
        let itemObject=new Object();
        let itemArray=[];
        let thisItem=$(this).parents(".panel-item");

        itemObject.name=thisItem.find('.menu__name').html();
        itemObject.Id=thisItem.attr('data');
        itemObject.Parent=thisItem.attr('data-parent');
        itemObject.Qty=thisItem.find('.qty').val();
        itemObject.net=itemObject.Qty*parseInt(thisItem.find('.price__tag').html().split('.')[1]);

        if(itemObject.Id==="undefined" ||parseInt(itemObject.Id)===0 ||parseInt(itemObject.Qty)===0)
        {
            console.log("Wrong Input");
            return;
        }
        itemArray.push(itemObject);
        setCookie(cookieName,JSON.stringify(itemArray),cookieExpiry);
        window.location.href='order.html';
    });    

    $(".order-list").on("click",".remove__btn",function(){
        let deleteItem=$(this).parents(".item").attr("data");
        let cookieValue=getCookie(cookieName);
        let itemArray=[];
        if(cookieValue!="")
        {            
            let cookieData=JSON.parse(cookieValue);
            for(let item in cookieData)
            {
                if(cookieData[item].Id!=deleteItem)
                {
                    itemArray.push(cookieData[item]);                    
                }                
            }            
        }        
        setCookie(cookieName,JSON.stringify(itemArray),cookieExpiry);
        bindOrder(menuData,JSON.parse(getCookie(cookieName)));
        bindCartButton(getCookie(cookieName));
    });

    $(".container").on("click",".item__qty",function(e){
        let target=$(e.target);
        let itemId=$(this).parents(".item").attr('data');
        let cookieValue=getCookie(cookieName);
        let itemArray=[];

        if(target.is('.qtyminus')) {
            let qtyVal=parseInt($(this).children(".qty").val());
            if(qtyVal===0)
            {
                $(this).children(".qty").val(1);
            }
            
            if(cookieValue!="")
            {            
                let cookieData=JSON.parse(cookieValue);
                for(let item in cookieData)
                {
                    if(cookieData[item].Id==itemId)
                    {                        
                        cookieData[item].Qty=qtyVal;                                           
                    } 
                    itemArray.push(cookieData[item]);                
                }                  
            }        
        
        }
        if(target.is('.qtyplus')) {
            let qtyVal=$(this).children(".qty").val();
            if(qtyVal>5)
            {
                $(this).children(".qty").val(1);
            }
            if(cookieValue!="")
            {            
                let cookieData=JSON.parse(cookieValue);
                for(let item in cookieData)
                {
                    if(cookieData[item].Id==itemId)
                    {                        
                        cookieData[item].Qty=qtyVal;                                           
                    } 
                    itemArray.push(cookieData[item]);                
                } 
            }   
        }

        setCookie(cookieName,JSON.stringify(itemArray),cookieExpiry);
        bindOrder(menuData,JSON.parse(getCookie(cookieName)));
        
    });

    $(".container").on("click",".total__order__place",function(){
        $(".order-list").attr("style","display:none");
        $(".final__checkout").removeAttr('style');
        let orderData=getCookie(cookieName);        
        if(orderData!="")
        {
            bindCheckout(JSON.parse(orderData));
        }         
    });

    $(".container").on("click",".btn__submit",function(){
        $(".order-list").removeAttr('style');
        $(".final__checkout").attr('style',"display:none");
        $(".order-list").children().remove();
        $(".order-list").append("<span class='success__order'>Your order successfully submitted.</span>");
    });

    $(".search").on("click",".search__button",function(){
        let searchText=$(".search__text").val();
        bindAccordion(menuData,searchText);
    });

    $(".search").on("keypress",".search__text",function(e){
        
        if (e.which == 13) {
            let searchText=$(".search__text").val();
            bindAccordion(menuData,searchText);
        }
    });
});








