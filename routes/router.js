const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Mealify - Home'
    });
});


router.get('/favourite', (req, res) => {
    res.render('recipe', {
        title: 'Mealify - Favourite'
    });
});

router.get('/random', (req, res) => {
    res.render('random', {
        title: 'Mealify - Random'
    });
});

module.exports = router;