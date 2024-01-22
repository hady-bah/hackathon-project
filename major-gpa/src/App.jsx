import React, { useEffect, useState } from 'react';
import axios from 'axios';
import mockData from './courses.json';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { UploadOutlined, LeftSquareTwoTone, RightSquareTwoTone } from '@ant-design/icons'; 

import {Divider, Button, message, Upload, Transfer, Tag} from 'antd'


function App() {
  //transfer selection
  // const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);

  const filterOption = (inputValue, option) =>
    option.description.indexOf(inputValue) > -1 || option.title.indexOf(inputValue) > -1;

  const handleChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };

  const handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };


  //uploading image
  const props = {
    beforeUpload: (file) => {
      const isPNG = file.type === 'image/png';
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };  



  return (
    <>
      <div className='main-title'>
        <h1>Major Master</h1>
      </div>
      <div className='center-title2'>
        <p><strong>Designed to calculate your major GPA with just a few clicks</strong></p>
      </div>


      <div className='center-title'>
        <h1>Step 1</h1>
      </div>
      <div className='center-title'>
        <p>Upload an image of your transcript</p>
      </div>
      <div className='center-title'>
      <Upload {...props}>
      <Button icon={<UploadOutlined />}>Upload png only</Button>
      </Upload>
      </div>
      
      <Divider/>


      <div className='center-title'>
        <h1>Step 2</h1>
      </div>
      <div className='center-title'>
        <p>Transfer all major related</p>
      </div>
      <div className='center-directions'>
      <p>
      <span><LeftSquareTwoTone /> Courses | </span>
      <span style={{ marginLeft: '10px' }}><strong>Major related</strong> <RightSquareTwoTone /></span>
    </p>
      </div>
      <div className='center-title'>
      <Transfer
      dataSource={mockData}
      showSearch
      filterOption={filterOption}
      targetKeys={targetKeys}
      onChange={handleChange}
      onSearch={handleSearch}
      render={(item) => `${item.code} - ${item.credits} - ${item.grade}`}
      listStyle={{
        width: 300,
        height: 300,
      }}
    />
      </div>

      <Divider/>
      
      <div className='center-title'>
        <h1>Almost There!</h1>
      </div>
      <div className='center-title'>
        <p>Button to calculate</p>
      </div>


    </>
  )
}

export default App