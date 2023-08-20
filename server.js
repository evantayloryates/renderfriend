const express = require('express');
const handlebars = require('handlebars');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const bodyParser = require('body-parser');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

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
  '-r',              `${process.env.SCRIPT_PATH}`,
];

app.post('/action', async (req, res) => {
    console.log('REQUEST RECEIVED');

    const { type, payload } = req.body;

    const templatePath = path.join(__dirname, 'templates', `${'base'}.hbs`);
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateContent);
    const outputJSX = compiledTemplate({
        compName: 'norender'
    });

    await fsp.writeFile(process.env.SCRIPT_PATH, outputJSX);

    await fsp.access(process.env.SCRIPT_PATH, fs.constants.F_OK);  // F_OK checks the file for visibility (existence)
    
    const { stdout, stderr } = await exec(`"${process.env.AE_BINARY}" ${ARGS.join(' ')}`,
        { cwd: './ae', windowsHide: true }
    );

    console.log('AE FINISHED');
    
    res.status(200).json({
        success: true,
        message: "Data received successfully and system command executed.",
        data: { type, payload }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
