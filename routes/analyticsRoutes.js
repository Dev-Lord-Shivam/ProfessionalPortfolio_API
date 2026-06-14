import express from 'express';
import { getAnalytics, incrementVisitor } from '../controllers/analyticsController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Visitor statistics — protected read, public increment
 */

/**
 * @swagger
 * /api/analytics:
 *   get:
 *     summary: Get visitor analytics (Admin only)
 *     description: Returns total visitor count and 7-day daily history. **Requires a valid Bearer JWT token.**
 *     tags: [Analytics]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics data returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Analytics'
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
router.get('/', verifyToken, getAnalytics);

/**
 * @swagger
 * /api/analytics/increment:
 *   post:
 *     summary: Increment visitor count for today
 *     description: Called automatically on every portfolio page load to track unique daily visits. No authentication required.
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Visitor count incremented successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 totalCount:
 *                   type: integer
 *                   example: 1385
 *                 history:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/VisitorHistory'
 *       500:
 *         description: Server or database error
 */
router.post('/increment', incrementVisitor);

export default router;
