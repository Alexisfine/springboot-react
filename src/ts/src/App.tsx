import axios, { AxiosError } from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Table, 
  Avatar,
  Spin, 
  Modal
  } from 'antd';
import { errorNotification } from './components/Notification';  
import {LoadingOutlined} from '@ant-design/icons'  
import './App.css';
import {getAllStudents} from './client';
import { IStudent } from './dataTypes';
import Container from './components/Container';
import Footer from './components/Footer';
import AddStudentForm from './components/forms/AddStudentForm';
import {ApiAxiosError} from './dataTypes';

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
        if (err instanceof AxiosError) {
          console.log(err.response!.data);
          const errorData = err.response?.data;
          let apiErrorData = errorData as ApiAxiosError
          errorNotification(apiErrorData.message, apiErrorData.httpStatus)
        } else {
          console.log(err); 
        }
        setLoading(false);
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
          <AddStudentForm 
          onSuccess={()=>{
            setModalVisible(false);
            const fetchStudents = async () => {
              setLoading(true);
              try {
                const res = await axios.get('/students');
                setStudents(res.data);
                setLoading(false);
        
              } catch (err) {
                if (err instanceof AxiosError) {
                  console.log(err.response!.data);
                  const errorData = err.response?.data;
                  let apiErrorData = errorData as ApiAxiosError
                  errorNotification(apiErrorData.message, apiErrorData.httpStatus)
                } else {
                  console.log(err); 
                }
                setLoading(false);
              }
              }
            fetchStudents()}}
          onFailure = {(err) => {
            const errorData = err.response?.data;
            console.log(errorData);
            let apiErrorData = errorData as ApiAxiosError
            errorNotification(apiErrorData.message, apiErrorData.httpStatus)
            
          }}  />
        </Modal>  
        <Footer numberOfStudents={students.length} setModalVisible={setModalVisible}/>
    </>
  ); 
}

export default App;
