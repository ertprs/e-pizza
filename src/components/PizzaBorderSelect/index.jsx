const pizzaObject = {
  sizes: [],
};
export const PizzaBorderSelect = () => {
  const sizes = pizzaObject.sizes;
  const dispatch = useDispatch();

  const pizzaSize = useSelector((state) => state.pizzaSlice.pizzaSize);

  const handleChangeSize = (event) => {
    dispatch(setPizzaSize(event.target.value));
  };

  return (
    <div>
      <p>
        <b>Selecione a borda da sua pizza:</b>
      </p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {sizes.map((size) => (
          <label key={size.id}>
            {size.name}
            <input
              type="radio"
              name="radio"
              value={size.id}
              checked={size.id === parseInt(pizzaSize)}
              onChange={(e) => handleChangeSize(e)}
            />
            <span className="checkmark"></span>
          </label>
        ))}
      </div>
    </div>
  );
};
