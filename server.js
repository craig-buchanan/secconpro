const express    = require('express');
const dateFormat = require('dateFormat');
const fs         = require('fs');
const app        = express();

app.use('/assets/', express.static(__dirname + '/src/assets'));

function dateStr() {
	return dateFormat(new Date(), "dd.mm.yyyy HH:MM:ss");
}

function handleHtml(req, res) {
	const key = req.params['key'];
	console.log('page ' + key + ' hit', dateStr(), req.ip);
	const fileName = __dirname + '/src/SCP-' + key + '.html';

	if(fs.existsSync(fileName)) return res.sendFile(fileName);

	return res.status(404).send('WARNING!! ACCESS DENIED');
}

app.get('/SCP-:key(\\d{2,4})', handleHtml);

app.use((req, res, next) => {
	console.log('path not found');
	res.status(404).send('WARNING!! ACCESS DENIED');
});

app.listen(8080, () => {
	console.log('server started');
});