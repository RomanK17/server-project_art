const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage }).single("image");

app.post('/api/data', upload, (req, res) => {
  if (req.file) {
    console.log(req.file);
    res.send('Received image');
  } else {
    console.log(req.body);
    res.send('Received data');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
