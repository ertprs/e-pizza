import React, { useState } from 'react';
import { Container } from '../Container';
import styles from './content.module.scss';

const pizzaObject = {
  flavors: [
    {
      id: 0,
      name: 'Calabresa',
      price: 15,
    },
    {
      id: 1,
      name: 'Marguerita',
      price: 15,
    },
    {
      id: 2,
      name: 'Muçarela',
      price: 15,
    },
    {
      id: 3,
      name: 'Napolitana',
      price: 15,
    },
    {
      id: 4,
      name: 'Lombo Canadense',
      price: 20,
    },
  ],
  sizes: [
    {
      id: 0,
      name: 'Pequena',
      splices: 4,
      price: 8,
    },
    {
      id: 1,
      name: 'Média',
      splices: 6,
      price: 10,
    },
    {
      id: 2,
      name: 'Grande',
      splices: 8,
      price: 12,
    },
    {
      id: 3,
      name: 'Gigante',
      splices: 10,
      price: 14,
    },
  ],
  borders: [
    {
      id: 0,
      name: 'Sem recheio',
      price: 0,
    },
    {
      id: 1,
      name: 'Cheddar',
      price: 8,
    },
    {
      id: 2,
      name: 'Catupiry',
      price: 8,
    },
    {
      id: 3,
      name: 'Calabresa com Catupiry',
      price: 12,
    },
    {
      id: 4,
      name: 'Lista (Requeijão e Cheddar)',
      price: 12,
    },
  ],
};
export function Content() {
  const [pizza, setPizza] = React.useState({
    flavor: 0,
    size: 0,
    border: 0,
    ingredients: [],
  });

  const [step, setStep] = useState(1);

  const calculatePrice = price => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const handleChangeFlavor = event => {
    setPizza({
      ...pizza,
      flavor: event.target.value,
    });
  };

  const handleChangeSize = event => {
    setPizza({
      ...pizza,
      size: event.target.value,
    });
  };

  const handleChangeBorder = event => {
    setPizza({
      ...pizza,
      border: event.target.value,
    });
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBackStep = () => {
    if (step !== 0) {
      setStep(step - 1);
    }
  };

  const getTemplateByStep = React.useCallback(() => {
    if (step === 1) {
      return (
        <FlavorList
          handleChangeFlavor={handleChangeFlavor}
          flavorId={pizza.flavor}
        />
      );
    }
    if (step === 2) {
      return (
        <SizeList handleChangeSize={handleChangeSize} sizeId={pizza.size} />
      );
    }
    return (
      <BorderList
        handleChangeBorder={handleChangeBorder}
        borderId={pizza.border}
      />
    );
  }, [step, pizza]);

  return (
    <Container>
      <div>
        <p>Monte sua pizza do seu jeito!</p>
        {getTemplateByStep()}
        <div>
          <button type="button" onClick={handleBackStep}>
            Anterior
          </button>
          <button type="button" onClick={handleNextStep}>
            Próximo
          </button>
        </div>
      </div>
      <div>
        <h3>TOTAL</h3>
        <div>
          <p>{pizzaObject.flavors[pizza.flavor].name}</p>
          <p>{calculatePrice(pizzaObject.flavors[pizza.flavor].price)}</p>
        </div>
        <div>
          <p>{pizzaObject.sizes[pizza.size].name}</p>
          <p>{pizzaObject.sizes[pizza.size].splices} fatias</p>
          <p>{calculatePrice(pizzaObject.sizes[pizza.size].price)}</p>
        </div>
        <div>
          <p>{pizzaObject.borders[pizza.border].name}</p>
          <p>{calculatePrice(pizzaObject.borders[pizza.border].price)}</p>
        </div>
      </div>
    </Container>
  );
}

export const FlavorList = ({ handleChangeFlavor, flavorId }) => {
  return (
    <div className={styles.flavor__list}>
      <p>SABORES</p>
      {pizzaObject.flavors.map(flavor => (
        <label className="container" key={flavor.id}>
          <input
            checked={flavor.id === parseInt(flavorId)}
            type="radio"
            name="radio"
            value={flavor.id}
            onChange={e => handleChangeFlavor(e)}
          />
          {flavor.name}
        </label>
      ))}
    </div>
  );
};

export const SizeList = ({ handleChangeSize, sizeId }) => {
  return (
    <div className={styles.flavor__list}>
      <p>TAMANHOS</p>
      {pizzaObject.sizes.map(size => (
        <label className="container" key={size.id}>
          {size.name}
          <input
            type="radio"
            name="radio"
            value={size.id}
            checked={size.id === parseInt(sizeId)}
            onChange={e => handleChangeSize(e)}
          />
          <span className="checkmark"></span>
        </label>
      ))}
    </div>
  );
};

export const BorderList = ({ handleChangeBorder, borderId }) => {
  return (
    <div className={styles.flavor__list}>
      <p>BORDAR</p>
      {pizzaObject.borders.map(border => (
        <label className="container" key={border.id}>
          {border.name}
          <input
            type="radio"
            name="radio"
            value={border.id}
            checked={border.id === parseInt(borderId)}
            onChange={e => handleChangeBorder(e)}
          />
          <span className="checkmark"></span>
        </label>
      ))}
    </div>
  );
};
