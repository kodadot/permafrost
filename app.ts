import express from 'express';
import cors from 'cors'
import multer from 'multer'
import { getLocationsWithTimezones, getMetadata, getSearch, getTx } from './handlers';

const storage = multer.memoryStorage()
const upload = multer({ storage })
const justImage = upload.single('avatar')

const app = express();
app.use([cors(), express.json()])
const port = 3000;

app.get('/search', upload.none(), getSearch);
app.post('/pin', justImage, getLocationsWithTimezones);
app.get('/metadata/:classId/:id', upload.none(), getMetadata);
app.get('/tx/:id', getTx);

app.listen(port, () => {
  console.log(`❄❄❄ [${(new Date()).toLocaleTimeString()}] Permafrost running: ${port} ❄❄❄.`);
});