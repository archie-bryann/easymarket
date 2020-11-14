const metaphone = require('metaphone');
const stemmer = require('stemmer');

const enhance = (word) => {
    return metaphone(stemmer(word));
}

module.exports = enhance;