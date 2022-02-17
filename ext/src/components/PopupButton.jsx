import React from 'react';

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
          height: 500,
          width: 500,
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
