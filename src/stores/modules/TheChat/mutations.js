export default{
	addHistory(state,payload){
		state.history.unshift(payload);
	}
}