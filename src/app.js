// Chaining, fetch results from json
fetch('http://localhost:8000/results')
    .then(response => { return response.json() })
    .then(data => {
        data.forEach(result => {
            // const title = '<a>' + result.title + '</a>'
            const titleAndLink = 
            `
            <h5 class="result">
                <a href='${result.url}'>
                    ${result.title}
                </a>
            </h5>
            `
            document.querySelector('#feed').insertAdjacentHTML("beforeend", titleAndLink)
        })
    })
    .catch(err => console.log(err))

