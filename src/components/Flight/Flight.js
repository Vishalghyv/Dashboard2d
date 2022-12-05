import React, { useState } from 'react';

import {GoogleMap} from '../GoogleMap/GoogleMap';
import { TreeSelect } from 'antd';
import styles from './Flight.module.css';
import data from '../Data/Flight1/flight_1';
import { Chart } from '../Chart/Chart';
import { SINRs as SINR1 } from '../Data/Flight1/flight_1';
import { flight_1 } from '../Data/Flight1/flight_1';

const treeData = [
    {
      value: 'flight_1',
      title: 'flight 1',
    },
    {
      value: 'flight_2',
      title: 'flight 2',
    },
    {
      value: 'flight_3',
      title: 'flight 3',
    },
    {
      value: 'flight_4',
      title: 'flight 4',
    }
  ];

function Flight() {
  const [value, setValue] = useState('flight_1');
  const [SINRs, setSINRs] = useState(SINR1);
  const onChange = (newValue) => {
    if (newValue === 'flight_1') {
      setSINRs(SINR1);
    }
    setValue(newValue);

  };

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
            <GoogleMap flight={flight_1}/>
          </div>
          <div className={styles.chartContainer}>
            <Chart sinr={SINR1}/>
          </div>
        </div>
    </div>
    );
};  

export default Flight;