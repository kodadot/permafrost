import express, { Request, Response } from 'express';
import cors from 'cors'
import multer from 'multer'
import { submit } from './ar';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const app = express();
app.use([cors(), express.json()])
const port = 3000;

const getLocationsWithTimezones = ({ body, file }: any, response: Response) => {

  const meta = {
    ...body,
    mimetype: file.mimetype
  }

  console.log(file.buffer.toString());

  submit(meta, file.buffer).then(tx => response.status(200).json(tx));
};


app.get('/test', upload.single('avatar'), getLocationsWithTimezones);

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});