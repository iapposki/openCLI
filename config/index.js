const dotenv = require('dotenv');
dotenv.config();

const config = {
    OPENAI_API_KEY : process.env['OPENAI_API_KEY'] || "",
    OPENAI_API_ENDPOINT : process.env['OPENAI_API_ENDPOINT'] || "https://api.openai.com/v1/engines/text-davinci-003/completions",
};

module.exports = {config};