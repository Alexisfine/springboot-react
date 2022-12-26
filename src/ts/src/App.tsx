import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Table, 
  Avatar,
  Spin, 
  Modal
  } from 'antd';
import {LoadingOutlined} from '@ant-design/icons'  
import './App.css';
import {getAllStudents} from './client';
import { IStudent } from './dataTypes';
import Container from './components/Container';
import Footer from './components/Footer';
import AddStudentForm from './components/forms/AddStudentForm';

function App() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(()=>{
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/students');
        setStudents(res.data);
        setLoading(false);

      } catch (err) {
        console.log(err); 
      }
    }
    fetchStudents();
  },[])

  const columns = [
    {
      title: '',
      key: 'avatar',
      render: (text:string, student:IStudent) => (
        <Avatar size='large' >
          {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}
          `}
        </Avatar>
      )
    },
    {
      title: 'Student Id',
      dataIndex:'studentId',
      key: 'studentId'
    }, 
    {
      title: 'First Name',
      dataIndex:'firstName',
      key: 'firstName'
    }, 
    {
      title: 'Last Name',
      dataIndex:'lastName',
      key: 'firstlastNameName'
    },
    {
      title: 'Email',
      dataIndex:'email',
      key: 'email'
    },
    {
      title: 'Gender',
      dataIndex:'gender',
      key: 'gender'
    },]

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  
  
  return (
    <>
      {loading ? 
        (<Container>
            <Spin indicator={antIcon}></Spin>
        </Container>)
        : (<Container> 
            <Table
              style={{marginBottom: '100px'}} 
              dataSource={students}  
              columns={columns}
              rowKey='studentId'
              pagination={false}/>
          </Container>)}
        <Modal title='Add new student' visible={modalVisible}  open={modalVisible}
          onOk={e=>setModalVisible(false)} onCancel={e=>setModalVisible(false)}   width={1000}> 
          <AddStudentForm onSuccess={()=>{
            setModalVisible(false);
            const fetchStudents = async () => {
              setLoading(true);
              try {
                const res = await axios.get('/students');
                setStudents(res.data);
                setLoading(false);
        
              } catch (err) {
                console.log(err); 
              }
              }
            fetchStudents()}}/>
        </Modal>  
        <Footer numberOfStudents={students.length} setModalVisible={setModalVisible}/>
    </>
  ); 
}

export default App;
