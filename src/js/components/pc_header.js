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

class PCHeader extends React.Component{

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

	componentWillMount(){
		if(localStorage.userid != ''){
			this.setState({hasLogined:true});
			this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
		}
	};

	setModalVisible(value){
		this.setState({modalVisible:value});
	};

	handleClick(e){
		if (e.key == "register")
		{
			this.setState({current:'register'});
			this.setModalVisible(true);
		}
		else
		{
			{ this.setState({current:e.key}) };	
		}
	};

	handleSubmit(e)
	{
		// 頁面開始向API進行提交
		e.preventDefault();
		var myFetchOptions = {
			method:'GET'
		};
		var formData = this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="+formData.password+"&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions).
			then(response=>response.json())
			.then(json=>{this.setState({
				userNickName:json.NickUserName,
				userid:json.UserId
			});
				localStorage.userid = json.UserId;
				localStorage.userNickName = json.NickUserName;
			});
			if(this.state.action=='login')
			{
				this.setState({hasLogined:true});
			}
		message.success('請求成功!');
		this.setModalVisible(false);
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
		let {getFieldProps} = this.props.form;
		const userShow = this.state.hasLogined ? 
		<Menu.Item key="logout" class="register">
			<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
			&nbsp;&nbsp;
				<Link target="_blank" to={`/usercenter`}>
						<Button type="dashed" htmlType="button">個人中心</Button>
				</Link>
			&nbsp;&nbsp;
			<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>登出</Button>
		</Menu.Item>
		:
		<Menu.Item key="register" class="register"><Icon type="appstore"/>註冊/登入</Menu.Item>
		return(
			<header>
				<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href="/" class="logo">
						<img src="./src/images/iconNews.png" alt="logo" />
						<span>ReactNews</span>
						</a>
					</Col>
					<Col span={16}>
						<Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
							<Menu.Item key="top"><Icon type="appstore" />頭條</Menu.Item>
							<Menu.Item key="shehui"><Icon type="appstore" />社會</Menu.Item>
							<Menu.Item key="guonei"><Icon type="appstore" />國內</Menu.Item>
							<Menu.Item key="guoji"><Icon type="appstore" />國際</Menu.Item>
							<Menu.Item key="yule"><Icon type="appstore" />娛樂</Menu.Item>
							<Menu.Item key="tiyu"><Icon type="appstore" />體育</Menu.Item>
							<Menu.Item key="keji"><Icon type="appstore" />科技</Menu.Item>
							<Menu.Item key="shishang"><Icon type="appstore" />時尚</Menu.Item>
							{userShow}
						</Menu>
							{/*登入隱藏框*/}
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


					</Col>
					<Col span={2}></Col>
				</Row>
			</header>
			);
	}
} 

export default PCHeader = Form.create({})(PCHeader);