class Grid {

    function;
    function;

    constructor(_config) {
        this.config = {
            parentElement: _config.parentElement,
            radius: _config.radius || 8,
            containerWidth: _config.containerWidth || 300,
            containerHeight: _config.containerHeight || 300,
            margin: _config.margin || {top: 0, bottom: 0, right: 0, left: 0}
        };
        this.points = [];

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

    }

    render() {
        let vis = this;

        // Draw points here (D3 general update pattern)
    }




}