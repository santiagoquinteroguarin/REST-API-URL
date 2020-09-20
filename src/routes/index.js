const { Router } = require('express');
const router = Router();

// Routes
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;
