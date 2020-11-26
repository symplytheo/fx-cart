import { useReducer, useContext, createContext } from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

let CartLS = []
if (typeof window !== "undefined") {
  CartLS = JSON.parse(localStorage.getItem('cart'))
  console.log(CartLS)
}

const setCartLS = (payload) => {
  if (typeof window !== "undefined") {
    localStorage.setItem('cart', JSON.stringify(payload))
  }
}

const removeCartLS = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem('cart')
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      let itemfound = false
      state.forEach(el => {
        if (el.id === action.payload.id) {
          el.quantity += action.payload.quantity
          itemfound = true
        }
      })
      if (!itemfound) {
        state = [...state, action.payload]
      }
      setCartLS(state)
      return state
    case 'REMOVE_FROM_CART':
      let items = []
      state.forEach(el => {
        if (el.id !== action.payload) {
          items = [...items, el]
        }
      })
      setCartLS(items)
      return items
    case 'INCREASE_QTY':
      state.forEach(el => {
        if (el.id === action.payload) {
          el.quantity = el.quantity + 1
        }
      })
      setCartLS(state)
      return state
    case 'DECREASE_QTY':
      state.forEach(el => {
        if (el.id === action.payload) {
          el.quantity = el.quantity > 1 ? el.quantity - 1 : 1
        }
      })
      setCartLS(state)
      return state
    case 'CLEAR':
      state = []
      removeCartLS()
      return state
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const CartProvider = ({ children }) => {
  const cart = CartLS ? [...CartLs] : []
  const [state, dispatch] = useReducer(reducer, cart)

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        { children }
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)
