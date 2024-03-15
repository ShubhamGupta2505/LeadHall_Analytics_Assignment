// Load data from Excel file
Promise.all([
    d3.csv("2024 Dashboard Data.xlsx", { sheet: "Broker stats" }),
    d3.csv("2024 Dashboard Data.xlsx", { sheet: "Class stats" }),
]).then(([brokerStatsData, classStatsData]) => {
    // Code for Broker Stats Dashboard
    const topBrokersTable = d3.select("#top-brokers-table");
    topBrokersTable.selectAll("div")
        .data(brokerStatsData)
        .enter().append("div")
        .text(d => `${d['Year']} - ${d['Broker Name']}: GWP ${d['GWP']}, Planned GWP ${d['Planned GWP']}, Market Type ${d['Market Type']}`)
        .attr("class", "broker-row");

    const chartData = brokerStatsData.map(d => ({ broker: d['Broker Name'], gwp: +d['GWP'] }));
    const chartContainer = d3.select("#broker-performance-chart");
    chartContainer.selectAll("div")
        .data(chartData)
        .enter().append("div")
        .style("width", d => `${d.gwp}px`)
        .style("height", "20px") // Adjust the height as needed
        .text(d => d.broker)
        .attr("class", "bar");

    const businessClassAnalysis = d3.select("#business-class-analysis");
    businessClassAnalysis.text("Business Class Analysis");

    // Code for Class Stats Dashboard
    const classStatsTable = d3.select("#class-stats-table");
    classStatsTable.selectAll("div")
        .data(classStatsData)
        .enter().append("div")
        .text(d => `${d['Year']} - ${d['Class of Business']} (${d['ClassType']}): Business Plan ${d['Business Plan']}, Earned Premium ${d['Earned Premium']}, GWP ${d['GWP']}`)
        .attr("class", "class-row");

    const classChartData = classStatsData.map(d => ({ class: d['Class of Business'], gwp: +d['GWP'] }));
    const classChartContainer = d3.select("#class-performance-chart");
    classChartContainer.selectAll("div")
        .data(classChartData)
        .enter().append("div")
        .style("width", d => `${d.gwp}px`)
        .style("height", "20px") // Adjust the height as needed
        .text(d => d.class)
        .attr("class", "bar");

    const classTypeAnalysis = d3.select("#class-type-analysis");
    classTypeAnalysis.text("Class Type Analysis");
});

// Interactive elements (replace this with your implementation)
document.getElementById("user-input").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        processUserInput();
    }
});

// Function to handle user input
function processUserInput() {
    const userInput = document.getElementById("user-input").value;
    // Implement logic to handle the user's query and update chatbot-messages
    const chatbotMessages = document.getElementById("chatbot-messages");
    chatbotMessages.innerHTML += `<div>User: ${userInput}</div>`;
    // Add logic to process data and provide a meaningful response
    const response = `Chatbot: Processing data related to "${userInput}"...`;
    chatbotMessages.innerHTML += `<div>${response}</div>`;
    document.getElementById("user-input").value = "";
}
