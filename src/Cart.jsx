import { intl } from "./utils";

const Cart = ({ cart, checkout }) => {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const current = cart[i];
    total += current.pizza.sizes[current.size];
  }

  return (
    <div className="cart">
      <h2>Cart</h2>

      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span>{item.size}</span> -<span>{item.pizza.name}</span> -
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
      <p>Total: {intl.format(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
};

export default Cart;
