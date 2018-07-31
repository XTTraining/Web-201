export default class Cart {

  constructor() {
    this.cart = (JSON.parse(localStorage.getItem('cart')) != null) ?
      JSON.parse(localStorage.getItem('cart')) : {
        items: []
      }
  }

  init() {
    let items = 0

    this.products = JSON.parse(localStorage.getItem('products'));

    if (undefined != this.products && this.products.length > 0) {
      this.products.forEach(item => {
        let productId = 'product__cart__quantity-' + item.ProductId;
        let lblcart__quantity = document.getElementById(productId);

        if (lblcart__quantity != undefined) {
          lblcart__quantity.parentNode.setAttribute("style", "opacity:0");
        }
      });
    }

    if (undefined != this.cart && undefined != this.cart.items && this.cart.items != null &&
      this.cart.items != '' && this.cart.items.length > 0) {
      this.cart.items.forEach(item => {
        items = (items + item.quantity);
        let productId = 'product__cart__quantity-' + item.ProductId;
        let lblcart__quantity = document.getElementById(productId);

        if (lblcart__quantity != undefined) {
          lblcart__quantity.innerHTML = item.quantity;
          lblcart__quantity.parentNode.setAttribute("style", "opacity:1");
        }
      });
    }
    $('#totalItems').text(items);
  }

  //Method used to fetch products from server and bind as per Category in Accordion
  createProducts(products = [], parent = "") {

    let wrapper, content = '';
    wrapper = $(parent)

    if (wrapper != null && wrapper != undefined) {
      products.forEach(product => {
        if (product.Stock > 0) {
          content += `<div class="card">
          <img src="${product.ProductImage}" alt="${product.ProductName}" class="card__img">
          <h3 class="card__name">${product.ProductName}</h3>
          <div class="card__serving">
              <svg>
                  <use xlink:href="assets/img/sprite.svg#icon-expand"></use>
              </svg>
              <p>325 m
                  <sup>2</sup>
              </p>
          </div>
          <div class="card__price">
              <svg>
                  <use xlink:href="assets/img/sprite.svg#icon-key"></use>
              </svg>
              <p>$${product.Price}</p>
          </div>
          <div class="card__quantity__group">
              <div class="product__calc card__quantity">
                  <label for="txtQuantity-${product.ProductId}" class="lblQuantity">Quantity:</label>
                  <div class="product__quantity">
                      <span class="quantity-minus">-</span>
                      <input id="txtQuantity-${product.ProductId}" min="1" 
                      Max="${product.Max}" class="quantity" value="1" type="text" disabled>
                      <span class="quantity-plus">+</span>
                  </div>
              </div>
              <button class="btn btn--green card__btn add--to--cart" data-attr-id="${product.ProductId}">Add</button>
              <label class="lblProductQuantity">
                      You have <span id="product__cart__quantity-${product.ProductId}"></span> item(s) in your basket</label>
          </div>
          </div>`;
        }
      });
      wrapper.html(content);
    }
  }

  createCart() {
    let wrapperDiv, wrapperFooter, content = '',
      footerContent = '',
      disableQty = false;
    let total = 0,
      subTotal = 0,
      taxAmount = 0;

    wrapperDiv = $("#cart_items");

    if (typeof wrapperDiv !== typeof undefined && wrapperDiv !== null && wrapperDiv.val() !== undefined) {
      disableQty = false;
    } else {
      wrapperDiv = $("#cart__payment");
      disableQty = true;
    }

    wrapperFooter = $(".cart__calc");

    console.log(disableQty);

    let _this = this;

    let products = this.cart;

    if (wrapperDiv != null && wrapperDiv != undefined && products != null &&
      products.items != null &&
      products.items != '' && products.items.length > 0) {

      wrapperDiv.innerHTML = "";

      products.items.forEach(product => {
        let productTotal = (product.quantity * product.Price);
        subTotal += productTotal;
        taxAmount += (product.quantity * product.Price * product.Tax) / 100;
        total = subTotal + taxAmount;

        content += ` <article class="product">
                        <header class="product__image">
                            <div>
                                <img src="${product.ProductImage}" alt="${product.ProductName}">`;

        if(!disableQty){
          content += `<a class="remove" data-attr-id="${product.ProductId}">
                          <h3>
                              Remove product
                          </h3>
                      </a>`;
        }
        content += `</div>
            </header>
            <div class="product__section">
                <div class="product__details">
                    <div class="product__title">${product.ProductName}</div>
                    <p class="product__description">${product.ProductDescription}</p>
                    <p class="product__GST">GST : ${product.Tax}%</p>
                </div>
                <div class="product__calc">`

                if(!disableQty){
                  content +=`<div class="product__quantity">
                              <span class="quantity-minus">-</span>
                              <input id="txtQuantity-${product.ProductId}"
                              min="1" max="${product.Max}" class="quantity" 
                              value="${product.quantity}" type="text" disabled>
                              <span class="quantity-plus" data-attr-addToCart="true"
                              data-attr-id="${product.ProductId}">+</span>
                            </div>`;
                }
                else{
                  content += `<div class="product__quantity">
                                <input id="txtQuantity-${product.ProductId}"
                                  min="1" max="${product.Max}" class="quantity" 
                                  value="${product.quantity}" type="text" disabled>
                              </div>`
                }
                   
                content +=  `<h2 class="price">
                    ${product.Price}
                    </h2>
                    <h2 class="full-price">
                    ${productTotal}
                    </h2>
                </div>
            </div>
          </article>`
      });
      wrapperDiv.html(content);

      if (subTotal > 0) {
        footerContent = `<div class="cart__amount">
                        <div class="subtotal">Subtotal:
                            <span>${subTotal}</span>
                        </div>
                        <div class="tax">Taxes :
                            <span>${taxAmount}</span>
                        </div>
                    </div>
                    <div class="cart__total">
                        <div class="total">Total:
                            <span>${total}</span>
                        </div>
                        <a class="btn btn--green checkout" href="payment.html">Proceed to payment</a>
                    </div>`

        wrapperFooter.html(footerContent);
      }
    }
  }

  searchProd(product, cartquantity) {
    let curProd = this.cart.items.find(item => item.ProductId === product.ProductId);
    if (undefined != curProd && curProd != null) {
      let quantity = parseInt(curProd.quantity + cartquantity);

      if (quantity <= product.Stock) {
        curProd.quantity = quantity;
      } else {
        alert('Can not add more than this product');
      }
    } else {
      let prod = {
        ProductId: product.ProductId,
        quantity: cartquantity,
        ProductName: product.ProductName,
        ProductDescription: product.ProductDescription,
        Price: product.Price,
        ProductImage: product.ProductImage,
        available: product.Stock,
        Tax: product.Tax,
        Max: product.Max
      }
      this.cart.items.push(prod);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.init();
    this.getProducts();
    this.updatePayForm();
  }

  addToCart(id, diffQuantity) {
    let products = JSON.parse(localStorage.getItem('products'));
    let product = products.find(item => item.ProductId == id);

    let cartquantity = document.getElementById('txtQuantity-' + id).value;

    if (diffQuantity) {
      cartquantity += 1;
    }

    if (cartquantity <= product.Stock) {
      if (undefined != product) {
        if (cartquantity > 0) {
          if (diffQuantity) {
            cartquantity = 1;
          }
          setTimeout(() => {
            this.searchProd(product, parseInt(cartquantity), product.name,
              product.price, product.img, product.stock);
          }, 1000)
          return true;
        } else {
          alert('Only quantities greater than zero are allowed');
        }
      } else {
        alert('Oops! Something bad happened, try again later');
      }
    } else {
      alert('Can not add more of this product');
    }
    return false;
  }


  getProducts() {
    let msg = '',
      wrapper = $('.cart'),
      total = 0
    wrapper.html('')

    if (undefined == this.cart || null == this.cart || this.cart == '' || this.cart.items.length == 0) {
      wrapper.html('<li>Your basket is empty</li>');
      $('.cart').css('left', '-400%')
    } else {

      var items = '';
      this.cart.items.forEach(item => {
        total = total + (item.quantity * item.Price)
        items += `<li><img src="${item.ProductImage}" alt="${item.ProductName}"  />
                      <h3 class="title">${item.ProductName} <br/>
                          <span class="price">${item.quantity} x $ ${item.Price} </span> 
                          <button class="btn--minus" data-attr-id="${item.ProductId}" data-attr-available ="${item.available}">
                            <span>-</span>
                          </button> 
                          <button class="btn--remove" data-attr-id="${item.ProductId}">
                          <span>x</span></button>
                      </h3>
                  </li>`
      });

      items += `<li id="total"><span>Total : $  ${parseFloat(total).toFixed(2)}</span> <div id="submitForm"></div></li>`
      wrapper.html(items)

      this.bindNavCartEvents();
    }
  }

  delete(id) {
    var curProd = this.cart.items.find(item => item.ProductId === id)

    const index = this.cart.items.indexOf(curProd);

    if (index !== -1) {
      this.cart.items.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(this.cart))
    this.init()
    this.getProducts()
    this.updatePayForm()
  }

  deleteProd(id, remove) {
    if (undefined != id && id > 0) {
      if (remove == true) {
        this.delete(id)
      } else {
        var confirmation = confirm('Do you want to remove this product?')
        if (confirmation) {
          this.delete(id)
        }
      }
    }
  }

  updatePayForm() {
    var statics = `<form action="https://www.paypal.com/cgi-bin/webscr" method="post">
                    <input type="hidden" name="cmd" value="_cart">
                    <input type="hidden" name="upload" value="1">
                    <input type="hidden" name="currency_code" value="USD" />
                    <input type="hidden" name="business" value="${ business_paypal }">`,
      dynamic = '',
      wrapper = $('#submitForm')

    wrapper.html('')

    if (undefined != this.cart && null != this.cart && this.cart != '') {
      var i = 1;
      this.cart.items.forEach(item => {
        dynamic += `<input type="hidden" name="item_name_${i}" value="${item.name}"/>
                    <input type="hidden" name="amount_${i}" value="${item.price}" />
                    <input type="hidden" name="item_number_${i}" value="${item.ProductId}" />
                    <input type="hidden" name="quantity_${i}" value="${item.quantity}" />`
        i++;
      })

      statics += `${dynamic}<button type="submit" class="btn btn--xs-small btn--white pay">Checkout &nbsp;</button></form>`
      wrapper.html(statics)
    }
  }

  changeVal(el) {
    var quantity = parseFloat(el.parent().children(".quantity")[0].value);
    var price = parseFloat(el.parent().parent().children(".price").html());
    var eq = Math.round(price * quantity * 100) / 100;

    el.parent().parent().children(".full-price").html(eq);

    this.changeTotal();
  }

  changeTotal() {

    var price = 0;

    $(".full-price").each(function (index) {
      price += parseFloat($(".full-price").eq(index).html());
    });

    price = Math.round(price * 100) / 100;
    var tax = Math.round(price * 0.05 * 100) / 100
    var shipping = parseFloat($(".shipping span").html());
    var fullPrice = Math.round((price + tax + shipping) * 100) / 100;

    if (price == 0) {
      fullPrice = 0;
    }

    $(".subtotal span").html(price);
    $(".tax span").html(tax);
    $(".total span").html(fullPrice);
  }


  bindNavCartEvents() {

    let _this = this;

    $(".btn--minus").click(function () {
      let id = $(this).attr("data-attr-id"),
        available = $(this).attr("data-attr-available")
      _this.updateItem(id, available);
    });

    $(".btn--remove").click(function () {
      let id = $(this).attr("data-attr-id");
      _this.deleteProd(id);
    });

    $(".remove").click(function () {
      let id = $(this).attr("data-attr-id");
      _this.deleteProd(id);
    });

  }

  bindEvents() {

    let _this = this;

    $(".add--to--cart").click(function () {
      var id = $(this).attr("data-attr-id");
      _this.addToCart(id);
    });

    $(".remove").click(function () {
      var el = $(this);
      el.parent().parent().parent().addClass("removed");
      window.setTimeout(
        function () {
          el.parent().parent().parent().slideUp('fast', function () {
            el.parent().parent().parent().remove();
            if ($(".product").length == 0) {
              if (check) {
                $(".cart").html("<h1>The shop does not function, yet!</h1>");
              } else {
                $(".cart").html("<h1>No products!</h1>");
              }
            }
            changeTotal();
          });
        }, 200);
    });

    $(".quantity-minus").click(function () {
      var child = $(this).parent().children(".quantity")[0];

      if (child != undefined) {
        if (parseInt(child.value) > 1) {
          child.value = parseInt(child.value) - 1;
        }

        $(this).parent().parent().children(".full-price").addClass("minused");

        var el = $(this);
        window.setTimeout(() => {
          el.parent().parent().children(".full-price").removeClass("minused");
          _this.changeVal(el);
        }, 150);
      }
    });

    $(".quantity-plus").click(function () {

      var child = $(this).parent().children(".quantity")[0];
      let changeQty = true;

      var addToCart = $(this).attr("data-attr-addToCart");
      var id = $(this).attr("data-attr-id");

      if (child != undefined) {

        if (addToCart) {
          changeQty = _this.addToCart(id, true);
        }

        if (changeQty) {
          child.value = parseInt(child.value) + 1;

          $(this).parent().parent().children(".full-price").addClass("added");

          var el = $(this);
          window.setTimeout(() => {
            el.parent().parent().children(".full-price").removeClass("added");
            _this.changeVal(el);
          }, 150);
        }
      }
    });

    $(".logo__cart__link").click(() => {
      $(".cart").css("display", "block");
    });



  }

  updateItem(id, available) {
    let curProd = this.cart.items.find(item => item.ProductId == id)

    curProd.quantity = curProd.quantity - 1;

    if (curProd.quantity > 0) {
      localStorage.setItem('cart', JSON.stringify(this.cart))
      this.init()
      this.getProducts()
      this.updatePayForm()
    } else {
      this.deleteProd(id, true)
    }
  }


  addQuantity(el) {

    var child = el.parent().children(".quantity")[0];

    if (child != undefined) {
      child.value = parseInt(child.value) + 1;

      el.parent().parent().children(".full-price").addClass("added");

      window.setTimeout(function () {
        el.parent().parent().children(".full-price").removeClass("added");
        changeVal(el);
      }, 150);
    }
  }

  reduceQuantity(el) {

    alert(el);
    /* 
        var child = $(el);
        if (child != undefined) {
          if (parseInt(child.value) > 1) {
            child.value = parseInt(child.value) - 1;
          } 

          el.parent().parent().children(".full-price").addClass("minused");

                window.setTimeout(function () {
            el.parent().parent().children(".full-price").removeClass("minused");
            changeVal(el);
          }, 150); 
        }*/
  }
}