import React, { useState } from 'react';
import axios from 'axios';

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

  return (
    <>
    <div>
      <input type="text" onChange={(e) => setKeywords(e.target.value)}></input>
      <button onClick={sendKeywords}>Search</button>
      <table>
        <tr>
          <th>Name</th>
          <th>Title</th>
          <th>Company</th>
          <th>LinkedIn</th>
        </tr>
          {response.map((data) => {
            return (
              <tr>
                <td>{data.name}</td>
                <td>{data.title}</td>
                <td>{data.company}</td>
                <td><a href={data.url}>LinkedIn</a></td>
              </tr>
            )
          })}
      </table>
    </div>
    </>
  );
}
