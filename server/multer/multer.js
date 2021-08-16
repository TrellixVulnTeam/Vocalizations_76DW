// @https://twitter.com/Musawir01342189/status/1345743937605140497?s=20;

import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(`file details ${JSON.stringify(file)}`);
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'application/json' || file.mimetype === 'audio/mpeg' 
        || file.mimetype === 'audio/wav'){
            cb(null, true);
        }else {
            cb(null, false);
        }
}

const upload = multer({storage: storage, fileFilter: filefilter});

export default upload;