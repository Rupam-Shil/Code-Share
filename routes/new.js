const router = require('express').Router();
const Document = require('../models/Document');

router.get('/', (req, res) => {
	res.render('new', { canSave: true });
});

router.post('/save', async (req, res) => {
	const { value } = req.body;
	try {
		const document = await Document.create({ value });
		res.redirect(`/${document.id}`);
	} catch (err) {
		res.render('new', { value });
	}
	res.send('Thank you');
});

module.exports = router;
