import React, { useState, useEffect } from 'react';
import './App.css';
import Editor from '@monaco-editor/react';

function App() {
  const [htmlCode, setHtmlCode] = useState('<div id="ball"></div>');
  const [cssCode, setCssCode] = useState(`
    body { 
      background-color: lightblue; 
      margin: 0;
      overflow: hidden;
    }
    #ball {
      width: 20px;
      height: 20px;
      background-color: red;
      position: absolute;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `);
  const [jsCode, setJsCode] = useState(`const ball = document.getElementById('ball');
ball.addEventListener('click', function() {
        // Get the current size of the ball
        const currentSize = parseInt(window.getComputedStyle(ball).getPropertyValue('width'));
    
        // Double the size
        const newSize = currentSize * 3;
    
        // Apply the new size to the ball
        ball.style.width = newSize + 'px';
        ball.style.height = newSize + 'px';
});
  `);

  const runTestCases = () => {
    const iframe = document.getElementById('preview-iframe');
  
    // Delay execution to allow iframe content to load
    setTimeout(() => {
      const ball = iframe.contentDocument.getElementById('ball');
  
      if (!ball) {
        console.error('Test failed: Ball element not found.');
        return;
      }
  
      const initialSize = parseInt(window.getComputedStyle(ball).getPropertyValue('width'));
      ball.click();
      const newSize = parseInt(window.getComputedStyle(ball).getPropertyValue('width'));
      if (newSize !== initialSize * 2) {
        console.error('Test failed: Clicking the ball did not double its size.');
      }
    }, 1000); // Adjust the delay time as needed
  };   

  const handleHtmlChange = (value, event) => {
    setHtmlCode(value);
  };

  const handleCssChange = (value, event) => {
    setCssCode(value);
  };

  const handleJsChange = (value, event) => {
    setJsCode(value);
  };

  const combinedCode = `
    <html>
      <head>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
        <script type="text/javascript">
          ${jsCode}
        </script>
      </body>
    </html>
  `;

  useEffect(() => {
    const iframe = document.getElementById('preview-iframe');
    iframe.contentDocument.write(combinedCode);
  }, [combinedCode]);

  return (
    <div className="App">
      <h1>Dev Game 1 v 1</h1>
      <iframe
        id="preview-iframe"
        title="Preview"
        width="100%"
        height="500px"
        srcDoc={combinedCode}
      ></iframe>
      
      <button onClick={runTestCases}>Run test cases</button>

      <Editor
        height="30vh"
        width="80vw"
        defaultLanguage="html"
        defaultValue={htmlCode}
        onChange={handleHtmlChange}
      />
      <Editor
        height="30vh"
        width="80vw"
        defaultLanguage="css"
        defaultValue={cssCode}
        onChange={handleCssChange}
      />
      <Editor
        height="30vh"
        width="80vw"
        defaultLanguage="javascript"
        defaultValue={jsCode}
        onChange={handleJsChange}
      />
    </div>
  );
}

export default App;
