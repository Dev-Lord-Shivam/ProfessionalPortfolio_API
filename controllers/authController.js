import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

/**
 * POST /api/auth/login
 * Validates the admin password and returns a signed JWT token.
 * Public endpoint — no token required.
 */
// export const login = (req, res) => {
//   const { password } = req.body;
//   const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

//   if (!password) {
//     return res.status(400).json({ success: false, message: 'Password is required.' });
//   }

//   if (password !== ADMIN_PASSWORD) {
//     return res.status(401).json({ success: false, message: 'Invalid Admin Credentials.' });
//   }

//   // Sign a JWT token valid for 8 hours
//   const token = jwt.sign(
//     { role: 'admin' },
//     process.env.JWT_SECRET,
//     { expiresIn: '8h' }
//   );

//   return res.json({ success: true, token });
// };

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ success: false, message: "invalid username or password" })

    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({ success: true, token });

  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log(`Error in loginUser: ${error.message}`)
  }
}
