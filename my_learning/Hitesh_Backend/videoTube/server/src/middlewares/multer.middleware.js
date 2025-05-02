import multer from "multer";

// // creating temp folder inside public folder
// // middlewares/multer.middleware.js
// import fs from "fs";
// import path from "path";

// // Ensure temp directory exists (runs once when this file is imported)
// const tempDir = path.join(process.cwd(), "public", "temp");
// if (!fs.existsSync(tempDir)) {
//   fs.mkdirSync(tempDir, { recursive: true });
// }

// copying from npm multer [DiskStorage]

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "./public/temp"); // changing destination
    cb(null, "./public"); // changing destination
  },

  // what should be our file name when i store this inside my temp folder
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage });

// so Now what we'll be doing is once user actually gives us this file from temp folder using multer, the next step is to upload that file on the cloudinary.First we have saved this on our server, from our server.Now we want to send it to the cloudinary.

//* How can we do that for this?

// It's not a middleware. Let's create some settings and the code helpers into the utilities.
// So inside the utilities let's create a new file and call this one as cloudinary JS. Now whether you're using cloudinary or you're using Aws, or upload thing, whatever you're using. The steps are usually the same.

//? There are two options available, destination and filename. They are both functions that determine where the file should be stored.

//* destination is used to determine within which folder the uploaded files should be stored. This can also be given as a string (e.g. '/temp/uploads'). If no destination is given, the operating system's default directory for temporary files is used.

//FIXME: Note: Multer will not append any file extension for you, your function should return a filename complete with an file extension.

//! where we use this
// as a middleware in routes [ref: npm multer doc below (app.post)]

/* 
app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})
 */
