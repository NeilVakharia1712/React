import React, { useEffect, useState } from 'react';
import { Grid, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { Checkbox } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

class CardGrid extends React.Component
{
  render()
  {
    const product = this.props.product
    return(
    <Card style = {{textAlign: 'center', width: '15%', margin: '5%'}}>
    <img src={`./data/products/${product.sku}_2.jpg`}alt = '' />
    <h5>{product.title}</h5>
    <h5>${product.price}</h5>
    <ButtonGroup size = "large">
    <IconButton style ={{marginBottom:'5%', background:'black', textAlign:'center', color: 'white', heigh:'20px', widt:'80%' }}> Add To Cart</IconButton>
    </ButtonGroup>
    </Card>
    )
  }

}

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <Grid container spacing={10} justify="center">
    {products.map(product => <CardGrid product={product}>{product.title}</CardGrid>)}
  </Grid>

  );
};

export default App;