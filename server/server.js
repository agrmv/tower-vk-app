const Express = require('express');
let app = Express();

const config = require('./config');

app.use(Express.json());

app.get('/', async (req, res) => {
    try {
        return res.send(`Tower API
        Version: ` + config.version);
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

app.listen(config.port, () => console.log('catch request'));
