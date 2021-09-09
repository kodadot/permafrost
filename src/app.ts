import express from 'express';
import cors from 'cors'
import multer from 'multer'
import { existsSync } from 'fs'
import { join } from 'path'
import { storeMetadata, getMetadata, getSearch, getTx, getOperatorAddress, getMetadataByTxId } from './handlers';

if (!existsSync(join(__dirname, 'wallet.json'))) {
  console.error('Please create a wallet.json file in the root directory')
  process.exit(1)
}

const storage =  'uploads/' // multer.memoryStorage()
const limits = {
  fieldNameSize: 255,
  fileSize: 10000000, // 10MB
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