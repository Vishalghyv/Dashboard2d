import React, { useState } from 'react';

import GoogleMap from '../GoogleMap';
import { TreeSelect } from 'antd';
import styles from './Flight.module.css';
import data from '../Data/Flight1/flight_1';
import { Chart } from '../Chart/Chart';

const treeData = [
    {
      value: 'parent 1',
      title: 'parent 1',
      children: [
        {
          value: 'parent 1-0',
          title: 'parent 1-0',
          children: [
            {
              value: 'flight_1',
              title: 'flight_1',
            },
            {
              value: 'leaf2',
              title: 'leaf2',
            },
          ],
        },
        {
          value: 'parent 1-1',
          title: 'parent 1-1',
          children: [
            {
              value: 'leaf3',
              title: <b style={{ color: '#08c' }}>leaf3</b>,
            },
          ],
        },
      ],
    },
  ];

function Flight() {
  const [value, setValue] = useState(undefined);
  const onChange = (newValue) => {
    setValue(newValue);
  };
  console.log(data);
    return (
    <div>
        <h2>Flight</h2>
        <div className={styles.treeContainer}>
          <TreeSelect
            showSearch
            style={{
              width: '100%',
            }}
            value={value}
            dropdownStyle={{
              maxHeight: 400,
              overflow: 'auto',
            }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={onChange}
            treeData={treeData}
          />
        </div>
        <div className={styles.displayContainer}>
          <div className={styles.mapContainer}>
            <GoogleMap />
          </div>
          <div className={styles.chartContainer}>
            <Chart />
          </div>
        </div>
    </div>
    );
};  

export default Flight;