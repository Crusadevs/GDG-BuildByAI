import User from '../models/User.js';
import Roadmap from '../models/Roadmap.js';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });


  async function getBestRoadmapsFromOpenAI(roadmaps, userProfile) {
    const prompt = `
  Users experience is the next
  ${JSON.stringify(userProfile.experiencedLanguages, null, 2)}
  
  From the following list of roadmaps, select the 3 most relevant ones for this user, considering that he wants to learn ${userProfile.learningGoal}
  Here is the list of roadmaps:
  ${JSON.stringify(roadmaps, null, 2)}

    Return to me an array with the 3 best roadmaps from the list, without aditional content, just the array
  `;
  
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9,
      max_tokens:2000
    });  
    const text = chatResponse.choices[0].message.content;
    try {
      return JSON.parse(text)
    } catch (error) {
      console.error('Failed to parse OpenAI response:', text);
      throw new Error('OpenAI response parsing failed.');
    }
  }

  async function getRoadmapStructure(roadmap,userProfile){
    const prompt = `
    I need you to generate a roadmap for ${roadmap}, for our user that has the next experience:
    ${userProfile}
    The response should be a JSON structured like this:
    roadmap:{
	title:String,
	description:String,
	learnt_tech:[String],
	roadmap_steps:[{
		title:String,
		description:String,
		keywords:[String],
		free_courses:[String],
		paid_courses:[String]
}]
}
    Return to me only the JSON, be sure to include atleast 5 roadmap steps and also add real links for free and premium courses, dont write other text than the JSON
    `
    const chatResponse = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.9,
        max_tokens:2000
      });  
      const text = chatResponse.choices[0].message.content;
      console.log(text)
      try {
        return JSON.parse(text)
      } catch (error) {
        console.error('Failed to parse OpenAI response:', text);
        throw new Error('OpenAI response parsing failed.');
      }
  }

export const submitUser = async (req, res) => {
  try {
    const { username, email, userProfile } = req.body;
    // 2. Prepare input for OpenAI
    const predefinedRoadmaps = [
        "Frontend Web Developer Roadmap",
        "Backend Developer Roadmap",
        "Full Stack Developer Roadmap",
        "Mobile App Developer Roadmap",
        "DevOps Engineer Roadmap",
        "Machine Learning Engineer Roadmap",
        "Data Scientist Roadmap",
        "AI/ML Researcher Roadmap",
        "Cybersecurity Analyst Roadmap",
        "Cloud Engineer Roadmap",
        "Blockchain Developer Roadmap",
        "Game Developer Roadmap",
        "AR/VR Developer Roadmap",
        "UI/UX Designer Roadmap",
        "Data Engineer Roadmap",
        "Site Reliability Engineer Roadmap",
        "Software Architect Roadmap",
        "Embedded Systems Engineer Roadmap",
        "Quantum Computing Roadmap",
        "Tech Product Manager Roadmap"
      ];
      ; // load from JSON or define statically
    const selectedRoadmaps = await getBestRoadmapsFromOpenAI(predefinedRoadmaps, userProfile);
    console.log(selectedRoadmaps)
    await Promise.all(
        selectedRoadmaps.map(async (element) => {
          const roadmap = await getRoadmapStructure(element, userProfile);
          console.log(roadmap.roadmap);
          const saved_roadmap = await Roadmap.insertOne({
            user_id: user._id,
            roadmap:roadmap.roadmap,
          });
        })
      );
      
      const user = await User.create({ username, email, userProfile});
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

