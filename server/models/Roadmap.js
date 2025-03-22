import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  title: String,
  description: String,
  keywords: [String],
  free_courses: [String],
  paid_courses: [String],
});

const roadmapSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  roadmap:{
    title: String,
    description: String,
    learnt_tech: [String],
    roadmap_steps: [stepSchema],
  }
}, { timestamps: true });

export default mongoose.model('Roadmap', roadmapSchema);
