import { 
  Grid, Paper, Box, Typography, TextField, Button, Container, CircularProgress 
} from '@material-ui/core'
import CartItem from '../components/parts/CartItem'
import Layout from '../components/Layout'
import Head from '../components/core/Head'
import { useCart } from '../src/CartContext'
import { useState } from 'react'



const Checkout = () => {
  const [user , setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: ''
  })

  const [loading, setLoading] = useState(false)
  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const [card , setCard] = useState({
    holder: '',
    number: '',
    exp: '',
    cvv: ''
  })

  const updateUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const updateCard = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value
    })
  }

  const hasEmptyVal = (obj) => {
    return Object.values(obj).some(x => x === '')
  }

  const processPayment = async (e) => {
    e.preventDefault()

    const data = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      holder: card.holer,
      number: card.number,
      exp: card.exp,
      cvv: card.cvv,
    }
    if (!loading) {
      startLoading()
      //
      await setTimeout(() => {
        console.log(data)
        stopLoading()
      }, 1500)
    }
  }

  const cart = useCart()
  const cartTotal = cart.reduce((ac, next) => ac + next.quantity * next.price, 0)

  const loadingColor = { color: 'white' }
  return (
    <Layout>
      <Head title="Checkout" />
      <Container maxWidth="md" style={{padding: 5, marginTop: 15}}>
        <Grid container spacing={3}>
          {/* Cart Summary */}
          <Grid item xs={12} sm={7} md={6}>
            <Typography variant="h6">
              Order Summary
            </Typography>
            <Grid container>
              <Grid item xs={12}>
                {cart.map(item => (
                  <Box key={item.id} mb={1}>
                    <CartItem item={item} elevation={0} />
                  </Box>
                ))}
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom component="h2" variant="h5" align="right">
                  ${!cart.length ? 0 : cartTotal.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Billing Section */}
          <Grid item xs={12} sm={5} md={6}>
            <Paper elevation={0} square>
              <Box py={2} px={2}>
                <Typography variant="h6">
                  Billing Address
                </Typography>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <TextField
                      label="Full Name"
                      name="name"
                      variant="outlined"
                      required
                      autoFocus
                      fullWidth
                      value={user.name}
                      onChange={updateUser}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      label="Email Address"
                      name="email"
                      variant="outlined"
                      required
                      fullWidth
                      value={user.email}
                      onChange={updateUser}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      label="Phone Number"
                      name="phone"
                      variant="outlined"
                      required
                      fullWidth
                      value={user.phone}
                      onChange={updateUser}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      label="Address"
                      name="address"
                      variant="outlined"
                      required
                      fullWidth
                      value={user.address}
                      onChange={updateUser}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      label="City"
                      name="city"
                      variant="outlined"
                      required
                      fullWidth
                      value={user.city}
                      onChange={updateUser}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      label="State"
                      name="state"
                      variant="outlined"
                      required
                      fullWidth
                      value={user.state}
                      onChange={updateUser}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          {/* Credit card Section */}
          <Grid item xs={12} md={12}>
            <Paper elevation={0} square>
              <Box py={2} px={2}>
              <Typography variant="h6">
                Payment Card
              </Typography>
              <form noValidate>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      label="Card Holder"
                      name="holder"
                      variant="outlined"
                      required
                      fullWidth
                      value={card.holder}
                      onChange={updateCard}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      label="Card Number"
                      name="number"
                      variant="outlined"
                      required
                      fullWidth
                      value={card.number}
                      onChange={updateCard}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      label="Expiry Date"
                      name="exp"
                      variant="outlined"
                      required
                      fullWidth
                      value={card.exp}
                      onChange={updateCard}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      label="CVV"
                      name="cvv"
                      variant="outlined"
                      required
                      fullWidth
                      value={card.cvv}
                      onChange={updateCard}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={hasEmptyVal(card) || hasEmptyVal(user)}
                  onClick={processPayment}
                  type="submit"
                  size="large"
                >
                  { loading ? 
                    <CircularProgress size={26} style={loadingColor} />
                    : `Pay $${cartTotal}`
                  }
                </Button>
              </form>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Checkout
