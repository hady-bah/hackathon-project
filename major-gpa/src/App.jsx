import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { UploadOutlined, LeftSquareTwoTone, RightSquareTwoTone } from '@ant-design/icons'; 

import {Divider, Button, message, Upload, Transfer, Tag} from 'antd'


function App() {
  //transfer selection
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);

  const generateCourseCode = (index) => {
    const prefixes = ['PHY', 'CSC', 'MTH', 'BIO', 'CHE'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomCode = Math.floor(Math.random() * 500) + 100;
    const randomCredits = (Math.floor(Math.random() * 3) + 1).toFixed(2);
    const randomGrade = getRandomGrade();
    return `${randomPrefix} ${randomCode} - ${randomCredits} - ${randomGrade}`;
  };

  const getRandomGrade = () => {
    const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
    return grades[Math.floor(Math.random() * grades.length)];
  };

  const getMock = () => {
    const tempMockData = [];
    for (let i = 0; i < 20; i++) {
      const courseCode = generateCourseCode(i);
      const data = {
        key: courseCode,
        title: `${courseCode}`,
        description: `Description of Course ${courseCode}`,
      };
      tempMockData.push(data);
    }
    setMockData(tempMockData);
  };

  useEffect(() => {
    getMock();
  }, []);

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
      render={(item) => item.title}
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
