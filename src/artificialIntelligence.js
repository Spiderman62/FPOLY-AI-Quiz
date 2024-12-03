import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
const API_KEY = 'AIzaSyCaCPMC-s8mBNVbtYtPmfxD4-hjnSXLG4Q';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
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
	// async text(prompt, callback) {
	// 	try {
	// 		const text = await model.generateContent(prompt);
	// 		callback(JSON.parse(text.response.text()));
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// },

	historyChatMessage() {
		const chat = model.startChat({
			history: [
				{
					role: "user",
					parts: [{ text: "" }],
				},
				{
					role: "model",
					parts: [{ text: "" }],
				},
			],
		});
		return async (prompt, callback) => {
			try {
				let result = await chat.sendMessage(prompt);
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
