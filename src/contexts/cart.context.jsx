import { useState, useEffect, createContext } from 'react';

// const addCartItems = (cartItems, productsToAdd) => {
//   //  find if cartItems contains productsToAdd, basically to check if it's already in cart

//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === productsToAdd.id,
//   );

//   // If found increment quantity, basically add items to cart

//   if (existingCartItem) {
//     return cartItems.map((cartItem) =>
//       cartItem.id === productsToAdd.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem,
//     );
//   }

//   // return new array with modified cart items/ new array with items added

//   return [...cartItems, { ...productsToAdd, quantity: 1 }];
// };

const addCartItems = (cartItems, productsToAdd) => {
  const existingItems = cartItems.find(
    (cartItem) => cartItem.id === productsToAdd.id,
  );

  if (existingItems) {
    return cartItems.map((cartItem) =>
      cartItem.id === productsToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : { cartItem },
    );
  }

  return [...cartItems, { ...productsToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemsToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,

      0,
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemsToCart = (productsToAdd) => {
    setCartItems(addCartItems(cartItems, productsToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemsToCart,
    cartItems,
    cartCount
  };
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
