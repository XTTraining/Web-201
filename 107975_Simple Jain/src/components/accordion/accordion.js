import Cart from '../cart/cart';
const url = 'http://localhost:3000/products';

export default class Accordion {
    
    constructor() {
        this.cartObj = new Cart();
    }

    init() {
        this.getData(url, this);
    }

    createNode(element) {
        return document.createElement(element);
    }

    append(parent, el) {
        return parent.appendChild(el);
    }

    getData(url) {
        let wrapper;
        let _this = this;

        return fetch(url)
            .then((response) => response.json())
            .then(function (products) {

                localStorage.setItem('products', JSON.stringify(products));

                const uniKeys = [...(new Set(products.map(({
                    Category
                }) => Category)))];

                let parentWrapper = document.getElementById("accordion__items");

                if(parentWrapper!=null && parentWrapper!=undefined){

                    parentWrapper.innerHTML="";

                    return uniKeys.forEach(x => {
    
                        _this.createAccordionItem(x, parentWrapper);
    
                        let category = String(x).replace(" ", "-").toLowerCase();
                        category = "cards__" + category;
    
                        wrapper = document.getElementById(category);
    
                        let productList = products.filter(product => product.Category == x);
    
                        return _this.cartObj.createProducts(productList, wrapper);
    
                    })
                }
            })
            .then(() => {
                _this.cartObj.bindEvents();
                _this.cartObj.init();
                _this.cartObj.getProducts();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    
    createAccordionItem(category,parentWrapper) {

        let id = `check__${String(category).replace(" ", "-").toLowerCase()}`;
        let divId = `cards__${String(category).replace(" ", "-").toLowerCase()}`;

        let li = this.createNode('li'),
            label = this.createNode('label'),
            em = this.createNode('em'),
            h2 = this.createNode('h2'),
            divParent = this.createNode('div'),
            divChild = this.createNode('div');

        label.setAttribute("for", id);
        h2.className = "heading-secondary";
        h2.innerHTML = category;
        divParent.className = "accordion__item";
        divChild.className = "cards";
        divChild.id = divId;

        // Append all our elements
        li.innerHTML = `<input type="checkbox" id="${id}" checked>`;
        this.append(divParent, divChild);
        this.append(li, label);
        this.append(li, em);
        this.append(li, h2);
        this.append(li, divParent);

        this.append(parentWrapper, li);
    }
}