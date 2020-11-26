import { useReducer, useContext, createContext } from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

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
      const new_state = state.map(el => {
        if (el.id === action.payload) {
          el.quantity = el.quantity + 1
        }
        return el
      })
      setCartLS(new_state)
      return new_state
    case 'DECREASE_QTY':
      const newState = state.map(el => {
        if (el.id === action.payload) {
          el.quantity = el.quantity > 1 ? el.quantity - 1 : 1
        }
        return el
      })
      setCartLS(newState)
      return newState
    case 'CLEAR':
      state = []
      removeCartLS()
      return state
    case 'SET_CART':
      state = [...action.payload]
      return state
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [])

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
