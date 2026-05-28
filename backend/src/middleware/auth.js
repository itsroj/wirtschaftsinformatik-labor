// DIESE DATEI WIRD VON MAX IMPLEMENTIERT (Auth & Infrastruktur)
// Sie ist hier bereits als Platzhalter, wird aber von Max mit echtem JWT-Code gefüllt

/*
import jwt from 'jsonwebtoken';

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
*/
