console.log("🚀 백엔드 시작됨");

const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
dotenv.config({ path: path.resolve(__dirname, ".env") });
console.log("MAIL_USER:", process.env.MAIL_USER);

const app = express();

app.use(
  cors({
    origin: "https://jeon-an-power-connect-a2q4-yunkis-projects.vercel.app", // 네 Vercel 프론트 주소
    methods: ["POST"], // 혹시 GET도 쓰면 추가
  })
);

app.use(express.json());

// 📁 업로드 폴더가 없으면 생성
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// 📷 파일 저장 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

app.post(
  "/api/register",
  upload.fields([{ name: "idCard" }, { name: "safetyCard" }]),
  async (req, res) => {
    try {
      const { name, age, phone, position, experience, agreePrivacy } = req.body;
      const idCardFile = req.files["idCard"]?.[0];
      const safetyCardFile = req.files["safetyCard"]?.[0];

      const isPrivacyAgreed = agreePrivacy === "true" || agreePrivacy === true;

      // 그리고 아래 조건문에서 isPrivacyAgreed로 체크
      if (
        !name ||
        !age ||
        !phone ||
        !position ||
        !experience ||
        !isPrivacyAgreed ||
        !idCardFile ||
        !safetyCardFile
      ) {
        return res.status(400).json({ message: "모든 항목을 입력하세요" });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"접수봇" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_TO,
        subject: `📥 새로운 인력 등록: ${name}`,
        text: `👤 이름: ${name}\n🎂 나이: ${age}\n📱 전화번호: ${phone}\n🛠 직책: ${position}\n📈 경력: ${experience}`,
        attachments: [
          {
            filename: idCardFile.originalname,
            path: idCardFile.path,
          },
          {
            filename: safetyCardFile.originalname,
            path: safetyCardFile.path,
          },
        ],
      });

      res.json({ message: "✅ 등록 완료" });
    } catch (err) {
      console.error("❌ 이메일 전송 실패:", err);

      // 에러 시 업로드된 파일 삭제
      if (req.files) {
        for (const field in req.files) {
          req.files[field].forEach((file) => {
            fs.unlink(file.path, (unlinkErr) => {
              if (unlinkErr) console.error("파일 삭제 실패:", unlinkErr);
            });
          });
        }
      }

      res.status(500).json({ message: "서버 오류: 이메일 전송 실패" });
    }
  }
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
