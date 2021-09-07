import { Request, Response } from 'express';
import { search, submit, findByContract, readTx, whoAmI, findByTransactionId } from './ar';
import { extractQueryResult, extractQueryToMetadata } from './utils';
import { unlink, readFile } from 'fs/promises';

export const storeMetadata = ({ body, file }: any, response: Response) => {

  const meta = {
    ...body,
    'Content-Type': file.mimetype
  }

  readFile(file.path)
    .then(data => submit(meta, data))
    .then(tx => response.status(200).json(tx))
    .then(() => unlink(file.path))
    .catch(err => response.status(500).json(err.message));
};

export const getSearch = (req: Request, response: Response) => {
  search().then(extractQueryResult).then(tx => response.status(200).json(tx));
};

export const getMetadata = (req: Request, response: Response) => {
  const { classId, id } = req.params;
  console.log(classId, id);
  findByContract(classId, id).then(extractQueryToMetadata).then(tx =>  response.status(200).json(tx)); 
}

export const getTx = (req: Request, response: Response) => {
  const { id } = req.params;
  readTx(id).then(tx => response.status(200).send(tx));
}

export const getMetadataByTxId = (req: Request, response: Response) => {
  const { id } = req.params;
  console.log(id);
  findByTransactionId(id).then(extractQueryToMetadata).then(tx =>  response.status(200).json(tx)); 
}

export const getOperatorAddress = (req: Request, response: Response) => {
  whoAmI().then(tx => response.status(200).json({ address: tx }));
}
