const Express = require('express');
let app = Express();

app.use(Express.json());

app.get('/test', async (req, res) => {
    return res.json({
        response: {
            img: 'test.img',
            name: 'Rabotyaga'
        }
    });
});
