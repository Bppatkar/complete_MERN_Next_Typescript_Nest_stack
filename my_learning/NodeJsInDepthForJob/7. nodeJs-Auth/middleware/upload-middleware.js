import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
// console.log(__fileName);
// console.log(__dirName);

// set our multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public');
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
    cb(null, file.originalname + '-' + uniqueSuffix);
  },
});

// multer middleware
export default multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const upload = multer({ storage });
