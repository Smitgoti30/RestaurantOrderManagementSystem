document.addEventListener("DOMContentLoaded", function () {
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

  // Call the rest API for data
  fetch("https://660dd96a6ddfa2943b3552f2.mockapi.io/roms/receipts")
    .then((response) => response.json())
    .then((res_data) => {
      const { data, key } = transformData2(res_data[0]["data"]);
      console.log(data);
      initStackedBarChart.draw({
        data,
        key,
        element: "stacked-bar",
      });
      initGroupedBar(groupData(res_data[0]["data"]));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      fetch("../fallback.json")
        .then((response) => response.json())
        .then((res_data) => {
          const { data, key } = transformData2(res_data[0]["data"]);
          console.log(data);
          initStackedBarChart.draw({
            data,
            key,
            element: "stacked-bar",
          });
          initGroupedBar(groupData(res_data[0]["data"]));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
});
