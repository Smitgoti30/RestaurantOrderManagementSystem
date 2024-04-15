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
