const PORT = 8000;
const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express()

app.use(cors());

const url = 'https://en.wikipedia.org/wiki/Anonymous_(hacker_group)';


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
            res.json(wikiResult)
        }).catch(err => console.log(err));
});

app.listen(PORT, () => console.log(`server listening to PORT ${PORT}`))
