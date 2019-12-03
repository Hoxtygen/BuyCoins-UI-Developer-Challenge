document.addEventListener('DOMContentLoaded', ()=> { 
    const prevBtn = document.getElementById('prev')
    const nextBtn = document.getElementById('next')
    prevBtn.classList.add('hide')

    let start = 0; 
    function createTableStructure({ coin, code, price, totalSupply }) {
        const row = document.createElement('tr');
        const coinElement = document.createElement('td')
        const codeElement = document.createElement('td')
        const priceElement = document.createElement('td')
        const totalSupplyElement = document.createElement('td')
    
        coinElement.textContent = coin;
        codeElement.textContent = code;
        priceElement.textContent = `$ ${price}`;
        totalSupplyElement.textContent = `${totalSupply} ${code}`;
    
    
        row.appendChild(coinElement)
        row.appendChild(codeElement)
        row.appendChild(priceElement)
        row.appendChild(totalSupplyElement)
    
        return row
    }
    
    async function getData(start = 0) {
        const apiUrl = `https://api.coinlore.com/api/tickers/?start=${start}&limit=10`
        const tableBody = document.querySelector('tbody')
        let response = await fetch(apiUrl)
        let parsedData =  await response.json()
        tableBody.innerHTML = '';
        // console.log(parsedData.data);
        parsedData.data.map(crypto => {
            //console.log(crypto);
             const tableData = createTableStructure({
                 coin: crypto.name,
                 code: crypto.symbol,
                 price: crypto.price_usd,
                 totalSupply: crypto.tsupply
             })
             tableBody.appendChild(tableData)
        })
    
    
    }
    
    getData()

    function getNext() {
        start += 10;
        getData(start)
        prevBtn.classList.remove('hide')
    }

    function getPrev() {
        if (start !== 0) {
            start -= 10;
            getData(start)
        }
        if (start === 0) {
            prevBtn.classList.add('hide')
        }
    }

    nextBtn.addEventListener('click', getNext)
    prevBtn.addEventListener('click', getPrev)
})

