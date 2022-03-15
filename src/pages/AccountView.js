import React from 'react';
import {
    Empty
} from 'antd';

function AccountView() {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            padding: '10px'
        }}>
            <Empty description={false}>
                <h3>This feature will be available soon.</h3>
            </Empty>
        </div>
    );
}

export default AccountView;