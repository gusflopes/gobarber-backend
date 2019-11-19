import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const storageTypes = {
  local: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        file.key = res.toString('hex') + extname(file.originalname);
        // Primeiro parametro seria o err - se não tem tem que devolver null
        return cb(null, file.key);
      });
    },
  }),

  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'godent',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        const fileName = res.toString('hex') + extname(file.originalname);
        // Primeiro parametro seria o err - se não tem tem que devolver null
        return cb(null, fileName);
      });
    },
  }),
};

export default {
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    filesize: 3 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
};
