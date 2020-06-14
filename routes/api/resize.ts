/* eslint-disable require-jsdoc */
// eslint-disable-next-line new-cap

import axios from 'axios';
import Sharp from "sharp";
import isUrl from 'is-url';
import { fromBuffer } from 'file-type';
import { Router, Request, Response } from 'express';
import resizeRequestSchema from "../../models/resizeRequestSchema"

const router = Router()

const handleResize = async (req: Request, res: Response): Promise<Response<any> | undefined> => {
  const validationResult = resizeRequestSchema.validate(req['query']);
  if (validationResult.error) {
    return res
      .status(422)
      .json(validationResult.error.message);
  }
  try {
    if (isUrl(req['body'])) {
      const resizedImage = await handleUrl(req, validationResult.value)
      return res
        .status(200)
        .send(resizedImage);
    } else if
      (await checkIfInputIsImage(req.body)) {
      const resizedImage = await resizeImage(req.body, validationResult.value);
      return res
        .status(200)
        .send(resizedImage);
    }
  } catch (err) {
    res
      .status(422)
      .send(err);
  }
};


const handleUrl = async (req: Request, requestQueryParams: any): Promise<Buffer> => {
  const imageReq = await axios.get(req.body, { responseType: 'arraybuffer' });
  return resizeImage(Buffer.from(
    new Uint8Array(imageReq.data)),
    requestQueryParams);
};


const checkIfInputIsImage = async (buffer: Buffer): Promise<boolean | undefined> => {
  const fileType = await fromBuffer(buffer);
  return fileType?.mime.includes('image')
};

const resizeImage = (buffer: Buffer, requestQueryParams: any): Promise<Buffer> => {
  return Sharp(buffer)
    .resize(requestQueryParams['width'] || null,
      requestQueryParams['height'] || null)
    .rotate()
    .toBuffer();
};
router.post('/', handleResize);

export default router;

