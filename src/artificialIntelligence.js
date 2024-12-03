import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash" });
const schema = {
	type: SchemaType.ARRAY,
	items: {
		type: SchemaType.OBJECT,
		properties: {
			id:{
				type:SchemaType.INTEGER,
				nullable:false
			},
			question: {
				type: SchemaType.STRING,
				nullable: false,
			},
			answers:{
				type:SchemaType.ARRAY,
				nullable:false,
				items:{
					type:SchemaType.STRING,
				},
				minItems:4,
				maxItems:4
			},
			correctAnswer:{
				type:SchemaType.STRING,
				nullable:false
			}
		},
		required: ['question','answers','correctAnswer','id'],
	},
};
const modelJson = genAI.getGenerativeModel({ model: 'gemini-1.5-flash',generationConfig:{
	responseMimeType:'application/json',
	responseSchema:schema
}});
export default {
	historyChatMessage() {
		const chat = model.startChat({
			history: [
				{
					role: "user",
					parts: [{ text: "I am a user" }],
				},
				{
					role: "model",
					parts: [{ text: "Hi user, How can i help you?" }],
				},
			],
		});
		return async (prompt, callback) => {

			try {
				let result =  await chat.sendMessage(prompt);
				callback(result.response.text());
			} catch (err) {
				callback(err);
			}
		}
	},
	async createQuestionByJson(prompt, callback) {
		try {
			const response = await modelJson.generateContent(prompt + "|| IMPORTANT: answers không được chứa A, B, C, D");
			callback(await JSON.parse(response.response.text()));
		} catch (error) {
			console.log(error);
		}
	}
}
