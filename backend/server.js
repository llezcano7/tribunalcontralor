import express from "express";
import nodemailer from "nodemailer";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Multer — archivos en memoria, sin guardar en disco
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB por archivo
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos PDF"));
    }
  },
});

// CORS — permite peticiones desde React
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["POST"],
}));

app.use(express.json());

// Nodemailer — configuración Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Verificar conexión al iniciar
transporter.verify((error) => {
  if (error) {
    console.error("❌ Error de conexión con Gmail:", error.message);
  } else {
    console.log("✅ Conexión con Gmail establecida correctamente");
  }
});

// Endpoint — recibir declaración jurada
app.post("/api/declaraciones-juradas", upload.fields([
  { name: "pdf1", maxCount: 1 },
  { name: "pdf2", maxCount: 1 },
]), async (req, res) => {
  try {
    const { nombre, apellido, email, legajo } = req.body;

    // Validación básica
    if (!nombre || !apellido || !email || !legajo) {
      return res.status(400).json({ error: "Faltan campos obligatorios." });
    }

    const attachments = [];

    if (req.files?.pdf1?.[0]) {
      attachments.push({
        filename: req.files.pdf1[0].originalname,
        content: req.files.pdf1[0].buffer,
        contentType: "application/pdf",
      });
    }

    if (req.files?.pdf2?.[0]) {
      attachments.push({
        filename: req.files.pdf2[0].originalname,
        content: req.files.pdf2[0].buffer,
        contentType: "application/pdf",
      });
    }

    // Email al Tribunal Contralor
    await transporter.sendMail({
      from: `"Sistema DDJJ - Tribunal Contralor" <${process.env.GMAIL_USER}>`,
      to: process.env.MAIL_RECEIVER,
      subject: `DDJJ recibida — ${apellido}, ${nombre} — Legajo ${legajo}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">Nueva Declaración Jurada recibida</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">Nombre:</td>
              <td style="padding: 8px;">${nombre} ${apellido}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">Legajo:</td>
              <td style="padding: 8px;">${legajo}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #555;">Archivos adjuntos:</td>
              <td style="padding: 8px;">${attachments.length} PDF${attachments.length !== 1 ? "s" : ""}</td>
            </tr>
          </table>
        </div>
      `,
      attachments,
    });

    // Email de confirmación al funcionario
    await transporter.sendMail({
      from: `"Tribunal Contralor de Bariloche" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Declaración Jurada recibida correctamente",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">Su documentación fue recibida</h2>
          <p>Estimado/a <strong>${nombre} ${apellido}</strong>,</p>
          <p>Le informamos que su Declaración Jurada correspondiente al legajo <strong>${legajo}</strong> fue recibida correctamente por el Tribunal Contralor de San Carlos de Bariloche.</p>
          <p>La documentación será procesada y remitida a quien corresponda a la brevedad.</p>
          <br/>
          <p style="color: #888; font-size: 0.9rem;">Este es un mensaje automático. Por favor no responda a este correo.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 1.5rem 0;" />
          <p style="color: #888; font-size: 0.85rem;">Tribunal Contralor — Municipio de San Carlos de Bariloche<br/>Edificio ex aduana, Centro Cívico</p>
        </div>
      `,
    });

    res.status(200).json({ message: "Declaración enviada correctamente." });

  } catch (error) {
    console.error("❌ Error al enviar email:", error.message);
    res.status(500).json({ error: "Error al procesar la declaración. Intentá de nuevo." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});