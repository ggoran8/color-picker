const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/palette', async (req, res) => {
	try {
		const response = await fetch('http://colormind.io/api/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ model: 'default' }),
		});

		const data = await response.json();

		console.log('Data from Colormind:', data);

		res.json(data);
	} catch (error) {
		console.error('Error fetching palette:', error);
		res.status(500).json({ error: 'Something went wrong' });
	}
});

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Express server running on http://localhost:${PORT}`);
});
