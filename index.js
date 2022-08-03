const PORT = 8000;
const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');

const app = express()

const url = 'https://www.theguardian.com/us';

//METHOD = get,post,put,delete
//PATH = example /burger or endpoint
//HANDLER function to be executed

// app.METHOD(PATH, HANDLER);

// app.get('/', function (req, res) {
//     res.json(`ERIC's Webscraper Webapp !!`)
// })

app.get('/results', function (req, res) {
    axios(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const articles = []; 
    
            $('.fc-item__title', html).each(function() {
                let title = $(this).text();
                let url = $(this).find('a').attr('href');
                articles.push({
                    title,
                    url
                });
            });
            // console.log(articles)
            res.json(articles)
        }).catch(err => console.log(err));
    
});

app.listen(PORT, () => console.log(`server listening to PORT ${PORT}`))
