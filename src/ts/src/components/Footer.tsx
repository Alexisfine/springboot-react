import React from 'react'
import Container from './Container'
import {Avatar, Button} from 'antd';
import './Footer.css'

interface FooterProps {
  numberOfStudents? : number 
  setModalVisible : (bool:boolean) => void
}

const Footer = ({numberOfStudents, setModalVisible}:FooterProps) => {
  return (
    <div className='footer'>
        <Container>
            {numberOfStudents ?
             <Avatar size='large' style={{backgroundColor:'#f56a00', marginRight:'5px'}}>{numberOfStudents}</Avatar> : ''}
            <Button type='primary' onClick={()=>setModalVisible(true)}>Add new student +</Button>
        </Container>
    </div>
  )
}

export default Footer;
