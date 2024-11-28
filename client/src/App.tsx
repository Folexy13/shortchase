import { Navbar,Message } from "./components"
import './index.css'
import axios from "axios"

import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd'


function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
const [isReg,setReg] = useState(true)
  type FieldType = {
    name?: string;
    password?: string;
    phone?: string;
    email?:string
    // email?:string
  };
  
   const  onFinish: FormProps<FieldType>['onFinish'] = async(values) => {
    // console.log('Success:', values);
    try {
      const resp = isReg
        ? await axios.post("/api/v1/users", values)
        : await axios.post("/api/v1/users/auth", values);
    if(resp.data){
      alert("success!")
      setIsModalOpen(false)
    }else{
      alert('error')

    }
    } catch (error) {
      console.log(error)
    }finally{
    }
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  const RegModal: React.FC<{isOpen:boolean}> = ({isOpen}) => {
    
    const handleOk = () => {
      // setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      // setIsModalOpen(false);
    };
  
    return (
      <>
        <Modal
          title="Register account"
          open={isOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            name="basic"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            // style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {isReg && (
              <>
                <Form.Item<FieldType>
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Phone"
                  name="phone"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </>
            )}
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            < div style={{marginBottom:10}}>
              {isReg ? (
                <span>
                  Have an account?{" "}
                  <a href="#" onClick={() => setReg(false)}>
                    Login
                  </a>
                </span>
              ) : (
                <span>
                  A new User?{" "}
                  <a href="#" onClick={() => setReg(true)}>
                    Register
                  </a>
                </span>
              )}
            </div>
            <Form.Item label={null}>
              <Button block type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };

  
  // const isModal =localStorage.getItem("isModal")
useEffect(()=>{

},[])
  return (
    <div>
      <RegModal isOpen={isModalOpen}/>
      <Navbar/>
      <Message/>
    </div>)
}

export default App
