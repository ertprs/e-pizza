import { createServer } from 'miragejs';

createServer({
  routes() {
    this.get('/api/pizzas', () => [
      {
        flavors: [
          {
            id: 0,
            name: 'Calabresa',
            price: 15,
            ingredients: ['Molho, muçarela, calabresa, cebola, orégano'],
            image:
              'https://firebasestorage.googleapis.com/v0/b/pizza-images-5d21e.appspot.com/o/calabresa.png?alt=media&token=26be2b8c-3283-4d06-a7ac-2e03a301795c',
            linked: [1, 2, 3],
          },
          {
            id: 1,
            name: 'Marguerita',
            price: 15,
            ingredients: ['Molho, muçarela, tomates, manjericão'],
            image:
              'https://firebasestorage.googleapis.com/v0/b/pizza-images-5d21e.appspot.com/o/margherita.png?alt=media&token=bbbb7bc6-2ad9-45e5-bf74-c0acf44ffd12',
            linked: [0, 3, 4],
          },
          {
            id: 2,
            name: 'Muçarela',
            price: 15,
            ingredients: ['Molho,muçarela, tomate, orégano'],
            image:
              'https://firebasestorage.googleapis.com/v0/b/pizza-images-5d21e.appspot.com/o/frango-com-catupiry.png?alt=media&token=0d5995c2-aae1-44b2-8e88-01a9a51d7d40',
            linked: [1, 3, 4],
          },
          {
            id: 3,
            name: 'Napolitana',
            price: 15,
            ingredients: [
              'Molho, muçarela, tomates, parmesão, azeitonas, orégano',
            ],
            image:
              'https://firebasestorage.googleapis.com/v0/b/pizza-images-5d21e.appspot.com/o/napolitana.png?alt=media&token=7bead6bb-d01a-4622-9a56-d100891fdd88',
            linked: [0, 2, 4],
          },
          {
            id: 4,
            name: 'Pizza Vegetariana',
            price: 20,
            ingredients: [
              'Molho, muçarela, brócolis, palmito, tomate, champignon, cebola, orégano',
            ],
            image:
              'https://firebasestorage.googleapis.com/v0/b/pizza-images-5d21e.appspot.com/o/frango-com-catupiry.png?alt=media&token=0d5995c2-aae1-44b2-8e88-01a9a51d7d40',
            linked: [3],
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
      },
    ]);
  },
});

const mockServer = createServer;

export { mockServer };
