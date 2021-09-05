const mongoose = require('mongoose');
const { Schema } = mongoose;

const documentSchema = new Schema({
	value: { type: String, required: true },
});

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;
