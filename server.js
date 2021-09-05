if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const newRoute = require('./routes/new');
const Document = require('./models/Document');

mongoose.connect(process.env.DB_MONGO, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});
mongoose.connection
	.once('open', () => {
		console.log('DB connected');
	})
	.on('error', (err) => {
		console.log(err);
	});

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
	const code = `Welcome to Sharebin!

Use the commands in the right corener
to create a new file to share  with your coder buddy!!`;
	res.render('code_display', { code, language: 'plaintext' });
});

app.use('/new', newRoute);
app.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const document = await Document.findById(id);
		res.render('code_display', { code: document.value, id });
	} catch (err) {
		res.redirect('/');
	}
});

app.get('/:id/duplicate', async (req, res) => {
	const { id } = req.params;
	try {
		const document = await Document.findById(id);
		res.render('new', { value: document.value, canSave: true });
	} catch (err) {
		res.redirect(`/${id}`);
	}
});

app.use((req, res) => {
	const code = `Sorry!!
The Page you are looking for
Doesn't exist.

Use the right panel to create a new document`;
	res.status(400).render('code_display', { code, language: 'plaintext' });
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Running on port 3000');
});
