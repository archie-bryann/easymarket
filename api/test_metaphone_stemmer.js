const metaphone = require('metaphone');
const stemmer = require('stemmer');

// console.log(metaphone(stemmer('egg')));
// console.log(metaphone(stemfmer('eggs')));

function powerString(search) {
    return metaphone(stemmer(search));
}

console.log(metaphone(stemmer('David Connellys')));
console.log(metaphone(stemmer('David Connoly')));
console.log(metaphone(stemmer('David Connely')));
console.log(metaphone(stemmer('David Connily')));
console.log(metaphone(stemmer('David Connilly')));
console.log(metaphone(stemmer('David Connellly')));