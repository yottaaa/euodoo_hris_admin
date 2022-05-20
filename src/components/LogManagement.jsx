import React from 'react';
import moment from 'moment';
import { 
    Form, Input, 
    Button, DatePicker, 
    TimePicker, Select,
    Space
} from 'antd';

export default function LogManagement({empLog}) {
    const [form] = Form.useForm();

    form.setFieldsValue({
        username: empLog.emp_uname,
        status: empLog.status,
        date_created: moment(empLog.date_created),
        time_created: moment(empLog.date_created)
    })

    const handleEdit = (values) => {
        let date_created = moment(values['date_created']).format('YYYY-MM-DD');
        let time_created = moment(values['time_created']).format('HH:mm');
        let datetime_utc = moment(`${date_created}T${time_created}`,"YYYY-MM-DDTHH:mm").utc(); 
        console.log(datetime_utc.format("YYYY-MM-DDTHH:mm"));
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={(values) => handleEdit(values)}
        >
            <Form.Item
                label="Username"
                name="username"
            >
                <Input disabled/>
            </Form.Item>
            <Form.Item
                name="status"
                label="status"
                rules={[{ required: true, message: 'Status is required' }]}
            >
                <Select placeholder="Select Status">
                    <Select.Option value="timein">TIMEIN</Select.Option>
                    <Select.Option value="timeout">TIMEOUT</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item 
                label="Date Created" 
                name="date_created"
                rules={[{ required: true, message: 'Date is required' }]}
            >
                <DatePicker style={{width: '100%'}} />
            </Form.Item>
            <Form.Item 
                name="time_created" 
                label="Time Created"
                rules={[{ required: true, message: 'Time is required' }]}
            >
                <TimePicker use12Hours style={{width: '100%'}}/>
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                    <Button type="danger">
                        Cancel
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    )
};