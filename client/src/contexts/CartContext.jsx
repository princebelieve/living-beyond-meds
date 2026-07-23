import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "lbd_cart";

const initialState = {
  items: [],
};

function loadCart() {
  if (typeof window === "undefined") return initialState;

  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) return initialState;
    return { items: JSON.parse(value) };
  } catch (err) {
    return initialState;
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn("Unable to save cart data", err);
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId,
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.productId !== productId),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        ),
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.productId !== action.payload),
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, loadCart);

  useEffect(() => {
    saveCart(state.items);
  }, [state.items]);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.quantity * Number(item.price || 0),
    0,
  );

  const value = useMemo(
    () => ({
      items: state.items,
      totalItems,
      totalPrice,
      addToCart: (product) =>
        dispatch({
          type: "ADD_ITEM",
          payload: {
            productId: product._id || product.id,
            name: product.name,
            price: Number(product.price || 0),
            image: product.image || product.imageUrl || "",
          },
        }),
      updateQuantity: (productId, quantity) =>
        dispatch({
          type: "UPDATE_QUANTITY",
          payload: { productId, quantity },
        }),
      removeFromCart: (productId) =>
        dispatch({ type: "REMOVE_ITEM", payload: productId }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
    }),
    [state.items, totalItems, totalPrice],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
