import {notification} from 'antd';
import React from 'react'

type notificationType = 'success' | 'info' | 'warning' | 'error';


const openNotificationWithIcon = (
    type:notificationType,
    message: string, 
    description: string) => 
    {
    notification[type]({
        message,
        description,
      });
}

export const successNotification = ( message: string, description:string) => {
    openNotificationWithIcon('success', message, description);
}

export const infoNotification = ( message: string, description:string) => {
    openNotificationWithIcon('info', message, description);
}

export const warningNotification = ( message: string, description:string) => {
    openNotificationWithIcon('warning', message, description);
}
export const errorNotification = ( message: string, description:string) => {
    openNotificationWithIcon('error', message, description);
}


