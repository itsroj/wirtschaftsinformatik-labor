import jwt from 'jsonwebtoken';

/**
 * Middleware: prüft ob die eingehende Anfrage ein gültiges JWT enthält.
 * Liest den Token aus dem Authorization-Header (Format: "Bearer <token>").
 * Bei gültigem Token: hängt userId und email an das req-Objekt an und gibt die Anfrage frei.
 * Bei fehlendem oder ungültigem Token: bricht mit 401/403 ab.
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Authentifizierung erforderlich' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Ungültiger oder abgelaufener Token' });
    }

    req.userId = decoded.userId;
    req.email = decoded.email;
    next();
  });
};

