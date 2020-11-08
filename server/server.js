const config = require('./config');
const {RestApiError} = require('./errors');

const Express = require('express');
let app = Express();

app.use(Express.json());

app.get('/', async (req, res) => {
    try {
        return res.send("Tower API \nVersion: " + config.version);
    } catch (e) {
        console.log(e);
    }
});

app.get('/test', async (req, res) => {
    return res.json({
        response: {
            game_list: [
                {
                    img: 'img.img',
                    name: 'test name',
                    tags: ['D&D 5', 'for beginners'],
                    players: ['player1', 'player2', 'player3'],
                    time: {begin: '15:00', end: '18:00'}
                },
                {
                    img: 'img.img',
                    name: 'test name 2',
                    tags: ['D&D 5', 'for advanced players'],
                    players: ['player1', 'player2'],
                    time: {begin: '13:00', end: '15:00'}
                }
            ]
        }
    });
});

// TODO: прикрутить в миддлвару проверку прав
// TODO: права доступа (Read: 1, Create: 2, Update: 4, Delete: 8)
// TODO: сущности (Игрок, Мастер, Админ) extends User
// Мысли по структуре сущностей
// Различия игрока и мастера - у мастера непустой список своих игр
// Админ: Полные права на чтение/создание/изменение/удаление игр
// Мастер: Права на чтнеие/создание игр, изменение/удаление для своей игры
// Игрок: Права на чтение

// TODO: сущность игры
// TODO: Методы для создания игры, апдейта мастером/админом, записи на игру(в резерв), уведомления мастера и игроков об изменении статуса игры
// TODO: подумать над полями игры (включаем все поля, которые Гриша нарисовал в фигме + флаг модерации игры, статус игры)




/**
 * Отдает список игр (by day для мобилок, by week для десктопа)
 * @Returns Array of objects
 */
app.get('/gamesList', async (req, res) => {
   return res.json({
      gamesList: [
          {
              name: 'Старые сказки Трансильвании',
              system: 'Forbidden lands',
              genre: ['Детектив', 'Мифология', 'Ужасы'],
              tag: ['Для новичков'],
              img: 'test img',
              time: {
                start: '13:00',
                end: '15:00'
              },
              master: {
                name: 'Mikhail Mikhailov',
                vkLink: 'https://vk.com/id137129790'
              },
              table: 5
          },
          {
              name: 'Baldur`s gate game',
              system: 'D&D 5',
              genre: ['Детектив', 'Мифология', 'Ужасы'],
              tag: ['Для задротов'],
              img: 'test img',
              time: {
                  start: '15:00',
                  end: '17:00'
              },
              master: {
                  name: 'Mikhail Mikhailov',
                  vkLink: 'https://vk.com/id137129790'
              },
              table: 6
          }
      ]
   });
});

/**
 * Отдает данные об игре по id
 * @Returns object|RestApiError
 */
app.get('/game/:id', async (req, res) => {
    const gameId = req.params.id;
    if (!gameId) {
        res.send(new RestApiError('Game not found', 404));
    }

    return res.json({
        name: 'Baldur`s gate game',
        system: 'D&D 5',
        genre: ['Детектив', 'Мифология', 'Ужасы'],
        tag: ['Для задротов'],
        img: 'test img',
        time: {
            start: '13:00',
            end: '15:00'
        },
        master: {
            name: 'Mikhail Mikhailov',
            vkLink: 'https://vk.com/id137129790'
        },
        gamersList: [
            {
                name: 'Ivan Ivanov',
                vkLink: 'https://vk.com/id137129790'
            },
            {
                name: 'Elena Ivanova',
                vkLink: 'https://vk.com/id137129790'
            }
        ],
        reserveList: [
            {
                name: 'Petr Petrov',
                vkLink: 'https://vk.com/id137129790'
            },
            {
                name: 'Petr Petrov',
                vkLink: 'https://vk.com/id137129790'
            }
        ],
        description: 'Random description text'
    });

});

app.listen(config.port, () => console.log('Server started'));
