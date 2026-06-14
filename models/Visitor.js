import mongoose from 'mongoose';

const VisitorSchema = new mongoose.Schema({
  totalCount: { type: Number, default: 1384 },
  history: [
    {
      date: String,
      visitors: Number,
    },
  ],
});

const Visitor = mongoose.model('Visitor', VisitorSchema);

export default Visitor;
