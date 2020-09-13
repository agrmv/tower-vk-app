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
            img: 'test.img',
            name: 'Rabotyaga'
        }
    });
});

app.listen(config.port, () => console.log('catch request'));
