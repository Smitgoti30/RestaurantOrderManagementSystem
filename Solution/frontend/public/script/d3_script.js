function calculateAverage(array) {
  const sum = array.reduce((acc, val) => acc + val, 0);
  return sum / array.length;
}
// Function to create scatter plot
function createScatterPlot(data) {
  const margin = { top: 20, right: 20, bottom: 70, left: 70 };
  const containerWidth = document.getElementById("chart-container").clientWidth;
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
  const myColor = d3.scaleOrdinal().domain(allGroup).range(d3.schemeCategory10);
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

function transformData(inputData) {
  const ordersMap = d3.rollup(
    inputData,
    (v) => v.length,
    (d) => d.items[0].category_name
  );

  const profitMap = d3.rollup(
    inputData.flatMap((order) =>
      order.items.map((item) => ({
        category_name: item.category_name,
        profit: item.subTotal - item.cost,
      }))
    ),
    (v) => d3.sum(v, (d) => d.profit),
    (d) => d.category_name
  );

  const itemCountMap = d3.rollup(
    inputData.flatMap((order) =>
      order.items.map((item) => ({
        category_name: item.category_name,
        itemCount: item.quantity,
      }))
    ),
    (v) => d3.sum(v, (d) => d.itemCount),
    (d) => d.category_name
  );

  // Convert maps into arrays
  const ordersData = Array.from(ordersMap, ([title, value]) => ({
    title,
    value,
    all: d3.sum([...ordersMap.values()]),
  }));

  const profitData = Array.from(profitMap, ([title, value]) => ({
    title,
    value: parseFloat(value.toFixed(2)),
    all: d3.sum([...profitMap.values()]).toFixed(2),
  }));

  const itemCountData = Array.from(itemCountMap, ([title, value]) => ({
    title,
    value,
    all: d3.sum([...itemCountMap.values()]),
  }));

  return { ordersData, profitData, itemCountData };
}
function createAndRenderDonutChart({ ordersData, profitData, itemCountData }) {
  var width = 560;
  var height = 560;
  var radius = Math.min(width, height) / 2;
  var donutWidth = 75;

  const color = d3.scaleOrdinal().range(d3.schemeCategory10);

  var svg = d3
    .select("#donut")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("pointer-events", "none")
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var arc = d3
    .arc()
    .innerRadius(radius - donutWidth - 100)
    .outerRadius(radius - 100);

  var pie = d3
    .pie()
    .value(function (d) {
      return d.value;
    })
    .sort(null);

  var legendRectSize = 13;
  var legendSpacing = 7;

  var donutTip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var path = svg
    .selectAll("path")
    .data(pie(ordersData))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", function (d, i) {
      return color(d.data.title);
    })
    .attr("transform", "translate(0, 0)")
    .on("mouseover", function (d, i) {
      d3.select(this).transition().duration("50").attr("opacity", ".85");
      donutTip.transition().duration(100).style("opacity", 1);
      let num = Math.round((i.data.value / i.data.all) * 100).toString() + "%";
      const tooltipHTML = `
            <div><strong>Name: </strong>${i.data.title}</div>
            <div><strong>Percentage: </strong>${num}</div>
            `;
      donutTip
        .html(tooltipHTML)
        .style("display", "block")
        .style("position", "absolute")
        .style("left", d.pageX + 20 + "px")
        .style("top", d.pageY + 20 + "px");
    })
    .on("mousemove", function (e) {
      donutTip
        .style("left", e.pageX + 20 + "px")
        .style("top", e.pageY + 20 + "px");
    })
    .on("mouseout", function (d, i) {
      d3.select(this).transition().duration("50").attr("opacity", "1");
      donutTip.transition().duration("50").style("opacity", 0);
    });

  arc = d3
    .arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius);

  path.transition().duration(500).attr("d", arc);
  d3.select("#donut")
    .select("svg")
    .transition()
    .delay(500)
    .style("pointer-events", "unset");

  var legend = svg
    .selectAll(".legend")
    .data(color.domain())
    .enter()
    .append("g")
    .attr("class", "circle-legend")
    .attr("transform", function (d, i) {
      var height = legendRectSize + legendSpacing;
      var offset = (height * color.domain().length) / 2;
      var horz = -2 * legendRectSize - 13;
      var vert = i * height - offset;
      return "translate(" + horz + "," + vert + ")";
    });

  legend
    .append("circle")
    .style("fill", color)
    .style("stroke", color)
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", ".5rem");

  legend
    .append("text")
    .attr("x", legendRectSize + legendSpacing)
    .attr("y", legendRectSize - legendSpacing)
    .text(function (d) {
      return d;
    });

  function change(data) {
    var pie = d3
      .pie()
      .value(function (d) {
        return d.value;
      })
      .sort(null)(data);

    var width = 560;
    var height = 560;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 75;

    // Update the pie layout with the new data
    var path = d3.select("#donut").selectAll("path").data(pie);

    // Compute the arc
    var arc = d3
      .arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);

    // Update existing paths
    path.transition().duration(500).attr("d", arc);

    // Update the legend texts
    var legendTexts = svg.selectAll(".circle-legend text").data(
      pie.map(function (d) {
        return d.data.title;
      })
    );

    // Update existing legend texts
    legendTexts.text(function (d) {
      return d;
    });

    // Enter new legend texts
    legendTexts
      .enter()
      .append("text")
      .attr("x", legendRectSize + legendSpacing)
      .attr("y", legendRectSize - legendSpacing)
      .text(function (d) {
        return d;
      });

    // Remove exiting legend texts
    legendTexts.exit().remove();
  }

  d3.select("button#price").on("click", function () {
    change(ordersData);
  });
  d3.select("button#profit").on("click", function () {
    change(profitData);
  });
  d3.select("button#tax").on("click", function () {
    change(itemCountData);
  });
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
    const category = items[0]["category_name"];

    return {
      name,
      quantitySold,
      totalRevenue,
      totalCost,
      profitability,
      popularity,
      category,
    };
  });

  return itemsWithMetrics;
}
function createAndRenderCircularPack(data) {
  const width = 960;
  const height = 560;

  // append the svg object to the body of the page
  const svg = d3
    .select("#circular-packing")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const mydomain = d3
    .map(data, function (d) {
      return d.category;
    })
    .keys();
  const color = d3.scaleOrdinal().domain(mydomain).range(d3.schemeCategory10);

  const size = d3.scaleLinear().domain([0, 1000]).range([10, 200]);
  var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  const mouseover = function (event, d) {
    tooltip.style("opacity", 1);
    tooltip.style("display", "block");
  };
  const mousemove = function (event, d) {
    const tooltipHTML = `
            <div><strong>Name: </strong>${d.name}</div>
            <div><strong>Category: </strong>${d.category}</div>
            <div><strong>Profit: </strong>$${d.profitability.toFixed(2)}</div>
        `;
    tooltip
      .html(tooltipHTML)
      .style("left", event.clientX + window.scrollX + 10 + "px")
      .style("top", event.clientY + window.scrollY + 10 + "px");
  };
  var mouseleave = function (event, d) {
    tooltip.style("opacity", 0);
    tooltip.style("display", "none");
  };

  var node = svg
    .append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("class", "node")
    .attr("r", (d) => size(d.profitability))
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .style("fill", (d) => color(d.category))
    .style("fill-opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    .call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

  const simulation = d3
    .forceSimulation()
    .force(
      "center",
      d3
        .forceCenter()
        .x(width / 2)
        .y(height / 2)
    )
    .force("charge", d3.forceManyBody().strength(0.1))
    .force(
      "collide",
      d3
        .forceCollide()
        .strength(0.2)
        .radius(function (d) {
          return size(d.profitability) + 3;
        })
        .iterations(1)
    );
  simulation.nodes(data).on("tick", function (d) {
    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  });

  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0.03);
    d.fx = null;
    d.fy = null;
  }
  const legend = svg
    .selectAll("myLegend")
    .data(Array.from(d3.group(data, (d) => d.category).keys()))
    .join("g")
    .append("text")
    .attr("class", "cls-legend-filter")
    .attr("x", 0)
    .attr("y", (d, i) => 20 + i * 40)
    .text((d) => d)
    .style("fill", (d) => color(d))
    .style("font-size", 15);
}

function getCategoryTotals(data) {
  const categoryTotals = {};
  data.forEach((order) => {
    order.items.forEach((item) => {
      const categoryName = item.category_name;
      if (!categoryTotals[categoryName]) {
        categoryTotals[categoryName] = 0;
      }
      categoryTotals[categoryName] +=
        ((item.subTotal - item.quantity * item.cost) / item.subTotal) * 100;
    });
  });
  Object.keys(categoryTotals).forEach((category) => {
    categoryTotals[category] = roundToTwoDecimals(categoryTotals[category]);
  });
  return categoryTotals;
}
function roundToTwoDecimals(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
function transformData2(inputData) {
  const categoryTotalsByQuarter = d3.rollup(
    inputData,
    (v) => {
      const categoryTotals = getCategoryTotals(v);
      const total = d3.sum(Object.values(categoryTotals));
      return {
        quarter: getQuarter(new Date(v[0].date)),
        total: roundToTwoDecimals(total),
        ...categoryTotals,
      };
    },
    (d) => getQuarter(new Date(d.date))
  );

  const categories = new Set();
  categoryTotalsByQuarter.forEach((value, key) => {
    Object.keys(value).forEach((category) => {
      if (category !== "quarter" && category !== "total") {
        categories.add(category);
      }
    });
  });

  const sortedCategories = Array.from(categories).sort();

  const result = {
    data: Array.from(categoryTotalsByQuarter.values()),
    key: sortedCategories,
  };

  result.key.forEach((cat) => {
    result.data.forEach((quarter_data) => {
      if (!Object.keys(quarter_data).includes(cat)) {
        quarter_data[cat] = 0;
      }
    });
  });
  return result;
}
function getQuarter(date) {
  const month = date.getMonth();
  return `Q${Math.floor(month / 3) + 1}`;
}
var initStackedBarChart = {
  draw: function (config) {
    (me = this),
      (domEle = config.element),
      (stackKey = config.key),
      (data = config.data),
      (margin = {
        top: 20,
        right: 40,
        bottom: 60,
        left: 40,
      });

    var legendRectSize = 17;
    var legendSpacing = 4;
    default_width = 800;
    default_height = 440;
    default_ratio = default_width / default_height;

    function set_size() {
      current_width = window.innerWidth;
      current_height = window.innerHeight;
      current_ratio = current_width / current_height;
      if (current_ratio > default_ratio) {
        h = default_height - 100;
        w = default_width;
      } else {
        w = current_width;
        h = w / default_ratio;
        legendSpacing = 2;
        legendRectSize = 7;
      }
      width = w - margin.left - margin.right;
      height = h - margin.top - margin.bottom;
    }
    set_size();

    (xScale = d3.scaleLinear().rangeRound([0, width])),
      (yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.4)),
      (color = d3.scaleOrdinal(d3.schemeCategory10)),
      (xAxis = d3.axisBottom(xScale).ticks(5)),
      (yAxis = d3.axisLeft(yScale)),
      (svg = d3
        .select("#" + domEle)
        .append("svg")
        .attr("width", 1000 + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr(
          "transform",
          "translate(" + margin.left + "," + margin.top + ")"
        ));

    var stack = d3
      .stack()
      .keys(stackKey)
      .order(d3.stackOrder)
      .offset(d3.stackOffsetNone);

    var layers = stack(data);
    data.sort((a, b) =>
      a.quarter > b.quarter ? -1 : a.quarter < b.quarter ? 1 : 0
    );
    yScale.domain(
      data.map(function (d) {
        return d.quarter;
      })
    );

    //x max
    xScale
      .domain([
        0,
        d3.max(layers[layers.length - 1], function (d) {
          return data.reduce((max, obj) => {
            return obj.total > max ? obj.total : max;
          }, -Infinity);
        }),
      ])
      .nice();

    var layer = svg
      .selectAll(".layer")
      .data(layers)
      .enter()
      .append("g")
      .attr("class", "layer")
      .style("fill", function (d, i) {
        return color(i);
      });

    var div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    layer
      .selectAll("rect")
      .data(function (d) {
        return d;
      })
      .enter()
      .append("rect")
      .attr("y", function (d) {
        return yScale(d.data.quarter);
      })
      .attr("x", function (d) {
        return xScale(d[0]);
      })
      .attr("height", yScale.bandwidth())

      .attr("width", function (d) {
        return xScale(d[1]) - xScale(d[0]);
      })
      .on("mouseover", function (d, i) {
        d3.select(this).transition().duration("200").attr("opacity", ".7");
        div.transition().duration(200).style("opacity", 0.9);
        let num = i[1] - i[0];
        div
          .html(num)
          .style("left", d.pageX + 10 + "px")
          .style("top", d.pageY + 10 + "px");
      })
      .on("mouseout", function (d, i) {
        d3.select(this).transition().duration("200").attr("opacity", "1");
        div.transition().duration("200").style("opacity", 0);
      });

    svg
      .selectAll(".total-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "total-label")
      .attr("x", function (d) {
        return xScale(d.total) + 5;
      })
      .attr("y", function (d) {
        return yScale(d.quarter) + yScale.bandwidth() / 2;
      })
      .attr("dy", "0.35em")
      .text(function (d) {
        return `$ ${d.total.toLocaleString()}`;
      });

    svg
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + (height + 5) + ")")
      .call(xAxis);

    svg
      .append("text")
      .attr("class", "x-axis")
      .attr("text-anchor", "middle")
      .attr(
        "transform",
        "translate(" + width / 2 + "," + (height + margin.top + 35) + ")"
      )
      .text("Total ($)");

    svg
      .append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(0,0)")
      .call(yAxis);

    var legend = svg
      .selectAll(".legend-bar")
      .data(color.domain())
      .enter()
      .append("g")
      .attr("class", "legend-bar")
      .attr("transform", function (d, i) {
        var height = legendRectSize + legendSpacing;
        var horz = width + 80;
        var vert = i * height + 7;
        return "translate(" + horz + "," + vert + ")";
      });

    legend
      .append("circle")
      .style("fill", color)
      .style("stroke", color)
      .attr("cx", 0)
      .attr("cy", legendRectSize - legendSpacing - 5)
      .attr("r", ".4rem");

    legend
      .append("text")
      .attr("x", legendRectSize + legendSpacing)
      .attr("y", legendRectSize - legendSpacing)
      .text(function (d) {
        return stackKey[d];
      });
  },
};
function initGroupedBar(data) {
  const chart = chart2(data);
  d3.select("#grouped-bar")
    .style("pointer-events", "none")
    .append(() => chart);

  function chart2(data) {
    // Specify the chart’s dimensions.
    const width = 1028;
    const height = 700;
    const marginTop = 10;
    const marginRight = 10;
    const marginBottom = 100;
    const marginLeft = 40;
    const fx = d3
      .scaleBand()
      .domain(new Set(data.map((d) => d.quarter)))
      .rangeRound([marginLeft, width - marginRight])
      .paddingInner(0.2);
    const payment_methods = new Set(data.map((d) => d.payment_method));

    const x = d3
      .scaleBand()
      .domain(payment_methods)
      .rangeRound([0, fx.bandwidth()])
      .padding(0.05);

    const color = d3
      .scaleOrdinal()
      .domain(payment_methods)
      .range(d3.schemeSpectral[payment_methods.size])
      .unknown("#ccc");

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count + 2)])
      .nice()
      .rangeRound([height - marginBottom, marginTop]);

    const formatValue = (x) => (isNaN(x) ? "N/A" : x.toLocaleString("en"));

    // Create the SVG container.
    const svg = d3
      .create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${marginLeft - marginRight},0)`)
      .call(
        d3
          .axisLeft(y)
          .tickSize(-width + 40)
          .tickFormat("")
      )
      .attr("x", "40")
      .call((g) => g.select(".domain").remove());

    // Append the horizontal axis.
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(fx).tickSizeOuter(0));

    // Append the vertical axis.
    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 5)
      .attr("x", -height / 2)
      .attr("dy", "0.71em")
      .attr("text-anchor", "middle")
      .text("Count");

    // Append a group for each quarter, and a rect for each payment_method.
    const bars = svg
      .append("g")
      .selectAll()
      .data(d3.group(data, (d) => d.quarter))
      .join("g")
      .attr("transform", ([quarter]) => `translate(${fx(quarter)},0)`)
      .selectAll()
      .data(([, d]) => d)
      .join("rect")
      .attr("x", (d) => x(d.payment_method))
      .attr("y", 0)
      .attr("width", x.bandwidth())
      .attr("height", 0);

    bars
      .transition()
      .duration(1000)
      .attr("y", (d) => y(d.count))
      .attr("height", (d) => y(0) - y(d.count))
      .attr("fill", (d) => color(d.payment_method))
      .style("opacity", 1);

    var tip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
    bars
      .on("mouseover", function (d, i) {
        d3.select(this).transition().duration("200").attr("opacity", ".5");
        tip.transition().duration(200).style("opacity", 1);
        tip
          .html(`<strong>${i.payment_method}:</strong> ${i.count}`)
          .style("left", d.pageX + 10 + "px")
          .style("top", d.pageY + 10 + "px");
      })
      .on("mouseout", function (d, i) {
        d3.select(this).transition().duration("200").attr("opacity", "1");
        tip.transition().duration("200").style("opacity", 0);
      });

    d3.select("#grouped-bar")
      .transition()
      .delay(1000)
      .style("pointer-events", "unset");
    const legend = svg
      .append("g")
      .attr("class", "legend-bar")
      .attr(
        "transform",
        `translate(${marginLeft + 100},${height - marginBottom + 50})`
      );

    const legendItem = legend
      .selectAll(".legend-item")
      .data(payment_methods)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(${i * 240}, 0)`);

    legendItem
      .append("circle")
      .attr("cx", 0)
      .attr("cy", -6)
      .attr("r", 6)
      .style("fill", color)
      .style("stroke", color);

    legendItem
      .append("text")
      .attr("x", 12)
      .text((d) => d);

    return Object.assign(svg.node(), { scales: { color } });
  }
}
function groupData(data) {
  const transformedData = [];
  const mappedData = data.map((order) => {
    return {
      payment_method: order.payment_method,
      quarter: Math.floor(new Date(order.date).getMonth() / 3 + 1),
    };
  });
  const modes = Array.from(
    new Set(mappedData.map((order) => order.payment_method))
  );
  const quarters = Array.from(
    new Set(mappedData.map((order) => order.quarter))
  ).sort();
  quarters.forEach((q) => {
    modes.forEach((m) => {
      const count = mappedData.reduce((acc, order) => {
        if (order.payment_method === m && order.quarter === q) {
          return acc + 1;
        }
        return acc;
      }, 0);
      transformedData.push({
        quarter: `Q ` + q,
        payment_method: m,
        count: count,
      });
    });
  });
  return transformedData;
}
function processData(data) {
  const revenueByMonth = {};
  data.forEach((order) => {
    const date = new Date(order.date);
    const month = date.getMonth();
    const monthName = getMonthName(month);
    const key = `${monthName}`;
    if (!revenueByMonth[key]) {
      revenueByMonth[key] = {};
    }
    order.items.forEach((item) => {
      const categoryName = item.category_name;
      if (!revenueByMonth[key][categoryName]) {
        revenueByMonth[key][categoryName] = 0;
      }
      revenueByMonth[key][categoryName] += item.price * item.quantity;
    });
  });

  // Calculate total revenue for each month
  for (const month in revenueByMonth) {
    revenueByMonth[month]["Total"] = Object.values(
      revenueByMonth[month]
    ).reduce((total, categoryRevenue) => total + categoryRevenue, 0);
  }

  return revenueByMonth;
}
function getMonthName(month) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month];
}
function calculateCategoryRevenue(data) {
  const categoryRevenue = {};

  data.forEach((order) => {
    order.items.forEach((item) => {
      const categoryName = item.category_name;
      const itemRevenue = item.price * item.quantity;

      if (!categoryRevenue[categoryName]) {
        categoryRevenue[categoryName] = 0;
      }

      categoryRevenue[categoryName] += itemRevenue;
    });
  });

  return categoryRevenue;
}
async function createLollipopChart(data) {
  const revenueByMonth = processData(data);

  const margin = { top: 50, right: 50, bottom: 100, left: 80 };
  const width = 1000 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const sortedMonths = Object.keys(revenueByMonth).sort((a, b) => {
    const monthA = new Date(`${a} 1, 2000`);
    const monthB = new Date(`${b} 1, 2000`);
    return monthA - monthB;
  });

  const x = d3.scaleBand().domain(sortedMonths).range([5, width]).padding(1);

  const y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(Object.values(revenueByMonth), (monthData) =>
        d3.max(Object.values(monthData))
      ),
    ])
    .range([height, 0]);

  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end")
    .style("font-weight", "bold")
    .style("font-size", "small")
    .transition()
    .duration(1000)
    .delay((d, i) => i * 100);

  const formatYAxis = d3.format("$,.0f");
  svg
    .append("g")
    .call(d3.axisLeft(y).tickFormat(formatYAxis))
    .selectAll("text")
    .style("font-weight", "bold")
    .style("font-size", "small")
    .transition()
    .duration(1000)
    .delay((d, i) => i * 100);

  svg
    .append("text")
    .attr("class", "y-axis-title")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Total Revenue");

  svg
    .selectAll("myline")
    .data(Object.entries(revenueByMonth))
    .enter()
    .append("line")
    .attr("x1", (d) => x(d[0]))
    .attr("x2", (d) => x(d[0]))
    .attr("y1", (d) => y(0))
    .attr("y2", (d) => y(0))
    .attr("stroke", "rgb(31, 119, 180)")
    .attr("stroke-width", 2)
    .transition()
    .duration(1000)
    .delay((d, i) => i * 100)
    .attr("y2", (d) => y(d3.max(Object.values(d[1]))));

  svg
    .selectAll("mycircle")
    .data(Object.entries(revenueByMonth))
    .enter()
    .append("circle")
    .attr("cx", (d) => x(d[0]))
    .attr("cy", (d) => y(0))
    .attr("r", 8)
    .attr("fill", "rgb(31, 119, 180)")
    .transition()
    .duration(1000)
    .delay((d, i) => i * 100)
    .attr("cy", (d) => y(d3.max(Object.values(d[1]))));

  svg
    .selectAll("mycircle")
    .data(Object.entries(revenueByMonth))
    .enter()
    .append("text")
    .attr("x", (d) => x(d[0]))
    .attr("y", (d) => y(0) - 20)
    .text((d) => d3.format("$,.0f")(d3.max(Object.values(d[1]))))
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .attr("fill", "rgb(31, 119, 180)")
    .transition()
    .duration(1000)
    .delay((d, i) => i * 100)
    .attr("y", (d) => y(d3.max(Object.values(d[1]))) - 20);

  // Add tooltips
  const tooltip = d3
    .select("body")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background-color", "black")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white");

  svg
    .selectAll("circle")
    .on("mouseover", function (event, d) {
      const formattedMonth = d[0];
      const monthData = d[1];
      let tooltipHTML = `<strong>${formattedMonth}</strong><br><hr/>`;
      for (const category in monthData) {
        if (category == "Total") tooltipHTML += "<hr/>";
        tooltipHTML += `<strong>${category}:</strong> $${monthData[category]}<br>`;
      }
      tooltip
        .html(tooltipHTML)
        .style("left", event.pageX + 20 + "px")
        .style("top", event.pageY - 8 + "px")
        .transition()
        .duration(200)
        .style("opacity", 1);

      d3.select(this).attr("r", 10);
    })
    .on("mouseout", function (d) {
      tooltip.transition().duration(200).style("opacity", 0);
      d3.select(this).attr("r", 8);
    });
}
let selectedQuarter = { startMonth: 0, endMonth: 2 };
function processDataForBar(data) {
  const totalOrdersPerWeekday = {};

  // Initialize total orders count for each weekday
  for (let i = 0; i < 7; i++) {
    totalOrdersPerWeekday[i] = 0;
  }

  // Calculate total orders count for each weekday
  data.forEach((order) => {
    const date = new Date(order.date);
    const month = date.getMonth();
    const weekday = date.getDay();

    // Check if the order falls within the selected quarter
    if (
      month >= selectedQuarter.startMonth &&
      month <= selectedQuarter.endMonth
    ) {
      totalOrdersPerWeekday[weekday]++;
    }
  });

  // Convert object to array for easier processing
  const result = Object.keys(totalOrdersPerWeekday).map((weekday) => {
    return {
      weekday: +weekday,
      totalOrders: totalOrdersPerWeekday[weekday],
    };
  });

  return result;
}
function createChartForBar(data) {
  var margin = { top: 40, right: 100, bottom: 50, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
  var greyColor = "#898989";
  var barColor = d3.interpolateInferno(0.4);

  var svg = d3
    .select("#bar-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleBand().range([0, width]).padding(0.4);
  var y = d3.scaleLinear().range([height, 0]);

  var xAxis = d3.axisBottom(x);
  var yAxis = d3.axisLeft(y);

  x.domain(
    data.map(function (d) {
      return d.weekday;
    })
  );
  y.domain([
    0,
    d3.max(data, function (d) {
      return d.totalOrders;
    }),
  ]);

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .text(function (d) {
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return weekdays[d];
    });

  //   svg.append("g").attr("class", "y axis").call(yAxis);

  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .style("fill", barColor)
    .attr("x", function (d) {
      return x(d.weekday);
    })
    .attr("width", x.bandwidth())
    .attr("y", height)
    .attr("height", 0)
    .transition()
    .duration(1000)
    .attr("y", function (d) {
      return y(d.totalOrders);
    })
    .attr("height", function (d) {
      return height - y(d.totalOrders);
    });

  svg
    .selectAll(".bar")
    .on("mouseover", function () {
      d3.select(this).style("opacity", 0.7);
    })
    .on("mouseout", function () {
      d3.select(this).style("opacity", 1);
    });

  svg
    .selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .style("fill", "#898989")
    .attr("x", function (d) {
      return x(d.weekday) + x.bandwidth() / 2;
    })
    .attr("y", function (d) {
      return height;
    })
    .text(function (d) {
      return d.totalOrders;
    })
    .style("opacity", 0)
    .transition()
    .duration(1000)
    .attr("y", function (d) {
      return y(d.totalOrders) - 5;
    })
    .style("opacity", 1)
    .attr("text-anchor", "middle")
    .attr("class", function (d) {
      return d3.select(this).text() ? "label bold" : "label";
    });
}
function createChartView(data) {
  const processedData = processDataForBar(data);
  createChartForBar(processedData);

  const quarterSelect = document.getElementById("quarterSelect");
  quarterSelect.addEventListener("change", function () {
    const selectedValue = parseInt(quarterSelect.value);
    switch (selectedValue) {
      case 1:
        selectedQuarter = { startMonth: 0, endMonth: 2 }; // Jan-Mar
        break;
      case 2:
        selectedQuarter = { startMonth: 3, endMonth: 5 }; // Apr-Jun
        break;
      case 3:
        selectedQuarter = { startMonth: 6, endMonth: 8 }; // Jul-Sep
        break;
      case 4:
        selectedQuarter = { startMonth: 9, endMonth: 11 }; // Oct-Dec
        break;
      default:
        selectedQuarter = { startMonth: 0, endMonth: 2 }; // Jan-Mar by default
    }

    const processedData = processDataForBar(data);
    d3.select("#bar-chart").select("svg").remove();
    createChartForBar(processedData);
  });
}

function transformOrdersToMonthlySummary(orders) {
  // Define a map to store aggregated data by month
  const monthlySummary = new Map();

  // Iterate over each order
  orders.forEach((order) => {
    const date = new Date(order.date);
    const month = date.toLocaleString("en-us", { month: "short" }); // Get month label like 'Jan', 'Feb', etc.

    // If the month is not in the map, initialize its values
    if (!monthlySummary.has(month)) {
      monthlySummary.set(month, {
        total_profit: 0,
        total_cost: 0,
        total_tax: 0,
      });
    }

    // Update totals for the month
    const monthSummary = monthlySummary.get(month);
    order.items.forEach((item) => {
      monthSummary.total_profit += (item.price - item.cost) * item.quantity; // Profit = Subtotal - Cost
      monthSummary.total_cost += item.cost * item.quantity;
      monthSummary.total_tax += item.tax;
    });
  });

  // Convert the Map to the desired array format
  const result = Array.from(monthlySummary)
    .map(([label, summary]) => ({
      total_profit: summary.total_profit,
      total_cost: summary.total_cost,
      total_tax: summary.total_tax,
      label,
    }))
    .sort((a, b) => {
      const monthsOrder = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return monthsOrder.indexOf(a.label) - monthsOrder.indexOf(b.label);
    });

  return result;
}

Chart = (function () {
  let _data;
  let _chartMargin, _chartSize;
  let _chartD3;
  let _x, _y;
  let _xAxis, _yAxis;

  function initialize() {
    fetch("https://660dd96a6ddfa2943b3552f2.mockapi.io/roms/receipts")
      .then((response) => response.json())
      .then((res_data) => {
        _data = transformOrdersToMonthlySummary(res_data[0]["data"]);
        build();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        fetch("../fallback.json")
          .then((response) => response.json())
          .then((res_data) => {
            l_data = transformOrdersToMonthlySummary(res_data[0]["data"]);
            build();
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      });
    _chartSize = {};
    _chartMargin = {};
  }

  function getLocale() {
    return d3.locale({
      decimal: ".",
      thousands: ",",
      grouping: [3],
      currency: ["$", ""],
      dateTime: "%A, %e %B %Y, %X",
      date: "%Y-%m-%d",
      time: "%H:%M:%S",
      periods: ["AM", "PM"],
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      shortMonths: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    });
  }

  function update() {
    let total = 0;
    for (const k in _data) {
      if (_data.hasOwnProperty(k)) {
        const v = _data[k];
        total += v.total_profit + v.total_tax + v.total_cost;
      }
    }

    let format = getLocale().numberFormat(",.2f");
    total = format(total);

    let total_label = document.querySelector("h4");
    total_label.innerHTML = "$ " + total;

    let maxData = d3.max(_data, function (d) {
      return d.total_profit + d.total_tax + d.total_cost;
    });

    if (maxData === 0) {
      maxData = 500;
    }

    _y.domain([0, maxData]).nice(5);
    _yAxis.scale(_y);

    let line = d3.svg
      .line()
      .x(function (d, i) {
        return _x(i) + 40;
      })
      .y(function (d) {
        return _y(d.total_profit + d.total_tax + d.total_cost);
      });

    _chartD3
      .select("path.line")
      .transition()
      .duration(600)
      .ease("quad-in-out")
      .attr("d", line(_data));

    _chartD3
      .selectAll("circle.circles")
      .data(_data)
      .transition()
      .duration(600)
      .ease("quad-in-out")
      .attr("cy", function (d) {
        return -(
          _chartSize.height - _y(d.total_profit + d.total_tax + d.total_cost)
        );
      });

    _chartD3
      .selectAll("g.tooltip")
      .data(_data)
      .transition()
      .duration(600)
      .ease("quad-in-out")
      .attr("transform", function (d, i) {
        let anchroX = i <= 6 ? -12 : -268;
        return (
          "translate(" +
          anchroX +
          ",-" +
          (_chartSize.height -
            _y(d.total_profit + d.total_tax + d.total_cost) +
            12) +
          ")"
        );
      });

    format = getLocale().numberFormat("n");
    _chartD3
      .selectAll("text.total")
      .data(_data)
      .text(function (d) {
        return (
          "$ " +
          format(d3.format(".2f")(d.total_profit + d.total_tax + d.total_cost))
        );
      });
    _chartD3
      .selectAll("text.tax")
      .data(_data)
      .text(function (d) {
        return "$ " + format(d3.format(".2f")(d.total_tax));
      });
    _chartD3
      .selectAll("text.cost")
      .data(_data)
      .text(function (d) {
        return "$ " + format(d3.format(".2f")(d.total_cost));
      });
    _chartD3
      .selectAll("text.profit")
      .data(_data)
      .text(function (d) {
        return "$ " + format(d3.format(".2f")(d.total_profit));
      });

    _chartD3.selectAll("rect.h").on("mouseover", null).on("mouseout", null);
    _chartD3
      .selectAll("rect.h")
      .data(_data)
      .on("mouseover", function (d, i) {
        let t = d.total_profit + d.total_tax + d.total_cost;
        if (t > 0) {
          _chartD3
            .select("g.l1 g:nth-child(" + (i + 1) + ") g.status-bar")
            .style("opacity", 1);
          _chartD3
            .select("g.l2 g:nth-child(" + (i + 1) + ") g.tooltip")
            .style("display", "block");
          _chartD3
            .select("g.l2 g:nth-child(" + (i + 1) + ") circle")
            .style("fill", "#fff");
        }
      })
      .on("mouseout", function (d, i) {
        let t = d.total_profit + d.total_tax + d.total_cost;
        if (t > 0) {
          _chartD3
            .select("g.l1 g:nth-child(" + (i + 1) + ") g.status-bar")
            .style("opacity", 0.7);
          _chartD3
            .select("g.l2 g:nth-child(" + (i + 1) + ") g.tooltip")
            .style("display", "none");
          _chartD3
            .select("g.l2 g:nth-child(" + (i + 1) + ") circle")
            .style("fill", "#333333");
        }
      });

    _chartD3
      .select(".y.axis")
      .transition()
      .duration(600)
      .ease("quad-in-out")
      .call(_yAxis);

    _chartD3
      .selectAll("rect.tax")
      .data(_data)
      .transition()
      .duration(600)
      .ease("quad-in-out")
      .attr("y", function (d) {
        return -(_chartSize.height - _y(d.total_tax));
      })
      .attr("height", function (d) {
        return _chartSize.height - _y(d.total_tax);
      });

    _chartD3
      .selectAll("rect.cost")
      .data(_data)
      .transition()
      .duration(600)
      .ease("quad-in-out")
      .attr("y", function (d) {
        return -(_chartSize.height - _y(d.total_tax + d.total_cost));
      })
      .attr("height", function (d) {
        return _chartSize.height - _y(d.total_cost);
      });

    _chartD3
      .selectAll("rect.profit")
      .data(_data)
      .transition()
      .duration(600)
      .ease("quad-in-out")
      .attr("y", function (d) {
        return -(
          _chartSize.height - _y(d.total_profit + d.total_tax + d.total_cost)
        );
      })
      .attr("height", function (d) {
        return _chartSize.height - _y(d.total_profit);
      });

    const legend = _chartD3
      .append("g")
      .attr("class", "legend-bar")
      .attr("transform", `translate(0,${-_chartMargin.top / 2})`);

    const colors = ["#333333", "#999999", "#006693", "#a42c0f"];

    const legendItem = legend
      .selectAll(".legend-item")
      .data(["Total", "Tax", "Cost", "Profit"])
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(${i * 70}, 0)`);

    legendItem
      .append("circle")
      .attr("cx", 0)
      .attr("cy", -6)
      .attr("r", 6)
      .style("fill", (d, i) => colors[i])
      .style("stroke", (d, i) => colors[i]);

    legendItem
      .append("text")
      .attr("x", 12)
      .attr("y", -1)
      .text((d) => d)
      .style("fill", (d, i) => colors[i])
      .style("font-weight", "bold");
  }

  function onChange(e) {
    let select = document.querySelector("select#years");
    let v = select.options[select.selectedIndex].value;

    let request = new XMLHttpRequest();
    request.open("GET", "./data/chart-" + v + ".json", true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        _data = JSON.parse(request.responseText);
        update();
      }
    };
    request.send();

    return false;
  }

  function build() {
    let select = document.querySelector("select#years");
    select.addEventListener("change", onChange);

    _chartMargin = { left: 40, top: 60, bottom: 45, right: 0 };
    _chartSize.height = 320 - _chartMargin.top - _chartMargin.bottom;
    _chartSize.width = 880 - _chartMargin.left - _chartMargin.right;

    _chartD3 = d3
      .select("svg#chart")
      .append("g")
      .attr(
        "transform",
        "translate(" + _chartMargin.left + "," + _chartMargin.top + ")"
      );

    _x = d3.scale
      .ordinal()
      .domain(d3.range(_data.length))
      .rangeRoundBands([0, _chartSize.width], 0);

    _y = d3.scale
      .linear()
      .domain([
        0,
        d3.max(_data, function (d) {
          return d.total_profit + d.total_tax + d.total_cost;
        }),
      ])
      .range([_chartSize.height, 0])
      .nice(5);

    _xAxis = d3.svg
      .axis()
      .scale(_x)
      .tickFormat(function (i) {
        return _data[i].label;
      })
      .orient("bottom");

    _yAxis = d3.svg
      .axis()
      .scale(_y)
      .orient("left")
      .tickSize(-_chartSize.width)
      .ticks(5);

    _chartD3
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(4," + (_chartSize.height + 10) + ")")
      .call(_xAxis);

    _chartD3
      .append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(10,0)")
      .call(_yAxis);

    let starting_line = d3.svg
      .line()
      .x(function (d, i) {
        return _x(i) + 40;
      })
      .y(_chartSize.height);

    let l1 = _chartD3.append("g").attr("class", "l1");

    let bars = l1.selectAll("g.bar").data(_data);

    bars
      .enter()
      .append("g")
      .attr("class", "bar")
      .attr("transform", function (d, i) {
        return "translate(" + (_x(i) + 40) + "," + _chartSize.height + ")";
      });

    let singleBars = bars
      .append("g")
      .attr("class", "status-bar")
      .attr("transform", "translate(-3,0) scale(1,0)");

    singleBars
      .append("rect")
      .attr("class", "tax")
      .attr("width", 6)
      .attr("fill", "#999999")
      .attr("y", function (d) {
        return -(_chartSize.height - _y(d.total_tax));
      })
      .attr("height", function (d) {
        return _chartSize.height - _y(d.total_tax);
      });
    singleBars
      .append("rect")
      .attr("class", "cost")
      .attr("width", 6)
      .attr("fill", "#006693")
      .attr("y", function (d) {
        return -(_chartSize.height - _y(d.total_tax + d.total_cost));
      })
      .attr("height", function (d) {
        return _chartSize.height - _y(d.total_cost);
      });
    singleBars
      .append("rect")
      .attr("class", "profit")
      .attr("width", 6)
      .attr("fill", "#a42c0f")
      .attr("y", function (d) {
        return -(
          _chartSize.height - _y(d.total_profit + d.total_tax + d.total_cost)
        );
      })
      .attr("height", function (d) {
        return _chartSize.height - _y(d.total_profit);
      });
    singleBars
      .transition()
      .duration(600)
      .ease("quad-in-out")
      .attr("transform", "translate(-3,0) scale(1,1)");

    bars
      .append("circle")
      .attr("class", "circles")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 4)
      .attr("fill", "#333333");

    _chartD3
      .append("path")
      .attr("class", "line")
      .attr("d", starting_line(_data));

    let l2 = _chartD3.append("g").attr("class", "l2");
    let tooltip = l2.selectAll("g.tooltip").data(_data);

    tooltip
      .enter()
      .append("g")
      .attr("class", "tooltip-placeholder")
      .attr("transform", function (d, i) {
        return "translate(" + (_x(i) + 40) + "," + _chartSize.height + ")";
      });

    let format = getLocale().numberFormat("n");
    let tooltips = tooltip
      .append("g")
      .attr("class", "tooltip")
      .attr("transform", function (d, i) {
        return i <= 6 ? "translate(-12,-12)" : "translate(-268,-12)";
      });
    tooltips
      .append("path")
      .attr("class", "r1")
      .attr("d", "M80,24H12C5.4,24,0,18.6,0,12l0,0C0,5.4,5.4,0,12,0l68,0V24z");
    tooltips
      .append("rect")
      .attr("class", "r2")
      .attr("x", 80)
      .attr("y", 0)
      .attr("height", 24)
      .attr("width", 60);
    tooltips
      .append("rect")
      .attr("class", "r3")
      .attr("x", 140)
      .attr("y", 0)
      .attr("height", 24)
      .attr("width", 60);
    tooltips
      .append("path")
      .attr("class", "r4")
      .attr(
        "d",
        "M268,24h-68V0l68,0c6.6,0,12,5.4,12,12v0C280,18.6,274.6,24,268,24z"
      );
    tooltips
      .append("text")
      .attr("class", "t total")
      .attr("transform", "translate(70,15)")
      .attr("text-anchor", "end")
      .text(function (d) {
        return "$ " + format(d.total_profit + d.total_tax + d.total_cost);
      });
    tooltips
      .append("text")
      .attr("class", "t tax")
      .attr("transform", "translate(130,15)")
      .attr("text-anchor", "end")
      .text(function (d) {
        return "$ " + format(d.total_tax);
      });
    tooltips
      .append("text")
      .attr("class", "t cost")
      .attr("transform", "translate(190,15)")
      .attr("text-anchor", "end")
      .text(function (d) {
        return "$ " + format(d.total_cost);
      });
    tooltips
      .append("text")
      .attr("class", "t profit")
      .attr("transform", "translate(250,15)")
      .attr("text-anchor", "end")
      .text(function (d) {
        return "$ " + format(d.total_profit);
      });
    tooltips
      .append("circle")
      .attr("cx", function (d, i) {
        return i <= 6 ? 12 : 268;
      })
      .attr("cy", 12)
      .attr("r", 4)
      .attr("fill", "#fff");

    tooltip
      .append("rect")
      .attr("class", "h")
      .attr("width", 60)
      .attr("fill", "rgba(0,0,0,0)")
      .attr("height", _chartSize.height)
      .attr("y", -_chartSize.height)
      .attr("x", -30);
    update();
  }

  return {
    init: function () {
      initialize();
    },
  };
})();
