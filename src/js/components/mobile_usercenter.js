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

import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

export default class MobileUserCenter extends React.Component {

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

	 render(){
		const {usercollection,usercomments} = this.state;
		const usercollectionList = usercollection.length ?
		usercollection.map((uc,index)=>(
				<Card key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`}>查看</a>}>
					<p>{uc.Title}</p>
				</Card>
		))
		:
		'您还没有收藏任何的新闻，快去收藏一些新闻吧。';

	 	const usercommentList = usercomments.length ?
		usercomments.map((comment,index)=>(
				<Card key={index} title={`於 ${comment.datetime} 評論了文章`} extra={<a href={`/#/details/${comment.uniquekey}`}>查看</a>}>
					<p>{comment.Comments}</p>
				</Card>
		))
		:
		'您还没有發表過任何的評論，快去發表一些評論吧。';

		 	return (
				<div>
					<MobileHeader/>
					<Row>
						<Col span={24}>
							<Tabs>
								<TabPane tab="我的收藏列表" key="1">
									<Row>
										<Col span={24}>
											{usercollectionList}
										</Col>
									</Row>
								</TabPane>
								<TabPane tab="我的评论列表" key="2">
									<Row>
										<Col span={24}>
											{usercommentList}
										</Col>
									</Row>
								</TabPane>
								<TabPane tab="头像设置" key="3"></TabPane>
							</Tabs>
						</Col>
					</Row>
					<MobileFooter/>
				</div>
			);
	 }
}