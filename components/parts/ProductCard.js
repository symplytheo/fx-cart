import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import Link from '../../src/Link'
import {useCart, useDispatchCart } from '../../src/CartContext'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
});

export default function ProductCard({ product }) {
  const classes = useStyles();

  const dispatch = useDispatchCart()

  function addToCart() {
    let item = product
    item.quantity = 1
    dispatch({
      type: 'ADD_TO_CART',
      payload: item,
    })
  }

  return (
    <Card>
      <Link naked href={`/product/${product.id}`}>
        <CardMedia
          className={classes.media}
          component="img"
          src={product.image}
          title={product.title}
        />
      </Link>
      <Box py={1} px={2}>
        <Grid container alignItems="center">
          <Grid item xs={9}>
            <Typography gutterBottom variant="body1" component="h2" style={{textTransform: 'capitalize'}}>
              { product.title} 
            </Typography>
            <Typography variant="body2" component="span">
              ${product.price.toLocaleString()}
            </Typography>
            <small> <del>{(product.price * 1.25).toLocaleString()}</del> </small>
          </Grid>
          <Grid item xs={3}>
            <Button size="large" color="primary" variant="outlined" onClick={addToCart}>
              <ShoppingCartOutlinedIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

