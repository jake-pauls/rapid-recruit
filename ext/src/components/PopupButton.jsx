import React from 'react';
import './Counter.css';

export default function PopupButton() {
  const popup = () => {
    chrome.tabs.create(
      {
        url: 'popup/index.html',
        active: false,
      },
      (tab) => {
        chrome.windows.create({
          tabId: tab.id,
          type: 'popup',
          focused: true,
          height: 200,
          width: 200,
        });
      }
    );
  };

  return (
    <>
      <div className="counter">
        <button onClick={popup}>testing</button>
      </div>
    </>
  );
}
