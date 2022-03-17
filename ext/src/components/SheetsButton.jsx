import React from 'react';
import axios from 'axios';

import { generateExportTitle } from '../utils';

import './App.css';

export default function SheetsButton({ apiKey, data }) {
  const baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
  const columns = ['Name', 'Title', 'Company', 'Link'];
  const jsonColumns = ['name', 'title', 'company', 'url'];

  const initAuthToken = () => {
    return new Promise((resolve) => {
      chrome.identity.getAuthToken({ interactive: true }, (token) =>
        resolve(token)
      );
    });
  };

  const pushDataToSheet = async () => {
    let token = await initAuthToken();

    let sheet = await createSheet(token);
    await updateSheet(token, sheet);
  };

  // Create an empty sheet with a dated title and a basic 'Recruits' sheet
  const createSheet = async (token) => {
    const url = `${baseUrl}?key=${apiKey}`;

    const body = {
      properties: {
        title: generateExportTitle(),
      },
      sheets: [
        {
          properties: {
            title: 'Recruits',
          },
        },
      ],
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    let response = await axios.post(url, body, { headers: headers });

    return response.data;
  };

  const updateSheet = async (token, sheet) => {
    const sheetId = sheet.spreadsheetId;
    const url = `${baseUrl}/${sheetId}/values:batchUpdate?key=${apiKey}`;

    // Append columns to first row of sheet
    let sheetData = [columns];

    // For each found recruit, add a row to the sheet
    data.forEach((recruit) => {
      let row = [];

      jsonColumns.forEach((heading) => {
        row.push(recruit[heading]);
      });

      sheetData.push(row);
    });

    const body = {
      data: {
        range: 'Recruits',
        values: sheetData,
      },
      valueInputOption: 'USER_ENTERED',
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    let response = await axios.post(url, body, { headers: headers });
    console.log(response);
  };

  return <button class="button" onClick={pushDataToSheet}>Export to Google Sheet</button>;
}
