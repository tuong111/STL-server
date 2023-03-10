import {
    LogoutOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu } from 'antd';
import React, {  useEffect, useState } from 'react';
import Addclass from '../Components/AddClass';
import AddUser from '../Components/AddUser';
import Listuser from '../Components/ListUser';
import Listclass from '../Components/ListClass';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../store/auth/authSlice';
const { Header, Content, Footer, Sider } = Layout;


function getItem(label, key, icon, children, navigate) {
    return {
        key,
        icon,
        children,
        label,
        navigate
    };
}

const items = [
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Thêm', '2', '', null, <AddUser />),
        getItem('Danh sách', '3', '', null, <Listuser />),
    ]),
    getItem('Tai lieu', 'sub2', <TeamOutlined />, [getItem('Them tai lieu', '5'), getItem('Danh sach tai lieu', '6')]),
];

const listComponentRender = [
    getItem('Thêm', '2', '', null, <AddUser />),
    getItem('Danh sách', '3', '', null, <Listuser />),
    // getItem('Them lop hoc', '5', '', null, <Addclass />),
    // getItem('Danh sach lop hoc', '6', '', null, <Listclass />)
]




const Home = () => {
    const isLogin = useSelector(state => state.auth.isLogin)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!isLogin) {
            navigate('./login')
        }
    }, [isLogin,navigate])
    const [collapsed, setCollapsed] = useState(false);
    const [componentLayout, setComponentLayout] = useState(<AddUser />)
    const [element, setElement] = useState('Người dùng')
    const [breakcum, setBreakcum] = useState('Thêm')
    const handleMenuClick = (e) => {
        for (let item of listComponentRender) {
            if (item.key === e.key) {
                setComponentLayout(item.navigate)
                setElement(e.keyPath[1])
                setBreakcum(item.label)
            }
        }
    }
    return (
                <Layout
                    style={{
                        minHeight: '100vh',
                    }}
                >

                    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleMenuClick} />
                        <div className='logout-btn'>
                        <Button block style={{
                            backgroundColor : 'red',
                            marginTop : 20
                        }} onClick={()=> dispatch(logOut())}> <LogoutOutlined />Thoát</Button>
                        </div>
                    </Sider>
                    <Layout className="site-layout">
                        <Header
                            className="site-layout-background"
                            style={{
                                padding: 0,
                            }}
                        ><h1 style={{ color: 'red', fontSize: 30, textAlign: 'center' }}>DOCUMENT SHARE ADMIN PAGE</h1>
                        </Header>
                        <Content
                            style={{
                                margin: '0 16px',
                            }}
                        >
                            <Breadcrumb
                                style={{
                                    margin: '16px 0',
                                }}
                            >
                                <Breadcrumb.Item>{element === 'sub1' ? 'User' : 'Class'}</Breadcrumb.Item>
                                <Breadcrumb.Item>{breakcum}</Breadcrumb.Item>
                            </Breadcrumb>
                            <div
                                className="site-layout-background"
                                style={{
                                    padding: 0,
                                    textAlign: 'left'
                                }}
                            >
                                {componentLayout}
                            </div>
                        </Content>
                        <Footer
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            Thiết kế bởi : builinhduong43@gmail.com
                        </Footer>
                    </Layout>
                </Layout>
    );
};

export default Home;