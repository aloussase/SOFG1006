const express = require('express');
const cors = require('cors')

const app = express();

// CORS
app.use(cors());

// Json
app.use(express.json())

app.get('/generate_insult', async (req, res) => {
  const resp = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json');
  const json = await resp.json();

  if (!resp.ok) {
    res.json({
      status: resp.status,
      error: resp.body
    });
  }

  res.status(200);
  res.json({
    status: 200,
    data: json
  });
})

const SERV_PORT = process.env.PORT || 8080;
app.listen(SERV_PORT, () => console.log(`Server started on port ${SERV_PORT}`));
