import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";

// 서버 초기화
const app = express();
const port = 4000;

// CORS 허용
app.use(cors());

// multer 설정 (파일 저장 위치 및 파일명)
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = "uploads";
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  }),
});

// 파일 + 텍스트 필드 처리
const uploadFields = upload.fields([
  { name: "idCard", maxCount: 1 },
  { name: "safetyCard", maxCount: 1 },
]);

// POST /api/register
app.post("/api/register", uploadFields, (req, res) => {
  const { name, age, phone, position, experience, agreePrivacy } = req.body;

  const idCardFile = req.files?.["idCard"]?.[0];
  const safetyCardFile = req.files?.["safetyCard"]?.[0];

  console.log("📦 등록 요청:", { name, age, phone, position, experience });
  console.log("🗂 파일:", idCardFile?.filename, safetyCardFile?.filename);

  // TODO: 저장하거나 이메일 보내기 등의 처리 가능

  res.json({ success: true });
});

// 서버 시작
app.listen(port, () => {
  console.log(`✅ 서버 실행됨: http://localhost:${port}`);
});
