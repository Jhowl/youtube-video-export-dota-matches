const fs = require('fs');

class FileReader {
    getIdsMatches() {
        const files = fs.readdirSync('./videos');
        const idMatches = [];

        files.forEach(element => {
            idMatches.push(element.split('.').slice(0, -1).join('.'))
        });

        return idMatches;
    }
}

module.exports = FileReader