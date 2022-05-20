import React from "react";
import {
    Input,
    Button,
    Empty,
    DatePicker, 
} from 'antd';

function AttendanceExport() {
    const [dateRange ,setDateRange] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const handleDatePicker = (value, dateString) => {
        console.log(dateString);
        setDateRange(dateString);
    }

    const handleFilterSearch = () => {
        console.log("Clicked!")
    }

    return (
        <div style={{
            width: '100%',
            height: '400px',
            backgroundColor: '#fff',
            padding: '10px'
        }}>
            <Input.Group compact style={{ margin: '10px 0px' }}>
                <DatePicker.RangePicker onChange={handleDatePicker} style={{ width: '90%' }} />
                <Button type="primary" onClick={handleFilterSearch} style={{ width: '10%' }}
                    loading={loading}
                >Search</Button>
            </Input.Group>
            <Empty style={{
                margin: '40px 0px'
            }}/>
        </div>
    );
};

export default AttendanceExport;