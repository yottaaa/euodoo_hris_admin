import React from 'react';
import { 
    Card,Form, Input, 
    Button, Alert 
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { GlobalContext } from '../store'
import { BACKEND_URL } from '../assets/config';
import axios from 'axios';

export default function LoginView() {
    const [global, setGlobal] = React.useContext(GlobalContext);
    const [error, setError] = React.useState('')

    const onFinish = (values) => {
        setError('');
        setGlobal({isLoading: true});
        (async () => {
            axios({
                method: 'post',
                url: `https://euodoo-attendance.herokuapp.com/api/v1/auth/admin_login/`,
                data: {
                    'username': values.username,
                    'password': values.password
                }
            }).then((res) => {
                setGlobal({token: res.data['token'],isLoading: false});
                localStorage.setItem('token',res.data['token']);
                localStorage.setItem('userData',JSON.stringify(res.data['user']));
            }).catch((err) => {
                setError('Seems like you are trying to login as an admin, are you authorized? Please try again.');
                setGlobal({isLoading: false});
            })
        })();
    };
    
    const onFinishFailed = (errorInfo) => {
        setError(errorInfo)
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{
            width: '100%', height: '100vh', 
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', backgroundColor: '#F7F7F7'
        }}>
            <Card style={{ width: '400px' }}>
                {
                    error !== '' ? 
                    <Alert message={error} type="error" style={{ marginBottom: '20px' }} />
                    :
                    <></>
                }
                <Form
                    name="normal_login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input 
                            prefix={<UserOutlined/>} 
                            placeholder="Username" 
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={global.isLoading}>
                            Log in
                        </Button>
                    </Form.Item>

                </Form>
            </Card>
        </div>
    );
}