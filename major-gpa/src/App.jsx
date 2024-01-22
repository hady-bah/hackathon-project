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
  const [transferredCourses, setTransferredCourses] = useState([]);
  const [calculatedGPA, setCalculatedGPA] = useState(null);

  const filterOption = (inputValue, option) =>
    option.description.indexOf(inputValue) > -1 || option.title.indexOf(inputValue) > -1;

  const handleChange = (newTargetKeys, direction, moveKeys) => {
    setTargetKeys(newTargetKeys);
  };

  const handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };

  const calculateGPA = () => {
    // Retrieve exact grades and credits from the JSON data for the transferred courses
    const updatedTransferredCourses = mockData.filter(course => targetKeys.includes(course.key));
    setTransferredCourses(updatedTransferredCourses);

    // Calculate GPA based on the exact grade and credit information from transferred courses
    const totalCredits = updatedTransferredCourses.reduce((sum, course) => sum + course.credits, 0);
    const totalGradePoints = updatedTransferredCourses.reduce((sum, course) => sum + convertGradeToPoints(course.grade), 0);
    const calculatedGPA = totalGradePoints / totalCredits;
    setCalculatedGPA(calculatedGPA.toFixed(2));
  };

  const convertGradeToPoints = (grade) => {
    switch (grade) {
      case 'A':
        return 4.0;
      case 'A-':
        return 3.7;
      case 'B+':
        return 3.3;
      case 'B':
        return 3.0;
      case 'B-':
        return 2.7;
      case 'C+':
        return 2.3;
      case 'C':
        return 2.0;
      case 'C-':
        return 1.7;
      case 'D+':
        return 1.3;
      case 'D':
        return 1.0;
      case 'D-':
        return 0.7;
      case 'F':
        return 0.0;
      default:
        return 0.0;
    }
  };
  

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
      <Upload {...props} maxCount={1}>
      <Button icon={<UploadOutlined />}>Upload png only</Button>
      </Upload>
      </div>
      
      <Divider/>


      <div className='center-title'>
        <h1>Step 2</h1>
      </div>
      <div className='center-title'>
        <p><strong>Transfer all major related courses</strong></p>
      </div>
      <div className='center-title'>
        <p>Add below if needed or innacurate</p>
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
        <h1>One more click!</h1>
      </div>
      <div className='center-title'>
        <Button type="primary" onClick={calculateGPA}>
          Calculate GPA
        </Button>
      </div>

      <div className='center-title'>
        {calculatedGPA !== null && (
          <p style={{ marginTop: '10px' }}>
            <strong>Calculated Major GPA:</strong> {calculatedGPA}
          </p>
        )}
      </div>
      <br/>
      <br/>
      <br/>
    </>
  )
}

export default App