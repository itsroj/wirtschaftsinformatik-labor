const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Test-Login, später wird das mit der Datenbank verbunden
  if (email !== "admin@mun.de" || password !== "admin123") {
    return res.status(401).json({ message: "Login fehlgeschlagen" });
  }

  const token = jwt.sign(
    { email: email, role: "admin" },
    process.env.JWT_SECRET || "dev_secret",
    { expiresIn: "2h" }
  );

  res.json({
    message: "Login erfolgreich",
    token: token,
  });
});

module.exports = router;