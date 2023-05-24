const fs = require('fs')

let rawdata = fs.readFileSync('./data.json');
let data = JSON.parse(rawdata);

let newData = []

data.forEach(({name, capital, population, region, flags}) => {
    newData.push({
        name: name,
        capital: capital,
        population: population,
        region: region,
        flag: flags.svg
    })
})

let newJson = JSON.stringify(newData);
fs.writeFileSync('newData.json', newJson);