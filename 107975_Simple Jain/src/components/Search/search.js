import AccordionObj from '../accordion/accordion';
export default class Search {

    constructor() {
        this.accordionObj = new AccordionObj();
        this.accordionObj.init();
    }

    init() {
        $('#search').each(function() {
            this.products = JSON.parse(localStorage.getItem('products'));
           let availableProducts = this.products.map(product => {
                return product.ProductName
            });

            $(this).autocomplete({
                source: availableProducts
            }).on('focus', function () {
                $(this).autocomplete('search', ' ');
            }).on('search', function () {
                if ($(this).val() === '') {
                    $(this).autocomplete('search', ' ');
                }
            });
        });

        $("#btn--search").click((e)=>{
            e.preventDefault();
            e.stopPropagation();

            let type="";

            if($("#filter__veg").is(":checked") && $("#filter__non-veg").is(":not(:checked)")){
                type=$("#filter__veg").val();
            }
            else if($("#filter__non-veg").is(":checked") && $("#filter__veg").is(":not(:checked)"))
            {
                type=$("#filter__non-veg").val();
            }
            let filterUrl= 'http://localhost:3000/products"?q='+ $('#search').val();

            if(type!=="")
            {
                filterUrl='http://localhost:3000/products?q='+ $('#search').val() + '&Type=' +  type;
            }

            this.accordionObj.getData(filterUrl);
        });
    }
}
  
const searchObj = new Search();
searchObj.init();
