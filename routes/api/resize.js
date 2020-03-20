/* eslint-disable require-jsdoc */
// eslint-disable-next-line new-cap
const router = require('express').Router();
const FileType = require('file-type');
const axios = require('axios');
const isUrl = require('is-url');
const sharp = require('sharp');
const resizeRequestSchema = require('../../models/resizeRequestSchema');


const handleResize = async (req, res) => {
  const requestQueryParams = resizeRequestSchema.validate(req.query);
  if (requestQueryParams.error) {
    return res
        .status(422)
        .json(requestQueryParams.error.message);
  }
  try {
    if (isUrl(req.body)) {
      const resizedImage = await handleUrl(req, requestQueryParams);
      return res
          .status(200)
          .send(resizedImage);
    } else if
    (await checkIfInputIsImage(req.body)) {
      const resizedImage = await resizeImage(req.body, requestQueryParams);
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


const handleUrl = async (req, requestQueryParams) => {
  const imageReq = await axios.get(req.body, {responseType: 'arraybuffer'});
  return resizeImage(imageReq.data, requestQueryParams);
};


const checkIfInputIsImage = async (buffer) => {
  const fileType = await FileType.fromBuffer(buffer);
  return fileType.mime.includes('image');
};

const resizeImage = (buffer, requestQueryParams) => {
  return sharp(buffer)
      .resize(requestQueryParams.width || null,
          requestQueryParams.height || null)
      .rotate()
      .toBuffer();
};
router.post('/', handleResize);

module.exports = router;

