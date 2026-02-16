const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const { initializeDatabase } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const developerRoutes = require("./routes/developerRoutes");
const messageRoutes = require("./routes/messageRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const matchRoutes = require("./routes/matchRoutes");
const exploreRoutes = require("./routes/exploreRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/developers", developerRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/explore", exploreRoutes);

app.use(
  "/",
  express.static(path.resolve(__dirname, "../frontend"))
);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/html/index.html"));
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "webhub-api", timestamp: new Date().toISOString() });
});

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("No se pudo iniciar la base de datos:", error);
    process.exit(1);
  });
