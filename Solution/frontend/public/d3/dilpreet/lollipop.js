// Fetch data from API endpoint
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

// Process data and calculate total revenue per month
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

// Function to get month name from month number
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

// Function to calculate revenue from data API
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

// Main function to create lollipop chart
async function createLollipopChart() {
  const data = await fetchData();
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

createLollipopChart();
