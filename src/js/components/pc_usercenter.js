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
				Modal,
				Card,
				notification,
				Upload
				} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

import PCHeader from './pc_header';
import PCFooter from './pc_footer';

export default class PCUserCenter extends React.Component {

	constructor(){
		super();
		this.state = {
			usercollection: '',
			usercomments: '',
			previewImage:'',
			previewVisible:false
		};
	}
	componentDidMount(){

		var myFetchOptions = {
			method: 'GET'
		};

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercollection:json});
		});

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercomments:json});
		});

	};
	 
	 handleCancel(e){
	 	e.preventDefault;
	 	this.setState({previewVisible: false});
	 };

	 render(){

		const props = {
			action: 'http://newsapi.gugujiankong.com/handler.ashx',
			//跨域
			headers: {
				"Access-Control-Allow-Origin":"*"
			},
			listType: 'picture-card',
			defaultFileList:[
				{
					uid:-1,
					name:'xxx.png',
					state: 'done',
					url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
					thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
				}
			],
			onPreview: (file)=>{
				this.setState({previewImage:file.url,previewVisible:true});
			}
		};

		const {usercollection,usercomments} = this.state;
		const usercollectionList = usercollection.length ?
		usercollection.map((uc,index)=>(
				<Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a>}>
					<p>{uc.Title}</p>
				</Card>
		))
		:
		'您还没有收藏任何的新闻，快去收藏一些新闻吧。';

		const usercommentList = usercomments.length ?
		usercomments.map((comment,index)=>(
				<Card key={index} title={`於 ${comment.datetime} 評論了文章 ${comment.uniquekey}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
					<p>{comment.Comments}</p>
				</Card>
		))
		:
		'您还没有發表過任何的評論，快去發表一些評論吧。';

	 	return(
	 		<div>
		 		<PCHeader/>
		 		<Row>
		 			<Col span={2}></Col>
		 			<Col span={20}>
		 				<Tabs>
				 			<TabPane tab="我的收藏列表" key="1">
				 				<div class="comment">
									<Row>
										<Col span={24}>
											{usercollectionList}
										</Col>
									</Row>
								</div>
				 			</TabPane>
				 			<TabPane tab="我的評論列表" key="2">
					 			<div class="comment">
										<Row>
											<Col span={24}>
												{usercommentList}
											</Col>
										</Row>
									</div>
				 			</TabPane>
				 			<TabPane tab="頭像設置" key="3">

					 			<div class="clearfix">
					 				<Upload {...props}>
					 					<Icon type="plus"/>
					 					<div className="ant-upload-text">上傳照片</div>
					 				</Upload>
					 				<Modal visible ={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
										<img alt="預覽" src={this.state.previewImage}/>
									</Modal>
					 			</div>

				 			</TabPane>
				 		</Tabs>
		 			</Col>
		 			<Col span={2}></Col>
		 		</Row>

		 		
		 		<PCFooter/>
	 		</div>
	 		);
	 }
}