const margin = { top: 40, right: 20, bottom: 50, left: 100 };
const graphWidth = 560 - margin.right - margin.left;
const graphHeight = 400 - margin.top - margin.bottom;

const svgWorkout = d3
  .select('.workout')
  .append('svg')
  .attr('width', graphWidth + margin.left + margin.right)
  .attr('height', graphHeight + margin.top + margin.bottom);

const graphWorkout = svgWorkout
  .append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const x = d3.scaleTime().range([0, graphWidth]);
const y = d3.scaleLinear().range([graphHeight, 0]);

const xAxisGroup = graphWorkout
  .append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0, ${graphHeight})`);

const yAxisGroup = graphWorkout.append('g')
  .attr('class', 'y-axis');

const dlPath = graphWorkout.append('path');

const dottedDLines = graphWorkout.append('g')
  .attr('class', 'lines')
  .style('opacity', 0);

const xDottedDLine = dottedDLines.append('line')
  .attr('stroke', '#da693d')
  .attr('stroke-width', 1)
  .attr('stroke-dasharray', 4);

const yDottedDLine = dottedDLines.append('line')
  .attr('stroke', '#da693d')
  .attr('stroke-width', 1)
  .attr('stroke-dasharray', 4);

const clPath = graphWorkout.append('path');

const dottedCLines = graphWorkout.append('g')
  .attr('class', 'lines')
  .style('opacity', 0);

const xDottedCLine = dottedCLines.append('line')
  .attr('stroke', '#2dd2e7')
  .attr('stroke-width', 1)
  .attr('stroke-dasharray', 4);

const yDottedCLine = dottedCLines.append('line')
  .attr('stroke', '#2dd2e7')
  .attr('stroke-width', 1)
  .attr('stroke-dasharray', 4);

var tooltip = d3.select(".workout")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

const update = (data) => {

  data = data.filter(item => item.activity == activity);

  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  x.domain(d3.extent(data, (d) => new Date(d.date)));
  y.domain([0, d3.max(data, (d) => d.distance)]);

  if (distFlag) {

    const dline = d3.line()
      .x(function (d) { return x(new Date(d.date)) })
      .y(function (d) { return y(d.distance) });

    dlPath.data([data])
      .attr('fill', 'none')
      .attr('stroke', '#da693d')
      .attr('stroke-width', '2')
      .attr('d', dline);

    const dCircles = graphWorkout.selectAll('circle').data(data);
    dCircles.exit().remove();

    dCircles
      .attr('r', '5')
      .attr('cx', (d) => x(new Date(d.date)))
      .attr('cy', (d) => y(d.distance))
      .attr('fill', '#da693d');

    dCircles
      .enter()
      .append('circle')
      .attr('r', '5')
      .attr('cx', (d) => x(new Date(d.date)))
      .attr('cy', (d) => y(d.distance))
      .attr('fill', '#da693d');

    if (!bothFlag) {
      clPath.data([data])
        .attr('d', '');

      graphWorkout.selectAll('ellipse').remove();
    }

  }

  if (calFlag) {

    const cline = d3.line()
      .x(function (d) { return x(new Date(d.date)) })
      .y(function (d) { return y(d.calories) });

    clPath.data([data])
      .attr('fill', 'none')
      .attr('stroke', '#2dd2e7')
      .attr('stroke-width', '2')
      .attr('d', cline);

    const cEclipse = graphWorkout.selectAll('ellipse').data(data);
    cEclipse.exit().remove();

    cEclipse
      .attr('rx', '5')
      .attr('ry', '5')
      .attr('cx', (d) => x(new Date(d.date)))
      .attr('cy', (d) => y(d.calories))
      .attr('fill', '#2dd2e7');

    cEclipse
      .enter()
      .append('ellipse')
      .attr('rx', '5')
      .attr('ry', '5')
      .attr('cx', (d) => x(new Date(d.date)))
      .attr('cy', (d) => y(d.calories))
      .attr('fill', '#2dd2e7');

    if (!bothFlag) {
      dlPath.data([data])
        .attr('d', '');

      graphWorkout.selectAll('circle').remove();
    }

  }

  graphWorkout.selectAll('circle')
    .on('mouseover', (d, i, n) => {
      d3.select(n[i])
        .transition().duration(100)
        .attr('r', 8)
        .attr('fill', '#fff');
      xDottedDLine
        .attr('x1', x(new Date(d.date)))
        .attr('x2', x(new Date(d.date)))
        .attr('y1', graphHeight)
        .attr('y2', y(d.distance));
      yDottedDLine
        .attr('x1', 0)
        .attr('x2', x(new Date(d.date)))
        .attr('y1', y(d.distance))
        .attr('y2', y(d.distance));
      dottedDLines.style('opacity', 1);
      //tooltip.style("opacity", 1)

      var xPosition = parseFloat(d3.select(n[i]).attr("cx")) + 125 ;
      var yPosition = parseFloat(d3.select(n[i]).attr("cy"));

      d3.select("#dtooltip")
        .style("left", xPosition + "px")
        .style("top", yPosition + "px")	
        .select("#ttdDate").text(new Date(d.date).toISOString().slice(0,10).toString());
     
      d3.select("#dtooltip")
      .classed("dhidden", false)
      .select("#ttdDist").text(d.distance);
    })
    .on('mouseleave', (d, i, n) => {
      d3.select(n[i])
        .transition().duration(100)
        .attr('r', 5)
        .attr('fill', '#da693d');
      dottedDLines.style('opacity', 0)
      //tooltip.style("opacity", 0)

      d3.select("#dtooltip").classed("dhidden", true);
    });

  graphWorkout.selectAll('ellipse')
    .on('mouseover', (d, i, n) => {
      d3.select(n[i])
        .transition().duration(100)
        .attr('r', 8)
        .attr('fill', '#fff');
      xDottedCLine
        .attr('x1', x(new Date(d.date)))
        .attr('x2', x(new Date(d.date)))
        .attr('y1', graphHeight)
        .attr('y2', y(d.calories));
      yDottedCLine
        .attr('x1', 0)
        .attr('x2', x(new Date(d.date)))
        .attr('y1', y(d.calories))
        .attr('y2', y(d.calories));
      dottedCLines.style('opacity', 1);

      var xPosition = parseFloat(d3.select(n[i]).attr("cx")) + 125 ;
      var yPosition = parseFloat(d3.select(n[i]).attr("cy"));

      d3.select("#ctooltip")
        .style("left", xPosition + "px")
        .style("top", yPosition + "px")	
        .select("#ttcDate").text(new Date(d.date).toISOString().slice(0,10).toString());
     
      d3.select("#ctooltip")
      .classed("chidden", false)
      .select("#ttcCal").text(d.calories);
    })
    .on('mouseleave', (d, i, n) => {
      d3.select(n[i])
        .transition().duration(100)
        .attr('r', 5)
        .attr('fill', '#2dd2e7');
      dottedCLines.style('opacity', 0)

      d3.select("#ctooltip").classed("chidden", true);

    });

  const xAxis = d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat('%b %d'));

  const yAxis = d3
    .axisLeft(y)
    .ticks(8);

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  xAxisGroup
    .selectAll('text')
    .attr('transform', 'rotate(-50)')
    .attr('text-anchor', 'end');
};

// Firestore
var data = [];

db.collection('workout')
  .orderBy('date')
  .onSnapshot((res) => {
    res.docChanges().forEach((change) => {
      const doc = { ...change.doc.data(), id: change.doc.id };

      switch (change.type) {
        case 'added':
          data.push(doc);
          break;
        case 'modified':
          const index = data.findIndex((item) => item.id == doc.id);
          data[index] = doc;
          break;
        case 'removed':
          data = data.filter((item) => item.id !== doc.id);
          break;
        default:
          break;
      }
    });

    update(data);
  });

 