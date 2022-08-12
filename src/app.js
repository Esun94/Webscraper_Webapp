// Chaining, fetch results from json
fetch('http://localhost:8000/results')
    .then(response => { return response.json() })
    .then(data => {
        data.forEach(result => {
            const info = 
            `
            <tr class="">
                <td><b>${result.subTitle}</b></td>
                <td class="paragraph">${result.paragraph}</td>
            </tr>
            `
            document.querySelector('#feed').insertAdjacentHTML("beforeend", info)
        });
    })
    .catch(err => console.log(err))