const http = require('http'); // or 'https' for https:// URLs
const https = require('https')
const fs = require('fs');
const genericAudio = (content) => {
    // const content = `Nói hủy để quay lại`;
    return `https://texttospeech.responsivevoice.org/v1/text:synthesize?text=${encodeURIComponent(content)}&lang=vi&engine=g1&name=&pitch=0.5&rate=0.5&volume=1&key=0POmS5Y2&gender=female`
}
const readFileToString = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) throw err;
            resolve(data);
        });
    })

}
const downloadFile = (url) => {
    return new Promise((resolve, reject) => {
        try {
            const request = https.get(url, function (response) {
                resolve(response)
            });
        } catch (error) {
            reject();
        }
    })
}
module.exports = {
    genericAudio,
    readFileToString,
    downloadFile,
}