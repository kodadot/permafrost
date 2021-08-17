import { Request, Response } from 'express';
import { search, submit, findByContract } from './ar';
import { extractQueryResult } from './utils';

export const getLocationsWithTimezones = ({ body, file }: any, response: Response) => {

  const meta = {
    ...body,
    'Content-Type': file.mimetype
  }

  submit(meta, file.buffer).then(tx => response.status(200).json(tx));
};

export const getSearch = (req: Request, response: Response) => {
  search().then(extractQueryResult).then(tx => response.status(200).json(tx));
};

export const getMetadata = (req: Request, response: Response) => {
  const { classId, id } = req.params;
  findByContract(classId, id).then(extractQueryResult).then(tx =>  response.status(200).json(tx)); 
}
