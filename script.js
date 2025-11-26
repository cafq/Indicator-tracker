async function loadJSON(file) {
  const response = await fetch(file);
  return response.json();
}

// Inflation
loadJSON("data/inflation.json").then(data => {
  Plotly.newPlot("inflationChart", [
    { x: data.dates, y: data.france, name: "France", type: "scatter" },
    { x: data.dates, y: data.euro, name: "Euro Area", type: "scatter" }
  ], { title: "Inflation Rate (%)" });
});

// Unemployment
loadJSON("data/unemployment.json").then(data => {
  Plotly.newPlot("unemploymentChart", [
    { x: data.dates, y: data.france, name: "France", type: "scatter" },
    { x: data.dates, y: data.euro, name: "Euro Area", type: "scatter" }
  ], { title: "Unemployment Rate (%)" });
});

// ECB Rates
loadJSON("data/ecb_rates.json").then(data => {
  Plotly.newPlot("ecbChart", [
    { x: data.dates, y: data.values, name: "Main Rate", type: "scatter" }
  ], { title: "ECB Main Refinancing Rate (%)" });
});
