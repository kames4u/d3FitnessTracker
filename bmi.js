var width = 600,
    height = 500;

const spanbmi = document.querySelector('.spanbmi');
const hresult = document.querySelector('.hresult');
const wresult = document.querySelector('.wresult');

var svgBMI = d3.select(".bmi").append("svg")
    .attr("width", width)
    .attr("height", height);


svgBMI.append("circle")
    .attr("cx", 350)
    .attr("cy", 200)
    .attr("r", 150)
    .style("fill", "white")
    .style("fill-opacity", ".4");

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



const updatebmi = (bmidata) => {

    let height = bmidata[0].height;
    let weight = bmidata[0].weight;

    // Obese => 30
    // Overweight = 25.0 to 29.9
    // Normal weight = 18.5 to 24.9
    // Underweight < 18.5

    //Formula: weight(pounds) * 703 and divide by height (inches) squared.

    let bmiVal = (weight * 703) / (height * height);

    let bmiStat = "Normal"
    let bmiCol = "green"

    if (bmiVal < 18.5) {
        bmiStat = "Underweight"
        bmiCol = "grey"

        if (bmiVal < 10){
            bmiVal = 10
        }

        face
            .append('rect')
            .attr('x', 20)
            .attr('y', 20)
            .attr('width', 50)
            .attr('height', 20)
            .style("fill", "white");

        mouth.selectAll('path').remove();

    } else if (bmiVal <= 24.9 && bmiVal >= 18.5) {
        bmiStat = "Normal"
        bmiCol = "green"

        mouth
            .append('path')
            .attr('d', d3.arc()({
                innerRadius: 75,
                outerRadius: 90,
                startAngle: Math.PI / .85,
                endAngle: Math.PI * 3 / 4
            }))
            .style("fill", "white");

        face.selectAll('rect').remove();

    } else if (bmiVal <= 29.9 && bmiVal >= 25) {
        bmiStat = "Overweight"
        bmiCol = "orange"

        face
            .append('rect')
            .attr('x', 20)
            .attr('y', 20)
            .attr('width', 50)
            .attr('height', 20)
            .style("fill", "white");

        mouth.selectAll('path').remove();

    } else if (bmiVal >= 30) {
        bmiStat = "Obese"
        bmiCol = "red"

        if (bmiVal > 35){
            bmiVal = 35
        }

        face
            .append('rect')
            .attr('x', 20)
            .attr('y', 20)
            .attr('width', 50)
            .attr('height', 20)
            .style("fill", "white");

        mouth.selectAll('path').remove();
    }

    hresult.textContent = height;
    wresult.textContent = weight;
    spanbmi.textContent = bmiStat;

    svgBMI.selectAll("ellipse").remove();

    svgBMI.append("ellipse")
        .attr("cx", 350)
        .attr("cy", 200)
        .attr("rx", 105 + (bmiVal * 2))
        .attr("ry", 105 + (bmiVal * 2))
        .style("fill", bmiCol)
        .style("fill-opacity", ".5");

};

var bmidata = [];

db.collection('bmi')
    .onSnapshot((res) => {
        res.docChanges().forEach((change) => {
            const doc = { ...change.doc.data(), id: change.doc.id };

            switch (change.type) {
                case 'added':
                    bmidata.push(doc);
                    break;
                case 'modified':
                    const index = bmidata.findIndex((item) => item.id == doc.id);
                    bmidata[index] = doc;
                    break;
                case 'removed':
                    bmidata = bmidata.filter((item) => item.id !== doc.id);
                    break;
                default:
                    break;
            }
        });

        updatebmi(bmidata);
    });