export default [
	{
		path:'/',component:()=> import('../pages/Dashboard.vue'),children:[
			{path:'the-chat',name:'dashboard-chat',component:()=>import('../components/TheChat.vue')},
			{path:'the-quetion',name:'dashboard-question',component:()=>import('../components/TheCreateQuestion.vue')},
			{path: 'the-score',name:'dashboard-score',component:()=>import('../components/TheScore.vue')},
		]
	}
]