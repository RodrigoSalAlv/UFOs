// import the data from data.js
const tableData = data;


// Reference the HTML table using d3
// We already know that the data will be displayed in a table, so in our code editor we'll reference the tbody HTML tag using D3.
// Declare a variable, tbody
// Use d3.select to tell JavaScript to look for the <tbody> tags in the HTML
var tbody = d3.select("tbody");

//tbody.html references the table, pointing JavaScript directly to the table in the HTML page we're going to build.
// We also added an argument (dataRow) that will represent each row of the data as we iterate through the array
function buildTable(data){
    //// First, clear out any existing data
    tbody.html("");

    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {

        // This single line of code is doing a lot. It tells JavaScript to find the <tbody> tag within the HTML and add a table row ("tr").
        // Append a row to the table body
        let row = tbody.append('tr');

        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) =>{
            let cell = row.append("td");
            cell.text(val);
        });
    });
}

function handleClick() {
    // Grab the datetime value from the filter (the value of the filter will be in the HTML item, called #datetime)
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;

    // Check to see if a date was entered and filter the
    // data using that date.
    if (date) {
        // Apply `filter` to the table data to only keep the
        // rows where the `datetime` value matches the filter value
        filteredData = filteredData.filter(row => row.datetime === date);
    };
    // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
}

// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);
