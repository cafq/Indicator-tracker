async function loadJSON(path) {
  const r = await fetch(path);
  return r.json();
}

function fmt(x) {
  return x ? x.toFixed(1) + "%" : "–";
}

/* --- INFLATION --- */
loadJSON("data/inflation.json").then(data => {
  Plotly.newPlot("inflationChart", [
    { x: data.dates, y: data.france, name: "France", type: "scatter" },
    { x: data.dates, y: data.euro, name: "Euro Area", type: "scatter" }
  ]);

  const i = data.dates.length - 1;
  document.getElementById("kpi-infl-fr").textContent = fmt(data.france[i]);
  document.getElementById("kpi-infl-ea").textContent = fmt(data.euro[i]);
});

/* --- UNEMPLOYMENT --- */
loadJSON("data/unemployment.json").then(data => {
  Plotly.newPlot("unemploymentChart", [
    { x: data.dates, y: data.france, name: "France", type: "scatter" },
    { x: data.dates, y: data.euro, name: "Euro Area", type: "scatter" }
  ]);

  const i = data.dates.length - 1;
  document.getElementById("kpi-unemp-fr").textContent = fmt(data.france[i]);
});

/* --- GDP --- */
loadJSON("data/gdp.json").then(data => {
  Plotly.newPlot("gdpChart", [
    { x: data.dates, y: data.france, name: "France" },
    { x: data.dates, y: data.euro, name: "Euro Area" }
  ]);
});

/* --- IPI --- */
loadJSON("data/ipi.json").then(data => {
  Plotly.newPlot("ipiChart", [
    { x: data.dates, y: data.values, name: "Industrial Production" }
  ]);
});

/* --- CURRENT ACCOUNT --- */
loadJSON("data/current_account.json").then(data => {
  Plotly.newPlot("caChart", [
    { x: data.dates, y: data.values, name: "Current Account" }
  ]);
});

/* --- EUR/USD --- */
loadJSON("data/eurusd.json").then(data => {
  Plotly.newPlot("eurusdChart", [
    { x: data.dates, y: data.values, name: "EUR/USD" }
  ]);
});

/* --- BOND YIELD --- */
loadJSON("data/bond_yield.json").then(data => {
  Plotly.newPlot("bondChart", [
    { x: data.dates, y: data.yields, name: "10Y Bond Yield" }
  ]);
});

/* --- ECB --- */
loadJSON("data/ecb_rates.json").then(data => {
  Plotly.newPlot("ecbChart", [
    { x: data.dates, y: data.values, name: "Refinancing Rate" }
  ]);

  const i = data.values.length - 1;
  document.getElementById("kpi-ecb").textContent = data.values[i] + "%";
});
