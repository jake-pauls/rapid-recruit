import React, { useState } from 'react';
import axios from 'axios';

import Table from "./Table";
import "./App.css";

export default function PopupButton() {
  // const popup = () => {
  //   chrome.tabs.create(
  //     {
  //       url: 'popup/index.html',
  //       active: false,
  //     },
  //     (tab) => {
  //       chrome.windows.create({
  //         tabId: tab.id,
  //         type: 'popup',
  //         focused: true,
  //         height: 500,
  //         width: 500,
  //       });
  //     }
  //   );
  // };

  const [keywords, setKeywords] = useState('');
  const [response, setResponse] = useState([]);

  const sendKeywords = async () => {
    let parsedKeywords = keywords.split(',');

    let body = { "keywords": parsedKeywords }

    const response = await axios.post("http://localhost:4040/api/recruit", body)  
    console.log(response.data.recruits);

    setResponse(response.data.recruits)
  }

  const columns = React.useMemo(
    () => [
      {
        // first group - TV Show
        Header: "Recruits",
        // First group columns
        columns: [
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Title",
            accessor: "title"
          },
          {
            Header: "Company",
            accessor: "company"
          },
          {
            Header: "Link",
            accessor: "url"
          }
        ]
      },
    ],
    []
  );

  return (
    <>
    <div>
      <input type="text" onChange={(e) => setKeywords(e.target.value)}></input>
      <button onClick={sendKeywords}>Search</button>
      <Table columns={columns} data={response} />
    </div>
    </>
  );
}
