const PORT = 8000;
const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const cors = require('cors');
// const json2csv = require('json2csv').Parser;
// const fs = require('fs');

const app = express()

app.use(cors());

const url = 'https://en.wikipedia.org/wiki/James_Bond';


app.get('/results', function (req, res) {
    axios(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const wikiResult = [];

            $( 'h2, p', html).each(function() {
                let subTitle = $(this).find('.mw-headline').text();
                let paragraph = $(this).text();
                wikiResult.push({
                    subTitle,
                    paragraph,
                });
            }),
            res.json(wikiResult);

            // const j2cp = new json2csv();
            // const csv = j2cp.parse(wikiResult);

            // fs.writeFileSync("./output.csv", csv, "utf-8");

        }).catch(err => console.log(err));
        
    });







app.listen(PORT, () => console.log(`server listening to PORT ${PORT}`))
