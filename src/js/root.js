import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import { Button } from 'antd';

import PCIndex from './components/pc_index';
import PCNewsDetails from './components/pc_news_details';
import PCUserCenter from './components/pc_usercenter';
import MobileIndex from './components/mobile_index'
import MobileNewsDetails from './components/mobile_news_details';
import MobileUserCenter from './components/mobile_usercenter';


import 'antd/dist/antd.css';  
import MediaQuery from 'react-responsive';

//redux
import {createStore} from 'redux';
import reducer from './reducers';
//-----
export default class Root extends React.Component{

	//---redux
	// inc(){
	// 	return{type:'ADD'};
	// }
	// dec(){
	// 	return{type:'SUB'};	
	// }
	// componentDidMount(){
	// 	//初始化，傳遞的參數是reducer
	// 	var store =createStore(reducer);

	// 	console.log(store.getState());

	// 	store.dispatch(this.inc());
	// 	console.log(store.getState());

	// 	store.dispatch(this.inc());
	// 	console.log(store.getState());

	// 	store.dispatch(this.dec());
	// 	console.log(store.getState());

	// }
	//-------
	render(){
		return(
			 <div>
				 <MediaQuery query='(min-device-width: 1224px)'>

				 <Router history={hashHistory}>
				 		<Route path="/" component={PCIndex}></Route>{/*默認<PCIndex/>*/}
				 		<Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
				 		<Route path="/usercenter" component={PCUserCenter}></Route>
				 </Router>
				
				 </MediaQuery>
				 <MediaQuery query='(max-device-width: 1224px)'>

				  <Router history={hashHistory}>
				 		<Route path="/" component={MobileIndex}></Route>{/*默認<MobileIndex/>*/}
				 		<Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
				 		<Route path="/usercenter" component={MobileUserCenter}></Route>
				 </Router>
				 
				 </MediaQuery>
		  </div>
			); 
	}
}

ReactDOM.render(
  <Root/>,
  document.getElementById('mainContainer')
  );