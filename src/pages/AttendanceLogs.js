import React from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../assets/config';
import { Table, Tag, Space, Input,
    Button,
    Select,
    DatePicker 
} from 'antd';
import { GlobalContext } from '../store';
import dateFormat from "dateformat";
import CsvDownload from 'react-json-to-csv';


function AttendanceLogs() {
    const [global] = React.useContext(GlobalContext);
    const [employees, setEmployees] = React.useState([]);
    const [employee, setEmployee] = React.useState('');
    const [dateRange ,setDateRange] = React.useState([]);
    const [logs, setLogs] = React.useState([]);
    const [exportData, setExportData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [filename, setFilename] = React.useState('');

    React.useEffect(() => {
        (async () => {
            await axios({
                method: 'get',
                url: `https://euodoo-attendance.herokuapp.com/api/v1/attendance/all/`,
                headers: {
                    'Authorization': `token ${global.token}`
                }
            }).then((res) => {
                console.log(res.data)
                handleExportData(res.data)
                setLogs(res.data)
            }).catch((err) => {
                console.log(err)
            })
            await axios({
                method: 'get',
                url: `https://euodoo-attendance.herokuapp.com/api/v1/attendance/users/`,
                headers: {
                    'Authorization': `token ${global.token}`
                }
            }).then((res) => {
                setEmployees(res.data)
            }).catch((err) => {
                console.log(err)
            })
        })();

        return () => {
            setLogs([])
        }
    },[]);

    const columns = [
        {
          title: 'Employee',
          dataIndex: 'employee',
          key: 'employee',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: status => (
            <Tag color={status === 'TIMEIN' ? 'green' : 'volcano'} key={status}>
                {status}
            </Tag>
          ),
        },
        {
          title: 'Datetime',
          dataIndex: 'date_created',
          key: 'date_created',
          render: date_created => (<>
            {dateFormat(new Date(date_created), "dddd | mmmm dS, yyyy | hh:MM TT")}
          </>)
        },
      ];

    const handleExportData = (data) => {
        var exData = [];
        data.forEach(info => {
            exData.push({
                'id': info['id'],
                'employee': info['employee'],
                'date_created': dateFormat(new Date(info['date_created']), "d-mm-yyyy"),
                'time_created': dateFormat(new Date(info['date_created']), "hh:MM TT")
            })
        });
        setExportData(exData)
    }

    const handleDatePicker = (value, dateString) => {
        console.log(dateString);
        setDateRange(dateString);
    }

    const handleSelect = (value) => {
        console.log(value);
        setEmployee(value);
    }

    const handleRefresh = () => {
        setLoading(true);
        (async () => {
            await axios({
                method: 'get',
                url: `https://euodoo-attendance.herokuapp.com/api/v1/attendance/all/`,
                headers: {
                    'Authorization': `token ${global.token}`
                }
            }).then((res) => {
                handleExportData(res.data)
                console.log(res.data)
                setLogs(res.data)
                setLoading(false);
            }).catch((err) => {
                console.log(err)
                setLoading(false);
            })
        })();
    }

    const handleFilterSearch = () => {
        setLoading(true);
        (async () => {
            axios({
                method: 'post',
                url: `https://euodoo-attendance.herokuapp.com/api/v1/attendance/filter/`,
                headers: {
                    'Authorization': `token ${global.token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    "employee": employee,
                    "date_range": dateRange
                }
            }).then((res) => {
                setLogs(res.data)
                handleExportData(res.data)
                // calculateHours(res.data)
                console.log(res.data)
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            })
        })();
    }

    return (
        <div style={{
            width: '100%',
            backgroundColor: '#fff',
            padding: '10px'
        }}>
            <Input.Group compact style={{ margin: '10px 0px' }}>
                <Select defaultValue="Select Employee" onChange={handleSelect} style={{ width: '30%' }}>
                    {employees.map(employee => (
                        <Select.Option key={employee.id} value={employee.username}>{employee.username}</Select.Option>
                    ))}
                </Select>
                <DatePicker.RangePicker onChange={handleDatePicker} style={{ width: '60%' }} />
                <Button type="primary" onClick={handleFilterSearch} style={{ width: '10%' }}
                    loading={loading}
                >Search</Button>
            </Input.Group>
            {/* <h1>8 Hours</h1> */}
            <Table columns={columns} dataSource={logs} />
            <CsvDownload data={exportData} filename={'euodoo_dtr.csv'} style={{
                margin: '0px 20px',
                background: '#B33030',
                cursor: 'pointer',
                outline: 'none',
                border: 0,
                padding: '4px 20px'
            }}>
                Export Data
            </CsvDownload>
            <Button type="default" 
                onClick={handleRefresh} 
                style={{ width: '10%', background: '#F0A500' }}
                loading={loading}
            >Refresh</Button>
        </div>
    );
}

export default AttendanceLogs;