import React from 'react';
import QRCode from 'qrcode';
import axios from 'axios';
import { BACKEND_URL } from '../assets/config';
import { GlobalContext } from '../store';
import dateFormat from "dateformat";

export default function AttendanceScan() {
    const [global, setGlobal] = React.useContext(GlobalContext);
    const [src, setSrc] = React.useState('');

    React.useEffect(() => {
        axios.get(
            `${BACKEND_URL}/api/v1/attendance/generate_qr/`,
            {
                headers: {
                    'Authorization':`token ${global.token}`
                }
            }
        ).then((res) => {
            console.log(res.data['code']);
            QRCode.toDataURL(res.data['code']).then(setSrc);
        }).catch((err) => {
            alert(err);
        })
        
    }, []);

    return (
        <div style={{ 
            width: '100%', height: '100%', 
            backgroundColor: '#fff', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column' 
        }}>
            <h1 style={{ fontSize: '1.8rem', color: '#270082', fontWeight: 'bold' }}>Scan the QRCode</h1>
            <img src={src} style={{ width: '200px' }} alt="qrcode"/>
            <h3>Attendance for <span style={{ color: '#D82148' }}>{dateFormat(new Date(), "dddd, mmmm dS, yyyy")}</span></h3>
        </div>
    );
}