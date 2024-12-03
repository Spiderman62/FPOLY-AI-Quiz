export default{
	async addQuestions(context,payload){
		context.commit('addQuestions',payload)
	}
}