#! /usr/bin/env node

const {config} = require('../config/index')
const axios = require('axios');
const { error } = require('console');
const fs = require('fs');
const yargs = require('yargs');

const OPENAI_API_KEY = config.OPENAI_API_KEY; 
const OPENAI_API_ENDPOINT = config.OPENAI_API_ENDPOINT;


// function to read code from the file path given
function readCodeFromFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
    }
}

// function to explain the code using openai api
function explainCode(code) {
    var prompt_data = "Give me a summary of the code below. If it doesn't look like a code, ask me to enter actual code : ".concat(code);
    if (!OPENAI_API_KEY) {
        console.log('API Key not provided.')
        process.exit(1)
    }
    if (!OPENAI_API_ENDPOINT){
        console.log('API Endpoint not provided.')
        process.exit(1)
    }
    axios.post(
        OPENAI_API_ENDPOINT,
        {
            prompt: prompt_data,
            max_tokens: 1500
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        }
        )
        .then((response) => {
        console.log('Code Explanation:');
        console.log(response.data.choices[0].text);
    })
    .catch((error) => {
        console.error(`Error communicating with OpenAI API: ${error.message}`);
    });
}

// command to explain the code
yargs.command({
    command: 'explain',
    describe: 'Explain code in a file',
    builder: {
        file: {
            describe: 'Path to the file containing the code to explain',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        const code = readCodeFromFile(argv.file);
        explainCode(code);
    }
    })
    .demandCommand(1, 'Please provide a valid command.')
    .help()
    .argv;