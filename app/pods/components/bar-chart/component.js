import Component from '@ember/component';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisLeft } from 'd3-axis';
import { select, mouse } from 'd3-selection';

export default Component.extend({
  padding: 30,

  didInsertElement() {
    let xAxisData = this.get('data').map(d => d.x)
    let yAxisData = this.get('data').map(d => d.y)
    const maxY = Math.max(...yAxisData)
    const svgHeight = this.$(this.$('svg')[0]).height() + 1
    const svgWidth = this.$(this.$('svg')[0]).width()
    const padding = this.get('padding')

    const yScale = scaleLinear()
      .domain([0, maxY + 5])
      .range([svgHeight, 0])

    const xScale = scaleBand()
      .domain(this.get('data').map(d => d.x))
      .range([padding, svgWidth])
      .paddingInner(0.12)

    const color = scaleLinear()
      .domain([0, Math.max(...yAxisData)])
      .range(['#f9d1a1', '#fd8a00'])

    const svg = select(this.$('svg')[0])

    const yAxis = axisLeft(yScale)

    svg.append('g')
      .call(yAxis)
      .attr('transform', 'translate(30, 0)')

    var tooltip = select('.tooltip')
      .style('opacity', 0);

    const mouseover = (event, d) => {
      tooltip.style("opacity", 1);
    };

    const mouseleave = (event, d) => {
      tooltip.style('opacity', 0);
    }

    const mousemove = (data, i, objs, event) => {
      const [pointerX, pointerY] = mouse(objs[i])
      tooltip.html(`${data.x}: ${Math.round(data.y)}`)
      .style("left", (pointerX + 10) + "px")		
      .style("top", (pointerY - 20) + "px");
    };

    svg.selectAll('rect').data(this.get('data'))
      .enter()
      .append('rect')
      .attr('width', xScale.bandwidth())
      .attr('height', data => yScale(data.y))
      .attr('x', data => xScale(data.x))
      .attr('y', data => yScale(data.y))
      .attr('fill', data => color(data.y))
      .on('click', data => {
        this.set('selectedDataPoint', data)
      })
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .on("mouseover", mouseover);
  }
});
