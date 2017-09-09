import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,Link,browserHistory} from 'react-router';
import {Row, Col } from 'antd';
import {Menu, Icon, Tabs,
				message,
				Form,
				Input,
				Button,
				CheckBox,
				Modal
				} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

class MobileHeader extends React.Component{

	constructor(props) {
			super(props);
			this.state = {
				current: "top",
				modalVisible: false,
				action: 'login',
				hasLogined: false,
				userNickName: '',
				userid: 0
			};
		}
	setModalVisible(value){
		this.setState({modalVisible:value});
	};
	componentWillMount() {
		if (localStorage.userid != '') {
			this.setState({hasLogined: true});
			this.setState({userNickName: localStorage.userNickName, userid: localStorage.userid});
		}
	}
	handleClick(e){
		if (e.key == "register"){
			this.setState({current:'register'});
			this.setModalVisible(true);
		}
		else{
			{ this.setState({current:e.key}) };	
		}
	};

	handleSubmit(e){
		// 頁面開始向API進行提交
		e.preventDefault();
		var myFetchOptions = {
			method:'GET'
		};
		var formData = this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="+formData.password+"&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions).
			then(response=>response.json()).then(json=>{
				this.setState({userNickName:json.NickUserName,userid:json.UserId});
			});
			if(this.state.action=='login'){
				this.setState({hasLogined:true});
			}
		message.success('請求成功!');
		this.setModalVisible(false);
	};
	// showModal
	login(){
		this.setModalVisible(true);
	};

	callback(key){
		if(key==1)
		{
			this.setState({action:'login'});
		}
		else if (key==2)
		{
			this.setState({action:'register'});
		}
	};

	logout(){
		localStorage.userid = '';
		localStorage.userNickName = '';
		this.setState({hasLogined:false});
	};

	render(){
		//取得全局form表單參數
		let {getFieldProps} = this.props.form;

		// 判斷登入未登入狀態圖示
		const userShow = this.state.hasLogined?
		<Link to={`usercenter`}>
			<Icon type="inbox"/>
		</Link>
		:
		<Icon type="setting" onClick={this.login.bind(this)}/>


		return(
			<div id="mobileheader">
				<header>
					<a href="/">
						<img src="./src/images/iconNews.png" alt="logo"/>
						<span>ReactNews</span>
					</a>
					{userShow}
				</header>

				{/*登入/註冊框，預設隱藏*/}
				<Modal title="用戶中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="關閉">
					<Tabs type="card" onChange={this.callback.bind(this)}>

					<TabPane tab="登入" key="1">
						<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
							<FormItem label="帳戶">
								<Input placeholder="請輸入您的帳號" {...getFieldProps('userName')}/>
							</FormItem>
							<FormItem label="密碼">
								<Input type="password" placeholder="請輸入您的密碼" {...getFieldProps('password')}/>												
							</FormItem>
							<Button type="primary" htmlType="submit">登入</Button>
						</Form>
					</TabPane>

						<TabPane tab="註冊" key="2">
							<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="帳戶">
									<Input placeholder="請輸入您的帳號" {...getFieldProps('r_userName')}/>
								</FormItem>
								<FormItem label="密碼">
									<Input type="password" placeholder="請輸入您的密碼" {...getFieldProps('r_password')}/>												
								</FormItem>
								<FormItem label="確認密碼">
									<Input type="password" placeholder="請再次輸入您的密碼" {...getFieldProps('r_confirmPassword')}/>												
								</FormItem>
								<Button type="primary" htmlType="submit">註冊</Button>
							</Form>
						</TabPane>
					</Tabs>
				</Modal>

			</div>
			);
	}
} 

export default MobileHeader = Form.create({})(MobileHeader);