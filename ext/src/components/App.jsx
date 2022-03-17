import React, { useState } from 'react';
import axios from 'axios';
import { WithContext as ReactTags } from 'react-tag-input';

import Table from './Table';
import SheetsButton from './SheetsButton';
import PDFButton from './PDFButton';

import './App.css';

export default function App({ apiKey }) {
  const [keywords, setKeywords] = useState([]);
  const [response, setResponse] = useState([]);
  const [tags, setTags] = useState([]);

  const sendKeywords = async () => {
    let body = { keywords: keywords };

    const response = await axios.post(
      'http://localhost:4040/api/recruit',
      body
    );
    console.log(response.data.recruits);

    setResponse(response.data.recruits);
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
    setKeywords([...keywords, tag.text]);
  };

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
    setKeywords(keywords.filter((keyword, index) => index !== i));
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
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
        <ReactTags
          placeholder="Search"
          inputFieldPosition="bottom"
          handleAddition={handleAddition}
          handleDelete={handleDelete}
          handleDrag={handleDrag}
          tags={tags}
        />
        <button class="button" onClick={sendKeywords}>
          Go
        </button>
      </div>
      <div class="container">
        {response !== undefined && response.length > 0 ? (
          <>
            <Table columns={columns} data={response} />
            <SheetsButton apiKey={apiKey} data={response} />
            <PDFButton data={response} />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
