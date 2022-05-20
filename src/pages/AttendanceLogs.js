import React from 'react';
import axios from 'axios';
import { BACKEND_DEV, BACKEND_PROD } from '../assets/config';
import { 
    Table, 
    Tag, 
    Space, 
    Input,
    Button,
    Select,
    DatePicker,
    Drawer   
} from 'antd';
import { GlobalContext } from '../store';
import dateFormat from "dateformat";
import CsvDownload from 'react-json-to-csv';

import LogManagement from '../components/LogManagement';


function AttendanceLogs() {
    const [global] = React.useContext(GlobalContext);
    const [totalhours, setTotalHours] = React.useState(0.0)
    const [employees, setEmployees] = React.useState([]);
    const [employee, setEmployee] = React.useState('');
    const [dateRange ,setDateRange] = React.useState([]);
    const [logs, setLogs] = React.useState([]);
    const [exportData, setExportData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [filename, setFilename] = React.useState('');
    const [empID, setEmpID] = React.useState(null);
    const [visible, setVisible] = React.useState(false);

    const [empLog, setEmpLog] = React.useState({
        id: 0,
        emp_uname: '',
        emp_firstname: '',
        emp_lastname: '',
        status: '',
        date_created: ''
    })

    React.useEffect(() => {
        (async () => {
            await axios({
                method: 'get',
                url: `${BACKEND_DEV}/api/v1/attendance/all/`,
                headers: {
                    'Authorization': `token ${global.token}`
                }
            }).then((res) => {
                console.log(res.data)
                handleExportData(res.data)
                setLogs(res.data)
                setFilename('all')
            }).catch((err) => {
                console.log(err)
            })
            await axios({
                method: 'get',
                url: `${BACKEND_DEV}/api/v1/attendance/users/`,
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
            setLogs([]);
            setTotalHours(0.0);
        }
    },[]);

    const closeDrawer = () => {
        setEmpLog({});
        setVisible(false);
    }

    const viewLog = (id) => {
        setEmpID(id);
        (async () => {
            await axios({
                method: 'get',
                url: `${BACKEND_DEV}/api/v1/attendance/log/${id}/`,
                headers: {
                    'Authorization': `token ${global.token}`
                }
            }).then((res) => {
                console.log(res.data)
                setEmpLog(res.data)
                setVisible(true);
            }).catch((err) => {
                console.log(err)
                setVisible(false);
            })
        })();
    }

    const columns = [
        {
          title: 'Employee',
          dataIndex: 'emp_uname',
          key: 'emp_uname',
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
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: id => (<>
                <Button type='primary' onClick={() => viewLog(id)}>
                  View
                </Button>
            </>)
          },
      ];

    const handleExportData = (data) => {
        var exData = [];
        data.forEach(info => {
            exData.push({
                'id': info['id'],
                'employee': `${info['emp_firstname']} ${info['emp_lastname']}`,
                'status': info['status'],
                'date_created (DD/MM/YYYY)': dateFormat(new Date(info['date_created']), "d-mm-yyyy"),
                'time_created': dateFormat(new Date(info['date_created']), "hh:MM TT")
            })
        });
        setExportData(exData);
        setFilename(`${employee}_${dateRange.join('_to_')}`)
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
        setTotalHours(0.0);
        (async () => {
            await axios({
                method: 'get',
                url: `${BACKEND_DEV}/api/v1/attendance/all/`,
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
        setTotalHours(0.0);
        (async () => {
            axios({
                method: 'post',
                url: `${BACKEND_DEV}/api/v1/attendance/filter/`,
                headers: {
                    'Authorization': `token ${global.token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    "employee": employee,
                    "date_range": dateRange
                }
            }).then((res) => {
                setTotalHours(res.data.total)
                setLogs(res.data.logs)
                handleExportData(res.data)
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
                <Select onChange={handleSelect} style={{ width: '30%' }}>
                    {employees.map(employee => (
                        <Select.Option key={employee.id} value={employee.username}>{employee.username}</Select.Option>
                    ))}
                </Select>
                <DatePicker.RangePicker onChange={handleDatePicker} style={{ width: '60%' }} />
                <Button type="primary" onClick={handleFilterSearch} style={{ width: '10%' }}
                    loading={loading}
                >Search</Button>
            </Input.Group>
            { 
                totalhours != 0.0 ?
                (<h1 style={{fontSize: '2.5rem'}}>
                    {totalhours}
                    <span style={{
                        fontSize: '1rem', 
                        marginLeft: '10px',
                        color: '#8D8DAA'
                    }}>total hours</span>
                </h1>)
                :
                <></>
            }
            <Table columns={columns} dataSource={logs} />
            {/* <CsvDownload data={exportData} filename={`${filename}.csv`} style={{
                margin: '0px 20px',
                background: '#B33030',
                cursor: 'pointer',
                outline: 'none',
                border: 0,
                padding: '4px 20px'
            }}>
                Export Data
            </CsvDownload> */}
            <Button type="default" 
                onClick={handleRefresh} 
                style={{ width: '10%', background: '#F0A500' }}
                loading={loading}
            >Refresh</Button>
            <Drawer
                title={`Attendance Log #${empID}`}
                placement={'right'}
                width={300}
                onClose={closeDrawer}
                visible={visible}
            >
                <LogManagement empLog={empLog}/>
            </Drawer>
        </div>
    );
}

export default AttendanceLogs;