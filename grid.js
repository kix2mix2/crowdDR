class Grid {
    constructor(_config) {
        this.config = {
            parentElement: _config.parentElement,
            radius: _config.radius || 8,
            containerWidth: _config.containerWidth || 300,
            containerHeight: _config.containerHeight || 300,
            margin: _config.margin || {top: 0, bottom: 0, right: 0, left: 0},
            rows: _config.rows || 5,
            cols: _config.cols || 4,
            images: _config.images

        };
        this.points = [];
        console.log('hello grid')

        this.initVis();
    }

    getAllCoordinates() {
        console.log('hello')
        return this.points;
    }

    initVis() {
        let vis = this;


        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.main = d3.select(vis.config.parentElement).append('div')
            .attr('class','grid').attr('class','row-lg');


        vis.grid_div = vis.main.append('div')
            .attr('class','grid').attr('class','col-lg-6');

        vis.focus_div = vis.main.append('div')
            .attr('class','grid').attr('class','col-lg-6');

        var k = 0;
        for (var i = 0; i < this.config.rows; i++) {
            vis.row = vis.grid_div.append('div').attr('class','row');
            for (var j = 0; j < this.config.cols; j++) {
                vis.cell = vis.row.append('div').attr('class','col').attr('id', k);
                vis.img = vis.cell.append('img')
                    .attr('src', this.config.images[k])
                    .attr('width', 200)
                    .attr('height', 'auto');

                vis.label = vis.cell.append('p').text('(unlabeled)');
                k++;
            }
        }




        // vis.svg = d3.select(vis.config.parentElement).append('svg')
        //     .attr('width', vis.config.containerWidth)
        //     .attr('height', vis.config.containerHeight);
        //
        // vis.chart = vis.svg.append('g')
        //     .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);
        //
        // vis.chart.append('rect')
        //     .attr('class', 'tracking-area')
        //     .attr('width', vis.width)
        //     .attr('height', vis.height)
        //     .on('click', function () {
        //             var mouse = d3.mouse(this);
        //             vis.chart.append("circle")
        //             .attr('class', 'click-circle')
        //             .attr("cx", mouse[0])
        //             .attr("cy", mouse[1])
        //             .attr("r", 10)
        //             .style('fill', function(){return d3.interpolateTurbo(.2)})
        //             .style('pointer-events', 'none');
        //         });

    }

    render() {
        let vis = this;

        // Draw points here (D3 general update pattern)
    }




}