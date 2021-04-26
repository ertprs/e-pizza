
export const PersonalizeIngredients = () => {
  return (
    <div>
      <p>
        Por favor, selecione os ingredientes que você deseja adicionar da sua
        pizza:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>
          <input
            type="checkbox"
            checked={false}
            onChange={() => console.log('changed')}
          />
          <span>Azeitona</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={false}
            onChange={() => console.log('changed')}
          />
          <span>Tomate</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={false}
            onChange={() => console.log('changed')}
          />
          <span>Cebola</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={false}
            onChange={() => console.log('changed')}
          />
          <span>Azeite de Oliva </span>
        </label>
      </div>
    </div>
  );
};
