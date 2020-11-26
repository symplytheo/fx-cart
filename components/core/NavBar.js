import { useState } from 'react';
import { 
  AppBar, Typography, Badge, Toolbar, Divider, IconButton, InputBase, Box,
  Grid, Drawer, Button
} from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Link from '../../src/Link'
import CartItem from '../parts/CartItem'
import { useCart, useDispatchCart } from '../../src/CartContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  cartPaper: {
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 350,
    },
  }
}));

export default function Header() {
  const classes = useStyles();
  const [cartDrawer, setcartDrawer] = useState(false);
  const toggleCart = () => {
    setcartDrawer(!cartDrawer);
  };

  const cart = useCart()
  const dispatch = useDispatchCart()
  const cartTotal = cart.reduce((ac, next) => ac + next.quantity * next.price, 0)

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background: '#fff', color: '#000'}}>
        <Toolbar>
          <Link href="/" naked>
            <img src="/favicon.ico" />
          </Link>
          <Typography className={classes.title} variant="h6" noWrap>
            FX-Cart
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <IconButton
            color="inherit"
            onClick={toggleCart}
            style={{margin: '0 5px 0 5px'}}
          >
            <Badge badgeContent={cart.length} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={cartDrawer}
        onClose={toggleCart}
        classes={{ paper: classes.cartPaper }}
      >
        <Toolbar>
          <Typography variant="body1">
            <b>Shopping Cart</b>
          </Typography>
          <IconButton 
            onClick={toggleCart}
            color="default"
            style={{marginLeft: 'auto'}}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>

        <Divider />
        
        <Box px={1}>
          {cart.length ? 
            cart.map(item => (
              <Grid key={item.id} container style={{marginBottom: 3}}>
                <CartItem item={item} />
              </Grid>
            ))
          :  
            <Box pt={10} pb={4}>
              <Typography align="center">
                Your Cart is Empty
              </Typography>
            </Box>
          }
          <Box pt={4} pb={1}>
            {cart.length ?
              <Box>
                <Button
                  size="small"
                  style={{color: 'grey'}}
                  onClick={() => dispatch({ type: 'CLEAR' })}
                >
                  Clear Items
                </Button>
                <Typography gutterBottom component="h2" variant="h5" align="right">
                  ${!cart.length ? 0 : cartTotal.toFixed(2)}
                </Typography>
                <Button
                  size="large"
                  fullWidth
                  variant="contained"
                  color="primary"
                  naked
                  component={Link}
                  href="/checkout"
                >
                  Checkout
                </Button>
              </Box>
            :
              <Button
                size="large"
                fullWidth
                onClick={toggleCart}
                variant="contained"
                color="primary"
                component={Link}
                naked
                href="/"
              >
                Continue shopping
              </Button>
            }
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}
