import Visitor from '../models/Visitor.js';

/**
 * GET /api/analytics
 * Retrieve total visitor count & daily hit history.
 * PROTECTED — requires valid JWT token (admin only).
 */
export const getAnalytics = async (req, res) => {
  try {
    let analytics = await Visitor.findOne();
    if (!analytics) {
      analytics = await Visitor.create({ totalCount: 1384, history: [] });
    }
    return res.json(analytics);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/analytics/increment
 * Increment the visitor count for today.
 * PUBLIC — called from the portfolio frontend on every page load.
 */
export const incrementVisitor = async (req, res) => {
  try {
    let analytics = await Visitor.findOne();
    if (!analytics) {
      analytics = new Visitor();
    }

    analytics.totalCount += 1;

    const todayLabel = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    const history = analytics.history;
    const lastItem = history[history.length - 1];

    if (lastItem && lastItem.date === todayLabel) {
      lastItem.visitors += 1;
    } else {
      if (history.length >= 7) history.shift();
      history.push({ date: todayLabel, visitors: 1 });
    }

    await analytics.save();
    return res.json({
      success: true,
      totalCount: analytics.totalCount,
      history: analytics.history,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
