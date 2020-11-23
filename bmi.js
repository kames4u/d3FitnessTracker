var width = 600,
    height = 500;

var svgBMI = d3.select(".bmi").append("svg")
    .attr("width", width)
    .attr("height", height);

svgBMI.append("circle")
    .attr("cx", 350)
    .attr("cy", 200)
    .attr("r", 150)
    .style("fill", "white")
    .style("fill-opacity", ".7");

svgBMI.append("circle")
    .attr("cx", 280)
    .attr("cy", 160)
    .attr("r", 20)
    .style("fill", "white");

svgBMI.append("circle")
    .attr("cx", 420)
    .attr("cy", 160)
    .attr("r", 20)
    .style("fill", "white");

const face = svgBMI.append('g')
    .attr('transform', `translate(300, 250)`);

const mouth = svgBMI.append('g')
    .attr('transform', `translate(340, 200)`);

mouth
    .append('path')
    .attr('d', d3.arc()({
        innerRadius: 75,
        outerRadius: 90,
        startAngle: Math.PI / .85,
        endAngle: Math.PI * 3 / 4
    }))
    .style("fill", "white");

// face
//     .append('rect')
//       .attr('x', 20)
//       .attr('y', 20)
//       .attr('width', 50)
//       .attr('height', 20)
//       .style("fill", "white");

// face.append("circle")
//     .attr("cx", 45)
//     .attr("cy", 0)
//     .attr("r", 30)
//     .style("fill", "white");

// svgBMI.append("circle")
//     .attr("cx", 350)
//     .attr("cy", 200)
//     .attr("r", 180)
//     .style("fill", "red")
//     .style("fill-opacity", ".2");

// svgBMI.append("circle")
//     .attr("cx", 350)
//     .attr("cy", 200)
//     .attr("r", 145)
//     .style("fill", "green")
//     .style("fill-opacity", ".2");

svgBMI.append("circle")
    .attr("cx", 350)
    .attr("cy", 200)
    .attr("r", 130)
    .style("fill", "brown")
    .style("fill-opacity", ".2");