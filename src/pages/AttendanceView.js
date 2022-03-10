import React from 'react';
import QRCode from 'qrcode';
import axios from 'axios';
import { authData } from '../assets/authData';

export default function AttendanceView() {
    const [src, setSrc] = React.useState('');

    React.useEffect(() => {
        axios.get(
            'http://127.0.0.1:8000/api/v1/attendance/generate_qr/',
            {
                headers: {
                    'Authorization':`token ${authData['token']}`
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
        <div>
            <img src={src} alt="qrcode"/>
        </div>
    );
}