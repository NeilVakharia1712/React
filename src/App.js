import React, { useEffect, useState } from 'react';
import { Grid, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { Checkbox } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Fab from '@material-ui/core/Fab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';


class CartListItem extends React.Component {
  render() {
    const product = this.props.product;
    return (
      <Card style = {{marginLeft: '10%' , marginTop: '5%' , width: '80%', height:'20%'}}>
          <img src={`./data/products/${product.sku}_1.jpg`} alt='' style={{height: '30%', width: '40%'}}/>
          <h4 style = {{marginLeft: '40%' , marginTop: '-30%'}}>{product.title}</h4> 
          <h5 style = {{marginLeft: '40%' , marginTop: '-5%'}}>{'$' + product.price}</h5> 
          <Button style ={{float: 'right'}}>
            <DeleteIcon style={{color: 'black'}}/>
          </Button>
        </Card>
    );
  };
}

class Cart extends React.Component {

  checkout = (cartItems) => {
    alert(this.subtotal(cartItems)); 
  }

  subtotal = (cartItems) => {
    return new String("Subtotal: $" + cartItems.reduce((a, b) => a + b.price, 0));
  }

  render() {
    const cartItems = this.props.cartItems;
    const setCartItems = this.props.setCartItems; 
    return (
      <div style={{padding: '1%', width: '30%', height: '100%', marginLeft: '70%', float: 'right', color: 'white', backgroundColor: "#161616", outlineColor: "black"}} >
        <div style={{width: '100%', height: '10%', textAlign:'center'}}><h2>Cart</h2></div>
        <List style={{maxHeight: '70%', overflow: 'auto'}} component="nav">
          {cartItems.map(product => <CartListItem product={product}></CartListItem>)}
        </List>
        <div style={{width: '100%', height: '10%', textAlign:'center'}}><h2>{this.subtotal(cartItems)}</h2></div>
        <div><IconButton onClick = {() => this.checkout(cartItems)} variant="contained" style = {{background: 'white' , margin: '0 auto', display: 'block', color: 'black'}}>
          Checkout
        </IconButton></div>
      </div>
    );
  }

}

class CartLogo extends React.Component {
  render() {
    const clickHandler = this.props.clickHandler; 
    return(
      <IconButton onClick = {clickHandler} style={{float: 'right' , background: 'black', color: 'white'}}>
        <ShoppingCartIcon />
      </IconButton>
    );
  }
};






class CardGrid extends React.Component
{
  addToCart = (setCartItems, cartItems, product) => {
    cartItems.push(product);
    setCartItems(cartItems);
  }
  render()
  {
    const product = this.props.product
    const cartItems = this.props.cartItems; 
    const setCartItems = this.props.setCartItems; 
    return(
    <Card style = {{textAlign: 'center', width: '15%', margin: '6%'}}>
    <img src={`./data/products/${product.sku}_2.jpg`}alt = '' />
    <h5>{product.title}</h5>
    <h5>${product.price}</h5>
    <ButtonGroup size = "large">
    <IconButton onClick = {() => this.addToCart(setCartItems, cartItems, product)} style ={{marginBottom:'5%', background:'black', textAlign:'center', color: 'white', heigh:'20px', widt:'80%' }}> Add To Cart</IconButton>
    </ButtonGroup>
    </Card>
    )
  }

}

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  const [isCartOpen, setIsCartOpen] = useState('cartOpen');
  const [cartItems, setCartItems] = useState([]); 
  useEffect(() => {
    setIsCartOpen(false);
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);
  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };


  return (
    <div>
    <CartLogo clickHandler = {handleCartOpen}></CartLogo>
    <Modal open={isCartOpen} onClose={handleCartClose}>
      {<Cart cartItems = {cartItems} setCartItems = {setCartItems}></Cart>}
    </Modal>
    <Grid style={{marginLeft:'5%' , marginRight: '5%' , height: '100%', width: '90%'}} container>
      
      <Grid style={{width: '85%', marginTop: '0%'}} container spacing={10} justify="center"  >
        {products.map(product => <CardGrid cartItems = {cartItems} setCartItems = {setCartItems} product={product}>{product.title}</CardGrid>)}
      </Grid>
    </Grid>
    </div>


  );
};

export default App;