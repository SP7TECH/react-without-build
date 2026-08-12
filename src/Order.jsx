import { useEffect, useState } from "react";
import Pizza from "./Pizza";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Order() {
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Derived State
  let price, selectedPizza;
  if (!isLoading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = intl.format(
      selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : "",
    );
  }

  async function fetchPizzaTypes() {
    // fake loading
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const pizzaRes = await fetch("/api/pizzas");
    const pizzaJson = await pizzaRes.json();
    setPizzaTypes(pizzaJson);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  return (
    <div className="order">
      <h2>Create Order</h2>

      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              onChange={(e) => setPizzaType(e.target.value)}
              name="pizza-type"
              value={pizzaType}
            >
              {pizzaTypes.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            {/* Event Bubbling  */}
            <div onChange={(e) => setPizzaSize(e.target.value)}>
              <span>
                <input
                  checked={pizzaSize === "S"}
                  name="pizza-size"
                  value="S"
                  type="radio"
                  id="pizza-s"
                />
                <label htmlFor="pizza-s">Small</label>
              </span>

              <span>
                <input
                  checked={pizzaSize === "M"}
                  name="pizza-size"
                  value="M"
                  type="radio"
                  id="pizza-m"
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>

              <span>
                <input
                  checked={pizzaSize === "L"}
                  name="pizza-size"
                  value="L"
                  type="radio"
                  id="pizza-l"
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>

        {isLoading ? (
          "Loading..."
        ) : (
          <div className="order-pizza">
            <Pizza
              name={selectedPizza.name}
              description={selectedPizza.description}
              image={selectedPizza.image}
            />
            <p>{price}</p>
          </div>
        )}
      </form>
    </div>
  );
}
