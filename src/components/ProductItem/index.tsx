import { memo, useState,  } from 'react'; //lazy é a mesma coisa que o dynamic
//import { AddProductToWishList } from '../AddProductToWishList';
import {AddProductToWishListProps} from '../AddProductToWishList'
import dynamic from 'next/dynamic'

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('../AddProductToWishList').then(mod=> mod.AddProductToWishList);
}, {
  loading: function AddLogin () {
    return <span>Carregando...</span>
  }
});

interface ProductItemProps {
  product: {
    id: number,
    price: number,
    priceFormatted: string,
    title: string,
  }
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddToWishList, setIsAddToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddToWishList(true)}>Adicionar aos favoritos</button>
      {
        isAddToWishList && <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddToWishList(false)}
        />
      }
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
});

