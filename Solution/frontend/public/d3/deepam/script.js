document.addEventListener("DOMContentLoaded", function () {
  /*========================================== Chart 1: Deepam Patel ===========================================*/
  // Function to calculate average of an array
  function calculateAverage(array) {
    const sum = array.reduce((acc, val) => acc + val, 0);
    return sum / array.length;
  }
  function calculateItemMetrics(receipts) {
    // Group receipts data by item name
    const groupedData = d3.group(
      receipts.flatMap((receipt) => receipt.items),
      (d) => d.name
    );

    // Calculate aggregated metrics for each item
    const itemsWithMetrics = Array.from(groupedData, ([name, items]) => {
      const quantitySold = d3.sum(items, (d) => d.quantity);
      const totalRevenue = d3.sum(items, (d) => d.subTotal);
      const totalCost = d3.sum(items, (d) => d.cost * d.quantity);
      const profitability = totalRevenue - totalCost;
      const popularity = quantitySold;

      return {
        name,
        quantitySold,
        totalRevenue,
        totalCost,
        profitability,
        popularity,
      };
    });

    return itemsWithMetrics;
  }
  // Function to create scatter plot
  function createScatterPlot(data) {
    const margin = { top: 20, right: 20, bottom: 70, left: 70 };
    const containerWidth =
      document.getElementById("chart-container").clientWidth;
    const containerHeight =
      document.getElementById("chart-container").clientHeight;
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    // Calculate averages
    const avgpopularity = calculateAverage(data.map((d) => d.popularity));
    const avgprofitability = calculateAverage(data.map((d) => d.profitability));

    // Append SVG to the chart-container
    const svg = d3
      .select("#chart-container")
      .append("svg")
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .attr("class", "cls-chart-container-svg")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const maxPopularity = d3.max(data, (d) => d.popularity);
    const maxProfitability = d3.max(data, (d) => d.profitability);

    // Create x and y scales
    const x = d3.scaleLinear().domain([0, maxPopularity]).range([0, width]);
    const y = d3.scaleLinear().domain([0, maxProfitability]).range([height, 0]);

    // Add X axis
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .append("text")
      .attr("fill", "#000")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("dy", "0.71em")
      .attr("text-anchor", "middle")
      .text("Popularity (Quantity Sold)");

    // Add Y axis
    const formatYAxis = d3.format("$.0f");
    svg
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y).tickFormat(formatYAxis))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 5)
      .attr("x", -height / 2)
      .attr("dy", "0.71em")
      .attr("text-anchor", "middle")
      .text("Profitability (Total Revenue - Total Cost)");

    // Add gridlines for both axes
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(-height).tickFormat(""))
      .call((g) => g.select(".domain").remove());
    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y).tickSize(-width).tickFormat(""))
      .call((g) => g.select(".domain").remove());

    // Add dots with transition
    svg
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", (d) => {
        if (
          d["popularity"] > avgpopularity &&
          d["profitability"] > avgprofitability
        ) {
          return "data-point green";
        } else if (
          d["popularity"] < avgpopularity &&
          d["profitability"] > avgprofitability
        ) {
          return "data-point yellow";
        } else if (
          d["popularity"] < avgpopularity &&
          d["profitability"] < avgprofitability
        ) {
          return "data-point red";
        } else {
          return "data-point blue";
        }
      })
      .attr("cx", 0)
      .attr("cy", height)
      .attr("r", 6)
      .transition()
      .delay((d, i) => i * 50)
      .duration(1000)
      .attr("cx", (d) => x(d["popularity"]))
      .attr("cy", (d) => y(d["profitability"]));

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("display", "none")
      .style("opacity", 0);

    // Add tooltips to data points
    svg
      .selectAll("circle")
      .on("mouseover", function (e, data) {
        d3.select(this).transition().duration(100).attr("r", 12);
        const tooltipHTML = `
          <div><strong>Name: </strong>${data.name}</div>
          <div><strong>Total Revenue: </strong>$${data.totalRevenue.toFixed(
            2
          )}</div>
          <div><strong>Total Cost: </strong>$${data.totalCost.toFixed(2)}</div>
          <div><strong>Profitability: </strong>$${data.profitability.toFixed(
            2
          )}</div>
          <div><strong>Popularity: </strong>${data.popularity}</div>
        `;

        tooltip
          .html(tooltipHTML)
          .transition()
          .duration(100)
          .style("display", "block")
          .style("opacity", 1)
          .style("left", e.pageX + 20 + "px")
          .style("top", e.pageY + 20 + "px");
      })
      .on("mousemove", function (e) {
        tooltip
          .style("left", e.pageX + 20 + "px")
          .style("top", e.pageY + 20 + "px");
      })
      .on("mouseout", function (d) {
        tooltip
          .transition()
          .duration(500)
          .style("display", "none")
          .style("opacity", 0);
        d3.select(this).transition().duration(500).attr("r", 6);
      });

    // Add horizontal rule for average popularity
    svg
      .append("line")
      .attr("class", "average-line")
      .attr("x1", 0)
      .attr("y1", y(avgprofitability))
      .attr("x2", width)
      .attr("y2", y(avgprofitability));

    // Add vertical rule for average profitability
    svg
      .append("line")
      .attr("class", "average-line")
      .attr("x1", x(avgpopularity))
      .attr("y1", 0)
      .attr("x2", x(avgpopularity))
      .attr("y2", height);

    // Add text for average values
    svg
      .append("text")
      .attr("class", "average-text")
      .attr("x", 10)
      .attr("y", y(avgprofitability) - 10)
      .attr("dy", "0.35em")
      .text("Avg: $" + avgprofitability.toFixed(2));

    svg
      .append("text")
      .attr("class", "average-text")
      .attr("x", x(avgpopularity) - 5)
      .attr("y", height - 10)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text("Avg: $" + avgpopularity.toFixed(2));

    // Create legend
    const legendItems = [
      {
        label: "Favorites, Margin Opportunity",
        color: "blue",
        code: "#6495ED",
      },
      { label: "Top Sellers", color: "green", code: "#4CAF50" },
      { label: "Gems, Offer Deals", color: "yellow", code: "#FFCC00" },
      { label: "Underperforming", color: "red", code: "#DC143C" },
    ];

    const legend = d3
      .select("#legend")
      .append("svg")
      .attr("width", 260)
      .attr("height", 200)
      .append("g")
      .attr("transform", "translate(10,20)");

    // Append legend title
    legend
      .append("text")
      .attr("x", 0)
      .attr("y", 10)
      .attr("text-anchor", "start")
      .style("font-size", 14)
      .text("Select");

    legend
      .selectAll("legend-items")
      .data(legendItems)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 20 + 26})`)
      .on("click", function (_, i) {
        const selected =
          d3.select(this).select("rect").style("fill-opacity") === "0" ? 1 : 0;
        d3.select(this).select("rect").style("fill-opacity", selected);
        d3.selectAll("." + i?.color).style(
          "display",
          selected ? "block" : "none"
        );
      })
      .append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", (d) => d.code)
      .style("stroke", (d) => d.code)
      .style("fill-opacity", 1);

    legend
      .selectAll(".legend-item")
      .append("text")
      .attr("x", 20)
      .attr("y", 7)
      .attr("dy", "0.35em")
      .text((d) => d.label)
      .attr("class", "textselected")
      .style("text-anchor", "start")
      .style("font-size", 13);
  }
  /*========================================== Chart 2: Deepam Patel ===========================================*/
  function aggregateData(receipts) {
    const aggregatedData = {};
    // Iterate over each receipt record
    receipts.forEach((receipt) => {
      const date = new Date(receipt.date);
      const monthYear = date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
      receipt.items.forEach((item) => {
        if (!aggregatedData[item.category_name]) {
          aggregatedData[item.category_name] = {};
        }
        if (!aggregatedData[item.category_name][monthYear]) {
          aggregatedData[item.category_name][monthYear] = 0;
        }
        aggregatedData[item.category_name][monthYear] += item.subTotal;
      });
    });

    // Convert the aggregated data object to the desired format
    const formattedData = Object.entries(aggregatedData).map(
      ([category, months]) => ({
        name: category,
        values: Object.entries(months).map(([monthYear, revenue]) => ({
          date: monthYear,
          value: revenue,
        })),
      })
    );
    return formattedData;
  }

  // Function to create line and scatter plot
  function createConnectedScatterPlot(data) {
    const margin = { top: 20, right: 20, bottom: 70, left: 70 };
    const containerWidth =
      document.getElementById("chart-container-3").clientWidth;
    const containerHeight =
      document.getElementById("chart-container-3").clientHeight;
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    // Append SVG to the chart-container
    const svg = d3
      .select("#chart-container-3")
      .append("svg")
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .attr("class", "cls-chart-container-svg")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.transition().duration(1500).ease(d3.easeLinear).style("opacity", 1);
    const allGroup = data.map((el) => el.name);
    const dataReady = data.map(function (grp) {
      return {
        name: grp.name,
        values: grp.values
          .map(function (d) {
            return { date: new Date(d.date), value: d.value };
          })
          .sort((a, b) => a.date - b.date),
      };
    });
    const myColor = d3
      .scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeCategory10);
    const x = d3
      .scaleTime()
      .domain([new Date("Mar 2023"), new Date("May 2024")])
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr("class", "x-axis")
      .call(d3.axisBottom(x));

    // Add Y axis
    const formatYAxis = d3.format("$.0f");
    const y = d3.scaleLinear().domain([0, 800]).range([height, 0]);
    svg
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y).tickFormat(formatYAxis));

    // Add Y axis title
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Revenue");
    // Add gridlines for both axes
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(-height).tickFormat(""))
      .call((g) => g.select(".domain").remove());
    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y).tickSize(-width).tickFormat(""))
      .call((g) => g.select(".domain").remove());

    // Add the lines
    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.value));
    const lines = svg
      .selectAll("myLines")
      .data(dataReady)
      .join("path")
      .attr("class", (d) => d.name)
      .attr("d", (d) => line(d.values))
      .attr("stroke", (d) => myColor(d.name))
      .style("stroke-width", 4)
      .style("fill", "none")
      .style("opacity", (d, i) => (i === 0 ? 1 : 0))
      .style("display", (d, i) => (i === 0 ? "block" : "none"));

    // Add the points
    const dots = svg
      .selectAll("myDots")
      .data(dataReady)
      .join("g")
      .style("fill", (d) => myColor(d.name))
      .attr("class", (d) => d.name)
      .selectAll("myPoints")
      .data((d, i) => {
        d.values = d.values.map((me) => {
          me.name = d.name;
          me.index = i;
          return me;
        });
        return d.values;
      })
      .join("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.value))
      .attr("r", 5)
      .attr("stroke", "white")
      .style("opacity", (d, i) => (d.index === 0 ? 1 : 0))
      .style("display", (d, i) => (d.index === 0 ? "block" : "none"));

    // Dot information divs
    const dotInfoDivs = svg
      .selectAll(".dot-info")
      .data(dataReady)
      .join("g")
      .selectAll(".dot-info-div")
      .data((d) => d.values)
      .enter()
      .append("foreignObject")
      .attr("class", "dot-info-div")
      .attr("width", 100)
      .attr("height", 50)
      .style("opacity", 0)
      .style("display", "none")
      .attr("x", (d) => x(d.date) - 20)
      .attr("y", (d) => y(d.value) - 70)
      .html(
        (d) =>
          `<div class="tooltip" style="opacity:1"><strong>${d.value}</strong></div>`
      );

    svg
      .selectAll("circle")
      .on("mouseover", function (e, data) {
        d3.selectAll("circle").transition().duration(100).attr("r", 12);
        svg.selectAll("foreignObject").each(function (circleData, i) {
          if (data.name == circleData.name) {
            d3.select(this).style("display", "block").style("opacity", 1);
          }
        });
      })
      .on("mouseout", function (d) {
        d3.selectAll("circle").transition().duration(500).attr("r", 6);
        svg
          .selectAll("foreignObject")
          .style("display", "none")
          .style("opacity", 0);
      });

    // Add a legend (interactive)
    const legend = svg
      .selectAll("myLegend")
      .data(dataReady)
      .join("g")
      .append("text")
      .attr("class", "cls-legend-filter")
      .attr("x", 20)
      .attr("y", (d, i) => 20 + i * 40)
      .text((d) => d.name)
      .style("fill", (d) => myColor(d.name))
      .style("font-size", 15)
      .style("font-weight", (d, i) => (i === 0 ? "bold" : "unset"))
      .on("click", function (event, d) {
        const selected = d3.select(this);
        const isSelected = selected.style("font-weight") == "bold";
        if (!isSelected) {
          lines.style("opacity", 0).style("display", "none");
          legend.style("font-weight", "unset");
          dots.style("opacity", 0).style("display", "none");
          lines
            .filter((lineData) => lineData.name === d.name)
            .transition()
            .style("opacity", isSelected ? 0 : 1)
            .style("display", isSelected ? "none" : "block");
          dots
            .filter((dotData) => dotData.name === d.name)
            .transition()
            .style("opacity", isSelected ? 0 : 1)
            .style("display", isSelected ? "none" : "block");
          selected.style("font-weight", isSelected ? "unset" : "bold");
        }
      });
  }

  // Call the rest API for data
  fetch("https://660dd96a6ddfa2943b3552f2.mockapi.io/roms/receipts")
    .then((response) => response.json())
    .then((data) => {
      let data1 = calculateItemMetrics(data[0]["data"]);
      createScatterPlot(data1);
      let data2 = aggregateData(data[0]["data"]);
      createConnectedScatterPlot(data2);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      fetch("../fallback.json")
        .then((response) => response.json())
        .then((data) => {
          let data1 = calculateItemMetrics(data[0]["data"]);
          createScatterPlot(data1);
          let data2 = aggregateData(data[0]["data"]);
          createConnectedScatterPlot(data2);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
});
