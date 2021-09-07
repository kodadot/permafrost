import express from 'express';
import cors from 'cors'
import multer from 'multer'
import { storeMetadata, getMetadata, getSearch, getTx, getOperatorAddress, getMetadataByTxId } from './handlers';

const storage =  'uploads/' // multer.memoryStorage()
const limits = {
  fieldNameSize: 255,
  fileSize: 1000000,
  files: 1
}
const upload = multer({ dest: storage, limits })

const justImage = upload.single('avatar')

const app = express();
app.use([cors(), express.json()])
const port = 3003;

app.get('/search', upload.none(), getSearch);
app.post('/store', justImage, storeMetadata);
app.get('/meta/:id', getMetadataByTxId);
app.get('/metadata/:classId/:id', upload.none(), getMetadata);
app.get('/tx/:id', getTx);
app.get('/whoami', getOperatorAddress);

app.listen(port, () => {
  console.log(`❄❄❄ [${(new Date()).toLocaleTimeString()}] Permafrost running: ${port} ❄❄❄.`);
});