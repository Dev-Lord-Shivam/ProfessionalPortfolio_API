import express from 'express';
import { getPortfolio, updatePortfolio } from '../controllers/portfolioController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Portfolio
 *   description: Portfolio content — public read, protected write
 */

/**
 * @swagger
 * /api/portfolio:
 *   get:
 *     summary: Get the full portfolio document
 *     description: Returns the complete portfolio data (home, about, experiences, projects, skills). No authentication required — this powers the public-facing portfolio site.
 *     tags: [Portfolio]
 *     responses:
 *       200:
 *         description: Portfolio data returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Portfolio'
 *       500:
 *         description: Server or database error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', getPortfolio);

/**
 * @swagger
 * /api/portfolio:
 *   post:
 *     summary: Update the portfolio document (Admin only)
 *     description: Replaces the portfolio data in MongoDB. **Requires a valid Bearer JWT token** obtained from `POST /api/auth/login`.
 *     tags: [Portfolio]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Portfolio'
 *     responses:
 *       200:
 *         description: Portfolio updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Portfolio sync completed successfully!
 *                 data:
 *                   $ref: '#/components/schemas/Portfolio'
 *       401:
 *         description: No token provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server or database error
 */
router.post('/', verifyToken, updatePortfolio);

export default router;
