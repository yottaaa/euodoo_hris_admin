import React from 'react';
import QRCode from 'qrcode';

export default function AttendanceView({ text }) {
    const [src, setSrc] = React.useState('');

    React.useEffect(() => {
        QRCode.toDataURL(text).then(setSrc);
    }, []);

    return (
        <div>
            <img src={src}/>
        </div>
    );
}