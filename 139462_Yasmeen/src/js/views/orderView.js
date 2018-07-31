export const  bindOrderDetails = (orderObj, selector, selector_template) =>{
    // $(selector).html("");
    Handlebars.registerHelper("multiply", function(qty,price) {
        let calculatedPrice = qty * price;
        return calculatedPrice;
      });
    // var theTemplateScript = $("#order-template").html();
    var theTemplateScript = $(selector_template).html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    var context = orderObj;

    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);
    
    // Add the compiled html to the page
    $(selector).html(theCompiledHtml);
}
export const showEmptyCart = ()=> {
    $('.emptycart').show();
    $('.cart_buttons').hide();
    $('.cart').hide();
    $('.cart_btn').hide();
}
export const hideEmptyCart = ()=> {
    $('.emptycart').hide();
    $('.cart_buttons').show();
    $('.cart_btn').show();
    $('.cart').show();
}