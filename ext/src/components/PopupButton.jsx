import React, { useState } from 'react';
import axios from 'axios';

import Table from './Table';
import SheetsButton from './SheetsButton';

import './App.css';

export default function PopupButton({ apiKey }) {
  const [keywords, setKeywords] = useState('');
  const [response, setResponse] = useState([]);

  const sendKeywords = async () => {
    let parsedKeywords = keywords.split(',');

    let body = { keywords: parsedKeywords };

    const response = await axios.post(
      'http://localhost:4040/api/recruit',
      body
    );
    console.log(response.data.recruits);

    setResponse(response.data.recruits);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Company',
        accessor: 'company',
      },
      {
        Header: 'Link',
        accessor: 'url',
        Cell: (e) => (
          <a href={e.value} target="_blank">
            {' '}
            Link{' '}
          </a>
        ),
      },
    ],
    []
  );

  return (
    <>
      <div class="container">
        <input
          type="text"
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Search"
        ></input>
        <button class="button" onClick={sendKeywords}>
          Go
        </button>
      </div>
      <div class="container">
        { response !== undefined && response.length > 0 ? (
          <>
            <Table columns={columns} data={response} />
            <SheetsButton apiKey={apiKey} data={response} />
          </> )
          : ( 
            <></> 
          )
        }
      </div>
    </>
  );
}
