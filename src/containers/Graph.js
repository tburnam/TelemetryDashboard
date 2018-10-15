import React, { Component } from 'react';
import { Table, Tag } from 'antd';
import moment from 'moment';

// const iplocation = require('iplocation');


class Graph extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ipLocations: {},
    };
  }

  render() {
    const data = [
      {
        level: 'info',
        source: '129.170.195.173',
        action: 'Starting',
        message: 'This is a message',
        tags: 'one, two, three',
        file: 'server.js',
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

    const processData = (inputData) => {
      const processedData = [];
      for (const record of inputData) {
        record.source_copy = record.source;
        processedData.push(record);
      }
      return processedData;
    };

    const getIPLocation = (ip) => {
      if (ip in this.state.ipLocations) {
        return this.state.ipLocations[ip];
      } else {
        return 'Can\'t locate';
      }
    };

    const processedData = processData(data);

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
      sorter: (a, b) => a.name.length - b.name.length,
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
        // iplocation(ip)
        // .then((res) => {
        //   const newIPLocations = this.state.ipLocations;
        //   newIPLocations[ip] = res;

        //   this.setState({
        //     ipLocations: newIPLocations,
        //   });

        //   /* res:cl

        //     {
        //       as: 'AS11286 KeyBank National Association',
        //       city: 'Cleveland',
        //       country: 'United States',
        //       countryCode: 'US',
        //       isp: 'KeyBank National Association',
        //       lat: 41.4875,
        //       lon: -81.6724,
        //       org: 'KeyBank National Association',
        //       query: '156.77.54.32',
        //       region: 'OH',
        //       regionName: 'Ohio',
        //       status: 'success',
        //       timezone: 'America/New_York',
        //       zip: '44115'
        //     }

        //   */
        // })
        // .catch((err) => {
        //   console.error(err);
        // });
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
      sorter: (a, b) => { return (new Date(a) > new Date(b)); },
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
          <Table columns={columns} dataSource={processedData} />
        </div>
      </div>
    );
  }
}

export default Graph;

