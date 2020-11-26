import { Card, Box, Grid, Button, Typography, IconButton } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import AddIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined'
import { useDispatchCart } from '../../src/CartContext'

const CartItem = ({ item, elevation }) => {
  const dispatch = useDispatchCart()

  return (
    <Card style={{width: '100%'}} elevation={elevation}>
      <Box px={1} py={1}>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <img src={item.image} style={{width: '100%', height: 75, borderRadius: 5}} />
          </Grid>
          <Grid item xs={6} style={{padding: 5}}>
            <Typography gutterBottom variant="body1" component="h2" style={{textTransform: 'capitalize'}}>
              {item.title.length>40 ? item.title.slice(0,40) + '...' : item.title}
            </Typography>
            <Box>
              <IconButton
                size="small"
                onClick={() => dispatch({type: 'DECREASE_QTY', payload: item.id })}
              >
                <RemoveIcon />
              </IconButton>
                {` ${item.quantity} `}
              <IconButton
                size="small"
                onClick={() => dispatch({type: 'INCREASE_QTY', payload: item.id })}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={2} style={{textAlign: 'right'}}>
            <IconButton
              onClick={() => dispatch({type: 'REMOVE_FROM_CART', payload: item.id })}
            >
              <DeleteIcon style={{color: 'red'}} />
            </IconButton>
            <Typography variant="body2" component="h2">
              ${item.price.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

export default CartItem