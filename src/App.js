import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import "react-datetime/css/react-datetime.css";
import { Bar } from '@ant-design/charts';
import 'antd/dist/antd.css';
import RangeSlider from 'react-bootstrap-range-slider';
import moment from 'moment';
import { DatePicker, Space, Select, Pagination, Button } from 'antd';
import { count_logs_url, search_logs_url, logs_stats_url } from './Constants';
import { Redirect } from "react-router-dom";
const { RangePicker } = DatePicker;
const { Option } = Select;



class App extends React.Component {

  handleChangeDateSimple(event) {
    if (event === null) {
      this.getData();
    }
    else {
      this.setState({ start_full_date: event[0].format() });
      this.setState({ end_full_date: event[1].format() });
      this.getData();
      this.getNPages();
    }

  }
  
  render() {

    if ( localStorage.token === undefined || localStorage.token === null){ 
      return <Redirect to="/login"></Redirect>;
    }
    let disabler;
    let datePicker;
    let config;
    let data
    
      datePicker = <RangePicker showTime onChange={this.handleChangeDateSimple} />
      disabler = false;
    
    
    return (
      <div className="App" >
        <header className="App-header">
          
         </header>
      </div>
    );
  }
}

export default App;