// import React from 'react';
// import {
//   Input,
//   Button,
//   Select,
//   DatePicker,
//   Table,
//   Tag,
//   Empty
// } from 'antd';
// import dateFormat from "dateformat";
// import axios from 'axios';
// import { BACKEND_DEV } from '../assets/config';
// import { GlobalContext } from '../store';

// function AttendanceCalculate() {
//     const [global, setGlobal] = React.useContext(GlobalContext);
//     const [employees, setEmployees] = React.useState([]);
//     const [employee, setEmployee] = React.useState('');
//     const [dateRange ,setDateRange] = React.useState([]);
//     const [logs, setLogs] = React.useState([]);
//     const [totalHours, setTotalHours] = React.useState(0.0);

//     React.useState(() => {
//         (async () => {
//             await axios({
//                 method: 'get',
//                 url: `${BACKEND_DEV}/api/v1/attendance/users/`,
//                 headers: {
//                     'Authorization': `token ${global.token}`
//                 }
//             }).then((res) => {
//                 setEmployees(res.data)
//             }).catch((err) => {
//                 console.log(err)
//             })
//         })();
//     },[setEmployees]);

//     const columns = [
//         {
//           title: 'Employee',
//           dataIndex: 'employee',
//           key: 'employee',
//         },
//         {
//           title: 'Status',
//           dataIndex: 'status',
//           key: 'status',
//           render: status => (
//             <Tag color={status === 'TIMEIN' ? 'green' : 'volcano'} key={status}>
//                 {status}
//             </Tag>
//           ),
//         },
//         {
//           title: 'Datetime',
//           dataIndex: 'date_created',
//           key: 'date_created',
//           render: date_created => (<>
//             {dateFormat(new Date(date_created), "dddd | mmmm dS, yyyy | hh:MM TT")}
//           </>)
//         },
//       ];

//     const calculateHours = (data) => {
//         var start = new Date;
//         var end = new Date;
//         var total = 0.0;
//         var listAttend = {};
//         var count = 0;
//         data.forEach(element => {
//             if (listAttend[count].length === 2) {
//                 count += 1;
//             } else if (listAttend[count].length === 0) {
//                 if (element['status'] === 'TIMEIN') {
//                     start = new Date(element['status'])
//                 }
//             }
//         });
        
//     }

//     const handleDatePicker = (value, dateString) => {
//         console.log(dateString);
//         setDateRange(dateString);
//     }

//     const handleSelect = (value) => {
//         console.log(value);
//         setEmployee(value);
//     }

//     const handleFilterSearch = () => {
//         console.log("hello")
//         (async () => {
//             axios({
//                 method: 'post',
//                 url: `${BACKEND_DEV}/api/v1/attendance/filter/`,
//                 headers: {
//                     'Authorization': `token ${global.token}`,
//                     'Content-Type': 'application/json'
//                 },
//                 data: {
//                     "employee": employee,
//                     "date_range": dateRange
//                 }
//             }).then((res) => {
//                 // setLogs(res.data)
//                 // calculateHours(res.data)
//                 console.log("hello")
//             }).catch((err) => {
//                 console.log(err);
//             })
//         })();
//     }

//     return (
//         <div style={{
//             width: '100%',
//             backgroundColor: '#fff',
//             padding: '10px'
//         }}>
//             {/* <Empty description={false}>
//                 <h3>This feature will be available soon.</h3>
//             </Empty> */}
//             <Input.Group compact style={{ margin: '10px 0px' }}>
//                 <Select defaultValue="Select Employee" onChange={handleSelect} style={{ width: '30%' }}>
//                     {employees.map(employee => (
//                         <Select.Option key={employee.id} value={employee.username}>{employee.username}</Select.Option>
//                     ))}
//                 </Select>
//                 <DatePicker.RangePicker onChange={handleDatePicker} style={{ width: '60%' }} />
//                 <Button type="primary" onClick={handleFilterSearch} style={{ width: '10%' }}>Search</Button>
//             </Input.Group>
            
//             <Table columns={columns} dataSource={logs}/>
//         </div>
//     );
// }

// export default AttendanceCalculate;