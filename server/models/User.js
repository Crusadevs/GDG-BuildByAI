import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  userProfile:{
    experiencedLanguages:[
        {
            language:String,
            level:String,
            frameworks:[
                {
                    name:String,
                    level:String
                }
            ]
        }
    ],
    learningGoal:String
  },
  recommendedRoadmaps:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Roadmap"
  }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);