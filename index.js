const PORT = 8000;
const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express()

app.use(cors());

const url = 'https://en.wikipedia.org/wiki/Benjamin_Franklin';

// const url = 'https://www.theguardian.com/us';

//METHOD = get,post,put,delete
//PATH = example /burger or endpoint
//HANDLER function to be executed

// app.METHOD(PATH, HANDLER);

app.get('/results', function (req, res) {
    axios(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const wikiResult = [];

            // $('.mw-headline', html).each(function() {
            //     let subTitle = $(this).text();
            //     wikiResult.push({
            //         subTitle,
            //     });
            // });
            $( 'h2, p', html).each(function() {
                // let heading = $(this).find('.firstHeading').text();
                let subTitle = $(this).find('.mw-headline').text();
                let paragraph = $(this).text();
                wikiResult.push({
                    // heading,
                    subTitle,
                    paragraph,
                });
            }),
            // $('p', html).each(function() {
            //     let paragraph = $(this).text();
            //     wikiResult.push({
            //         paragraph,
            //     });
            // });
            res.json(wikiResult)
        }).catch(err => console.log(err));
});

app.listen(PORT, () => console.log(`server listening to PORT ${PORT}`))
