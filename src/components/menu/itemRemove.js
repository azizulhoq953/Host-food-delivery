import CartProduct from './CartProduct';

export default function Cart({ products, onRemove }) {
  return (
    <div>
      {products.map((product, index) => (
        <CartProduct 
          key={product.id} 
          product={product} 
          onRemove={onRemove} 
          index={index} 
        />
      ))}
    </div>
  );
}
