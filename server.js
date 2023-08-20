const express = require('express');
const bodyParser = require('body-parser');
const { exec, spawn } = require('child_process');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 3000;

const cors = require('cors');
app.use(cors());

// Middleware to parse JSON formatted body
app.use(bodyParser.json());

const ARGS = [
  '-v', 'ERRORS_AND_PROGRESS',               // (Verbose)                                   ERRORS_AND_PROGRESS | ERRORS
  '-close', 'DO_NOT_CLOSE',                  // (onClose)                                   DO_NOT_SAVE_CHANGES | SAVE_CHANGES | DO_NOT_CLOSE
  '-sound', 'OFF',                           // (notifyOnComplete)                          OFF | ON
  '-continueOnMissingFootage',
  // '-mem_usage', '20', '50',                  // (percentCacheMemory , percentTotalAEMemory) 1-100 , 1-100
  // '-mfr', 'ON', '50',                        // (useMultiFrame , percentCPU)                ON | OFF , 1-100
  '-i', '1',                                 // (frameIncrement)                            Any positive integer
  '-log', '/Users/taylor/src/github/aenode/ae/log.txt',                         // (logFilePath)                               Any filepath
  '-output', '/Users/taylor/src/github/aenode/ae/outputVideo',                // (renderFileOutput)                          Any filepath
  // '-outputSettings', 'TaylorOutput',         // 
  '-OMtemplate',     '"H.264 - Match Render Settings -  5 Mbps"',   //
  // '-renderSettings', 'Taylor Settings',
  '-RStemplate',     '"Taylor Settings"',
  // '-rqindex',        '1',
  '-comp',           'norender',
  // '-teamproject',    'teamProject1',
  // '-project',        'project.aep',
  '-reuse', 
  '-r',              '/Users/taylor/src/github/aenode/script.jsx',
];

app.post('/action', (req, res) => {
    console.log('req.body: ', req.body)
    const { type, payload } = req.body;

    // switch(type) {
    //   case 'COMP_ADD':
    //     addComp(payload);
    //     break;
    //   case y:
    //     // code block
    //     break;
    //   default:
    //     // code block
    // }
    
    // Check if the required keys are present
    // if (typeof type === 'string' && typeof payload === 'string') {
    if (typeof type === 'string') {
        exec(`pwd ; "${process.env.AE_BINARY}" ${ARGS.join(' ')}`, { 
          cwd: './ae',
          windowsHide: true,
        }, (error, stdout, stderr) => {
        // exec(`echo $PATH | tr ':' '\n'`, (error, stdout, stderr) => {
          if (error) {
              console.error(`exec error: ${error}`);
              console.error(`Standard Output: ${stdout}`);
              console.error(`Standard Error Output: ${stderr}`);

              return res.status(500).json({
                  success: false,
                  message: "Error executing the system command."
              });
          }
          
          // You can use stdout to capture the command output if needed
          console.log(`Command Output: ${stdout}`);
          
          res.status(200).json({
              success: true,
              message: "Data received successfully and system command executed.",
              data: { type, payload }
          });
      });

    } else {
        res.status(400).json({
            success: false,
            message: "Invalid data format. Expected keys: type (string) and payload (string)."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
