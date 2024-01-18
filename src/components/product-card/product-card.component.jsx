import { useContext } from 'react';


import Button from '../custom-button/custom-button.component';

import { CartContext } from '../../contexts/cart.context';
import './product-card.styles.scss';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const {addItemsToCart} = useContext(CartContext);

  const addProductToCart = () => addItemsToCart(product)
  return (
    <div className='product-card-container'>
      <img
        src={imageUrl}
        alt={`${name}`}
      />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType='inverted' onClick={addProductToCart} >Add to Cart</Button>
    </div>
  );
};

export default ProductCard;
