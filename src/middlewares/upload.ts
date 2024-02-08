import multer, { MulterError } from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const dirPath = path.join(__dirname, "..", "..", "uploads");

const createUploadDest = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const genFileName = (file: Express.Multer.File) => {
  const extension = file.originalname.split(".")[1];
  return `${crypto.randomBytes(8).toString("hex")}.${extension}`;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    createUploadDest(dirPath);
    cb(null, dirPath);
  },
  filename: function (req, file, cb) {
    cb(null, genFileName(file));
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      return cb(new Error("only jpeg/png image formats are allowed"));
    }
    cb(null, true);
  },
});
