document.addEventListener("DOMContentLoaded", function () {
  // data transformation
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
  function createAndRenderDonutChart({
    ordersData,
    profitData,
    itemCountData,
  }) {
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
        let num =
          Math.round((i.data.value / i.data.all) * 100).toString() + "%";
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

  // Call the rest API for data
  fetch("https://660dd96a6ddfa2943b3552f2.mockapi.io/roms/receipts")
    .then((response) => response.json())
    .then((data) => {
      createAndRenderDonutChart(transformData(data[0]["data"]));
      createAndRenderCircularPack(calculateItemMetrics(data[0]["data"]));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      fetch("../fallback.json")
        .then((response) => response.json())
        .then((data) => {
          createAndRenderDonutChart(transformData(data[0]["data"]));
          createAndRenderCircularPack(calculateItemMetrics(data[0]["data"]));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
});
