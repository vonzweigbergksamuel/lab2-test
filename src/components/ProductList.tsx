import { useState, useEffect } from "react";
import { ShoppingCart } from "@svz1234/shopping-cart";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    price: 30,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Product 2",
    price: 20,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Product 3",
    price: 50,
    imageUrl: "https://via.placeholder.com/100",
  },
];

function ProductList() {
  // State to force a re-render when quantities change
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const cart = new ShoppingCart("localStorage");

  console.log(cart.getCart());
  console.log(cart.getProductQuantity(1));
  console.log(cart.getProductQuantity(2));
  console.log(cart.getProductQuantity(3));
  console.log(cart.getTotalQuantity());

  // Fetch quantities from the cart when the component mounts or when quantities change
  const fetchQuantities = () => {
    const updatedQuantities = products.reduce((acc, product) => {
      acc[product.id] = cart.getProductQuantity(product.id);
      return acc;
    }, {} as Record<number, number>);
    setQuantities(updatedQuantities);
  };

  // Use useEffect to initialize quantities when the component loads
  useEffect(() => {
    fetchQuantities();
  }, []);

  const incrementQuantity = (productId: number) => {
    cart.incrementProductQuantity(productId);
    fetchQuantities(); // Update state to reflect new quantity
  };

  const decrementQuantity = (productId: number) => {
    cart.decrementProductQuantity(productId);
    fetchQuantities(); // Update state to reflect new quantity
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.imageUrl} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price.toFixed(2)}</p>
          <div className="quantity-control">
            <button onClick={() => decrementQuantity(product.id)}>-</button>
            <span>{quantities[product.id] || 0}</span>
            <button onClick={() => incrementQuantity(product.id)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
