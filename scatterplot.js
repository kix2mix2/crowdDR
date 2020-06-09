class Scatterplot {
    constructor(_config) {
        this.config = {
            parentElement: _config.parentElement,
            radius: _config.radius || 8,
            containerWidth: _config.containerWidth || 300,
            containerHeight: _config.containerHeight || 300,
            margin: _config.margin || {top: 0, bottom: 0, right: 0, left: 0}
        };
        this.points = [];
        console.log('hello scat')
        this.initVis();

    }

    getAllCoordinates() {
        return this.points;
    }

    initVis() {
        let vis = this;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.svg = d3.select(vis.config.parentElement).append('svg')
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        vis.chart.append('rect')
            .attr('class', 'tracking-area')
            .attr('width', vis.width)
            .attr('height', vis.height)
            .on('click', function () {
                vis.addPoint(d3.mouse(this));
            });

        // vis.yAxis = vis.chart.append('line')
        //     .attr('class', 'axis')
        //     .attr('y2', vis.height);
        //
        // vis.xAxis = vis.chart.append('line')
        //     .attr('class', 'axis')
        //     .attr('y1', vis.height)
        //     .attr('y2', vis.height)
        //     .attr('x1', 0)
        //     .attr('x2', vis.width);
    }

    render() {
        let vis = this;

        // Draw points here (D3 general update pattern)
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    drawCircle(x, y, size) {


        console.log('Drawing circle at', x, y, size);
        this.chart.append("circle")
            .attr('class', 'click-circle')
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", size)
            .style('fill', function(){return d3.interpolateTurbo(size/20)})
            .style('pointer-events', 'none');
    }

    addPoint(mouse) {
        this.points.push(mouse);
        console.log(this.points);
        this.drawCircle(mouse[0], mouse[1], this.getRandom(5, 20));
    }


}