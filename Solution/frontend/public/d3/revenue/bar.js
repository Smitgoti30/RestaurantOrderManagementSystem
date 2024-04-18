async function fetchData() {
  try {
    const response = await fetch(
      "https://660dd96a6ddfa2943b3552f2.mockapi.io/roms/receipts"
    );
    const data = await response.json();
    return data[0].data;
  } catch (error) {
    console.error("Error fetching data:", error);
    const fallbackResponse = await fetch("../fallback.json");
    const fallbackData = await fallbackResponse.json();
    return fallbackData[0].data;
  }
}

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
    .select("#chart")
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

let selectedQuarter = { startMonth: 0, endMonth: 2 }; // Jan-Mar by default

document.addEventListener("DOMContentLoaded", async function () {
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
      d3.select("svg").remove();
      createChartForBar(processedData);
    });
  }
  const data = await fetchData();
  createChartView(data);
});
