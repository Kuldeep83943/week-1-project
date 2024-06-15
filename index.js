//   https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false

const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
// const url=`https://jsonplaceholder.typicode.com/users`

let result = [];

//function to fetch data
const fetchData = async () => {
  try {
    const response = await fetch(url);
    result = await response.json();
    // console.log(result);
    displayData(result);
  } catch (error) {
    console.log("error fetching data" + error);
  }
};

//function to display data
const displayData = (data) => {
  console.log(data);
  const tableBody = document.querySelector("#data-table tbody");
  tableBody.innerHTML = "";

  data.map((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><img src=${[item.image]}  /> ${item.name}</td>
        <td>${item.symbol}</td>
        <td>$${item.current_price}</td>
        <td>$${item.total_volume}</td>
        <td>${item.price_change_percentage_24h}%</td>
        <td>$ ${item.market_cap}</td>
        `;
    tableBody.appendChild(row);
  });
};

function sortByPercentage() {
    result.sort((a, b) => a.price_change_percentage_24h-b.price_change_percentage_24h);
    displayData(result);
}

function sortByMkt() {
    result.sort((a, b) => a.market_cap-b.market_cap);
    displayData(result);
}


function searchByNameAndSymbol(e){
  const inputValue = e.target.value.toLowerCase();
  // console.log(inputValue);
 const filteredData = result.filter((item) => item.name.toLowerCase().includes(inputValue) ||  item.symbol.toLowerCase().includes(inputValue));
 displayData(filteredData);

}


// Event listener for the sort button
document.getElementById('percentage').addEventListener('click', sortByPercentage);
document.getElementById('mkt').addEventListener('click', sortByMkt);

// Event listener for the search functionality
document.getElementById('search').addEventListener('input', searchByNameAndSymbol)



// Initial fetch and display of data
fetchData();