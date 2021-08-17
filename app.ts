import express from 'express';
import cors from 'cors'
import multer from 'multer'
import { getLocationsWithTimezones, getMetadata, getSearch } from './handlers';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const app = express();
app.use([cors(), express.json()])
const port = 3000;

app.get('/search', upload.none(), getSearch);
app.post('/pin', upload.single('image'), getLocationsWithTimezones);
app.get('/metadata/:classId/:id', upload.single('image'), getMetadata);

app.listen(port, () => {
  console.log(`❄❄❄ Permafrost running: ${port} ❄❄❄.`);
});