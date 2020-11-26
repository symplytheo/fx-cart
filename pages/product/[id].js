import Layout from '../../components/Layout'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import PageTitle from '../../components/core/Head'
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import AddIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles'
import { useDispatchCart } from '../../src/CartContext'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  heroImg: {
    width: '100%',
    height: '100%',
    borderRadius: theme.spacing(1),
  },
  prodName: {
    textTransform: 'capitalize',
    marginBottom: 5,
    fontWeight: 'bold'
  }
}))

const ProductPage = ({ product }) => {
  const classes = useStyles()
  const dispatch = useDispatchCart()

  const [quantity, setQuantity] = useState(1)

  const increment = () => {
    setQuantity(prevState => prevState + 1)
  }

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prevState => prevState - 1)
    }
  }

  function addToCart() {
    let item = product
    item.quantity = quantity
    dispatch({
      type: 'ADD_TO_CART',
      payload: item,
    })
  }

  return (
    <Layout>
      <PageTitle
        title={product.title.replace(/^\w|\s\w/g, w => w.toUpperCase())}
      />
      <Container maxWidth="md">
        <Box py={2}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <img src={product.image} className={classes.heroImg} />
            </Grid>
            <Grid item xs={11}>
              <Box py={1}>
                <Typography variant="h5" component="h1" className={classes.prodName}>
                  {product.title}
                </Typography>
                <Typography variant="h6" component="span" gutterBottom>
                  ${product.price.toLocaleString()}
                </Typography>
                <Typography variant="body1" component="span" style={{paddingLeft: '4px'}}>
                  <del>{(product.price * 1.25).toLocaleString()}</del>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={11}>
              <Box>
                <Typography variant="body1" component="span" style={{paddingRight: 5}}>
                  <b>Quantity:</b>
                </Typography>

                <IconButton size="small" onClick={decrement}>
                  <RemoveIcon />
                </IconButton>

                {` ${quantity} `}
                
                <IconButton size="small" onClick={increment}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Button variant="contained" size="large" color="primary" onClick={addToCart}>
                <ShoppingCartOutlinedIcon style={{paddingRight: '5px'}} />
                Add to cart
              </Button>
            </Grid>
            <Grid item xs={11}>
              <Paper elevation={4} style={{ margin: '15px 0' }}>
                <Box py={2} px={2}> 
                  <Typography variant="body1" component="p">
                    {product.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  let products = []
  try {
    const res = await fetch('https://fakestoreapi.com/products?limit=12')
    products = await res.json()
  } catch (err) {
    console.log(err)
  }

  if (!products) {
    return {
      notFound: true,
    }
  }

  const paths = products.map((prod) => ({
    params: { id: String(prod.id) },
  }))

  return { paths, fallback: false }
}


export async function getStaticProps({ params }) {
  let product = {}
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`)
    product = await res.json()
  } catch (err) {
    console.log(err)
  }

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      product,
    }
  }
}

export default ProductPage
