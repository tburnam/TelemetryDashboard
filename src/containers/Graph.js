import React, { Component } from 'react';
import { Table, Tag } from 'antd';
import moment from 'moment';

const https = require('https');

class Graph extends Component {

  constructor(props) {
    super(props);

    const data = [
      {
        level: 'info',
        source: '129.170.195.173',
        action: 'Starting',
        message: 'This is a message',
        tags: 'one, two, three',
        file: 'yolo.js',
        timestamp: '1537912932241',
      },
      {
        level: 'warn',
        source: '65.154.226.109',
        action: 'Processing',
        message: 'This is another message',
        tags: 'one, two, three',
        file: 'server.js',
        timestamp: '1537912946084',
      },
      {
        level: 'verbose',
        source: '66.249.92.204',
        action: 'Finishing',
        message: 'This is a final message',
        tags: 'one, two, three',
        file: 'server.js',
        timestamp: '1537912952964',
      },
    ];

    const setIPLocation = (ip) => {
      https.get(`https://ipapi.co/${ip}/json/`, (resp) => {
        let body = '';
        resp.on('data', (res) => {
          body += res;
        });

        resp.on('end', () => {
          const loc = JSON.parse(body);
        //   console.log(`${loc.city}, ${loc.region_code}, ${loc.country}`);
          const ipLocationCopy = this.state.ipLocations;
          ipLocationCopy[ip] = `${loc.city}, ${loc.region_code}, ${loc.country}`;

          this.setState({
            ipLocations: ipLocationCopy,
          });
        });
      });
    };

    const processData = (inputData) => {
      const processedData = [];
      for (const record of inputData) {
        // if (!(record.source_copy in this.state.ipLocations)) {
              // Add duplicate record for location column
        record.source_copy = record.source;

              // Get location name for IP
        setIPLocation(record.source_copy);

              // Add new record
        processedData.push(record);
        // }
      }
      return processedData;
    };

    const processedData = processData(data);

    this.state = {
      ipLocations: {},
      data: processedData,
    };
  }

  componentDidMount() {

  }

  render() {
    const getIPLocation = (ip) => {
      if (ip in this.state.ipLocations) {
        return this.state.ipLocations[ip];
      } else {
        return 'Can\'t locate';
      }
    };

    const columns = [{
      title: 'Level',
      dataIndex: 'level',
      filters: [
        {
          text: 'Debug',
          value: 'debug',
        },
        {
          text: 'Verbose',
          value: 'verbose',
        },
        {
          text: 'Info',
          value: 'info',
        }, {
          text: 'Warn',
          value: 'warn',
        },
        {
          text: 'Error',
          value: 'error',
        }],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
      onFilter: (value, record) => { return record.level.indexOf(value) > -1; },
      sorter: (a, b) => a.level.length - b.level.length,
      render: (level) => {
        let color = 'geekblue';
        switch (level) {
          case 'debug':
            color = 'green';
            break;
          case 'verbose':
            color = 'purple';
            break;
          case 'info':
            color = 'cyan';
            break;
          case 'warn':
            color = 'orange';
            break;
          case 'error':
            color = 'red';
            break;
          default:
            break;
        }
        return (
          <Tag color={color}>{level}</Tag>
        );
      },
    }, {
      title: 'IP',
      dataIndex: 'source',
        // defaultSortOrder: 'descend',
      sorter: (a, b) => a.source.length - b.source.length,
    },
    {
      title: 'Location',
      dataIndex: 'source_copy',
      sorter: (a, b) => a > b,
      render: (ip) => {
        // console.log(ip);
        return (<span>{getIPLocation(ip)}</span>);
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      sorter: (a, b) => a.action.length - b.action.length,
    }, {
      title: 'Message',
      dataIndex: 'message',
      sorter: (a, b) => a.message.length - b.message.length,
    }, {
      title: 'Tags',
      dataIndex: 'tags',
      sorter: (a, b) => a.tags.length - b.tags.length,
      render: tags => (
        <span id="tags">
          {tags.split(',').map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
        </span>
          ),
    }, {
      title: 'File',
      dataIndex: 'file',
      sorter: (a, b) => a.message.length - b.message.length,
    }, {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      sorter: (a, b) => b.timestamp - a.timestamp,
      render: (timestamp) => {
        return (
          <span id="timestamp">
            {moment.unix(timestamp / 1000).format('ll LTS')}
          </span>
        );
      },
    }];

    return (
      <div>
        <center><span id="title">GreenTiger Dev</span></center>
        <div id="mainTable">
          <Table columns={columns} dataSource={this.state.data} />
        </div>
      </div>
    );
  }
}

export default Graph;

