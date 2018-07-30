import {
    CartItem
} from '../models/CartItem';
import React from "react";

export class CartItemComponent extends React.Component{
    
     constructor(props) {
         super(props);
         this.state = {
             cartitem: props.cartitem
         };
     }
    
     getItemAvailableSizes(cartitem) {
        const size = 'size-'+cartitem.id;
        return(
                <span className="label">
            {cartitem.item.price.h !== undefined ? (
                    <span>
                        <label>H</label>
                        <input onChange={this.handleSizeChange.bind(this)} type='radio' name={size} value='h' className='halfSize' defaultChecked={cartitem.size === 'h'} />
                    </span>
                ):('')}
                {cartitem.item.price.f !== undefined ? (
                    <span>
                        <label>F</label><input type='radio' onChange={this.handleSizeChange.bind(this)} name={size} value='f' className='fullSize' defaultChecked={cartitem.size === 'f'} />
                    </span>
                ):('')}
                </span>
        );
    }
    
    handleSizeChange(e){
        const cartitem = this.state.cartitem;
        let tmp = new CartItem(cartitem.item, cartitem.id, e.target.value, cartitem.qty, cartitem.time);
        
        this.setState({
           cartitem: tmp
        });
        this.props.updatecart(tmp);
    }
    
    handleQtyChange(e) {
        e.preventDefault();
        const cartitem = this.state.cartitem;
        let tmp = null;
        if(e.target.className == 'increase-qty' && parseInt(cartitem.qty) < 5){
            tmp = new CartItem(cartitem.item, cartitem.id, cartitem.size, (parseInt(cartitem.qty) + 1), cartitem.time);
        }
        else if(e.target.className == 'reduce-qty' && parseInt(cartitem.qty) > 0){
            tmp = new CartItem(cartitem.item, cartitem.id, cartitem.size, (parseInt(cartitem.qty) - 1), cartitem.time);
        }
        if(tmp != null)
        {
            this.setState({
            cartitem: tmp
            });
        }
        this.props.updatecart(tmp);
    }
    
    handleRemove(e) {
        e.preventDefault();
        this.props.updatecart(this.state.cartitem, true);
        this.setState({
            cartitem: null
        });
    }

    render(){
        const flag = this.state.cartitem != null;
        if(flag)
        { 
        return (
            <li>
                <div className='cart-item' data-cart-id={this.state.cartitem.id} data-item-id={this.state.cartitem.item.id}>
                        <div className='cart-item-img'>
                            <div>
                                <img lazy-img-src={this.state.cartitem.item.imgsrc} src={loaderbase64} alt={this.state.cartitem.item.name} img-loaded='false' />
                            </div>
                        </div>
                        <div className='cart-item-desc'>
                            <div>
                                <h3>{this.state.cartitem.item.name}</h3>
                            </div>
                            <div className='size-container'>
                                
                             
                                {this.getItemAvailableSizes(this.state.cartitem)}
                             
                                
                            </div>
                            <div className='item-price'>
                                 <span>₹{this.state.cartitem.price} * {this.state.cartitem.qty}</span> 
                            </div>

                        </div>
                        <div className='item-qty'>
                            <h4>
                                <span>
                                    <a className='reduce-qty' href='#' onClick={this.handleQtyChange.bind(this)}>-</a>
                                    <input type='text' className='item-qty' readOnly value={this.state.cartitem.qty}/>
                                    <a className='increase-qty' href='#' onClick={this.handleQtyChange.bind(this)}>+</a>
                                </span>
                            </h4>
                        </div>
                        <div className='remove-item'>
                            <button onClick={this.handleRemove.bind(this)}>REMOVE</button>
                        </div>
                    </div>
                </li>
        );
        } else 
        {
            return ('');
        }
    }
}

export default class CartItemsComponent extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
         
         const items = this.props.cartitems.map((cartitem) =>  <CartItemComponent updatecart={this.props.updatecart} cartitem={cartitem} key={cartitem.id} />);
         if(items.length > 0)
         {
         return (
                <ol>
                    {items}
                 </ol>       
           );  
         }
        else{
            return (
                <div class='auto-margin col-9'>
                <h3>Cart is empty!</h3> <a href='/index.html' style={{color:'blue'}}>Go back to Menu</a>
                </div>
            );
        }
    }
}

const loaderbase64 = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHdpZHRoPSI2NHB4IiBoZWlnaHQ9IjY0cHgiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBkPSJNNzEgMzkuMlYuNGE2My42IDYzLjYgMCAwIDEgMzMuOTYgMTQuNTdMNzcuNjggNDIuMjRhMjUuNTMgMjUuNTMgMCAwIDAtNi43LTMuMDN6IiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iI2UxZTFlMSIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgNjQgNjQpIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iI2UxZTFlMSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNjQgNjQpIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iI2UxZTFlMSIgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDY0IDY0KSIvPjxwYXRoIGQ9Ik03MSAzOS4yVi40YTYzLjYgNjMuNiAwIDAgMSAzMy45NiAxNC41N0w3Ny42OCA0Mi4yNGEyNS41MyAyNS41MyAwIDAgMC02LjctMy4wM3oiIGZpbGw9IiNiZWJlYmUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA2NCA2NCkiLz48cGF0aCBkPSJNNzEgMzkuMlYuNGE2My42IDYzLjYgMCAwIDEgMzMuOTYgMTQuNTdMNzcuNjggNDIuMjRhMjUuNTMgMjUuNTMgMCAwIDAtNi43LTMuMDN6IiBmaWxsPSIjOTc5Nzk3IiB0cmFuc2Zvcm09InJvdGF0ZSgyMjUgNjQgNjQpIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iIzZlNmU2ZSIgdHJhbnNmb3JtPSJyb3RhdGUoMjcwIDY0IDY0KSIvPjxwYXRoIGQ9Ik03MSAzOS4yVi40YTYzLjYgNjMuNiAwIDAgMSAzMy45NiAxNC41N0w3Ny42OCA0Mi4yNGEyNS41MyAyNS41MyAwIDAgMC02LjctMy4wM3oiIGZpbGw9IiMzYzNjM2MiIHRyYW5zZm9ybT0icm90YXRlKDMxNSA2NCA2NCkiLz48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgdmFsdWVzPSIwIDY0IDY0OzQ1IDY0IDY0OzkwIDY0IDY0OzEzNSA2NCA2NDsxODAgNjQgNjQ7MjI1IDY0IDY0OzI3MCA2NCA2NDszMTUgNjQgNjQiIGNhbGNNb2RlPSJkaXNjcmV0ZSIgZHVyPSI3MjBtcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2c+PGc+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iNjMuNjYiIGN5PSI2My4xNiIgcj0iMTIiLz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBkdXI9IjcyMG1zIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBrZXlUaW1lcz0iMDswLjU7MSIgdmFsdWVzPSIxOzA7MSIvPjwvZz48L3N2Zz4=';