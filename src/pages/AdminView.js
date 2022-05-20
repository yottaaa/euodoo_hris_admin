import React from 'react';
import { Layout, Menu} from 'antd';
import {
    InfoCircleOutlined,
    TeamOutlined,
    UserOutlined,
    ExportOutlined,
    ProfileOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import { GlobalContext } from '../store';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminView() {
    const [setGlobal] = React.useContext(GlobalContext);
    const [collapsed, setCollapsed] = React.useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setGlobal({token: '', username: ''});
    }

    return (
            <Layout style={{ minHeight: '100vh' }} hasSider>
                <Sider 
                    collapsible collapsed={collapsed} 
                    onCollapse={() => { setCollapsed(!collapsed) }}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <SubMenu key="sub1" icon={<TeamOutlined />} title="Attendance">
                            {/* <Menu.Item key="3" icon={<QrcodeOutlined />}>
                                <Link to="/scan">Scan QRCode</Link>
                            </Menu.Item> */}
                            <Menu.Item key="1" icon={<ProfileOutlined />}>
                                <Link to="/">Logs</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<ExportOutlined />}>
                                <Link to="/export">Export</Link>
                            </Menu.Item>
                            {/* <Menu.Item key="5" icon={<CalculatorOutlined />}>
                                <Link to="/calculator">Calculator</Link>
                            </Menu.Item> */}
                        </SubMenu>
                        <SubMenu key="sub2"  icon={<UserOutlined />} title="Account">    
                            <Menu.Item key="3" icon={<UserOutlined />}>
                                <Link to="/account">Admin</Link>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleLogout}>
                                Logout
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="4" icon={<InfoCircleOutlined />}>
                        About
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: (collapsed ? 80:200) }}>
                    <Header className="site-layout-background" style={{ 
                        position: 'fixed', zIndex: 1, width: '100%' 
                    }}/>
                    <Content style={{ margin: '80px 16px' }}>
                        <Outlet/>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}> ©2022 Euodoo Technologies Inc.</Footer>
                </Layout>
            </Layout>
    );
}

export default AdminView;