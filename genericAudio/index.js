const http = require('http'); // or 'https' for https:// URLs
const https = require('https')
const fs = require('fs');
const { downloadFile, genericAudio, readFileToString } = require('./utils');

(async () => {
    const sourceFrom = '../src/app/features/authentication/khiemThi/';
    const files = [
        'data.ts',
        'CapNhatHoTro.ts',
        'DangKyCapNhat.ts',
        'apiHandler.ts',
    ]
    const strFile = (await Promise.all(files.map(async f => await readFileToString(sourceFrom + f)))).join('\n');
    console.log(strFile)
    // const strFile = await readFileToString('../src/app/features/authentication/khiemThi/BotKhiemThi.tsx');
    const regex = new RegExp(/genericAudio\('(.*)'\)/gm)
    let m;
    let list = [
    ];

    while ((m = regex.exec(strFile)) !== null) {
        const find = m[1].split(`\\n`).join(`\n`);
        list.push({ text: find })
        console.log(find)
    }
    const listTemp = list.filter((e, index, self) => self.findIndex(e1 => e1.text == e.text) == index)

    const saved = await Promise.all(listTemp.map(async (e, index) => {
        const fileName = `${index + 1}.mp3`
        const file = fs.createWriteStream(`./audio/${fileName}`);
        const stream = await downloadFile(genericAudio(e.text));
        stream.pipe(file);
        e.fileAudio = 'https://dkamphuoc.xyz/Workspace/TriNam/nkt/audio/' + fileName;
        return e;
    }))
    console.log(112233)
    // console.log(JSON.stringify(saved, null, '\t'))
    fs.writeFile('../src/app/features/authentication/khiemThi/audio.json', JSON.stringify(saved, null, '\t'), function (err) {
        if (err) return console.log(err);
        console.log('saved file');
    });
    console.log(444)
})()
