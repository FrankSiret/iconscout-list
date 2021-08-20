var fs = require('fs');
var jsFiles = require('./jsfiles.json')

const toSvg = (path) => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${path}"/></svg>`
}

const save = (file, svgText) => {
    fs.writeFile(file, svgText, "utf8", function (error, data) {
        console.log(`Write error [${file}]`);
        if (error) {
            console.log(error);
            console.log(data);
        }
    });
}

/// Main

jsFiles.forEach(js => {
    const dir = `D:\\project\\personal\\mi-portfolio\\node_modules\\@iconscout\\react-unicons\\icons\\${js}`;
    console.log(dir);
    fs.readFile(dir, "utf8", function (error, data) {
        if (error) {
            console.log(`Read error [${dir}]`);
            console.log(error);
            console.log(data);
        }
        else {
            let i = data.indexOf("d: 'M");
            let j = data.indexOf("\n", i);
            const d = data.substring(i, j);
            const s = d.split("'");
            const path = s[1];
            const svgText = toSvg(path);
            const file = `svg/${js.replace('.js', '.svg')}`
            save(file, svgText);
        }
    });
})