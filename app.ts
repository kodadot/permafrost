import express, { Request, Response } from 'express';
import cors from 'cors'
import multer from 'multer'
import { submit, search } from './ar';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const app = express();
app.use([cors(), express.json()])
const port = 3000;

const getLocationsWithTimezones = ({ body, file }: any, response: Response) => {

  const meta = {
    ...body,
    'Content-Type': file.mimetype
  }

  submit(meta, file.buffer).then(tx => response.status(200).json(tx));
};

const getSearch = (req: Request, response: Response) => {
  search().then(tx => response.status(200).json(tx));
};


app.get('/search', upload.none(), getSearch);
app.post('/pin', upload.single('image'), getLocationsWithTimezones);

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});