<template>
    <div ref="barGraphContainer" class="bar-graph-container"></div>
  </template>
  
  <script>
  import * as d3 from "d3";
  
  export default {
    name: "HorizontalBarGraph",
    props: {
      data: {
        type: Array,
        required: true,
      },
      visibleBars: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        graph: null,
      };
    },
    mounted() {
      this.createGraph();
    },
    watch: {
      visibleBars: {
        handler() {
          this.updateGraph();
        },
        deep: true,
      },
    },
    methods: {
        createGraph() {
      const container = this.$refs.barGraphContainer;
      const width = container.offsetWidth;

      const barHeight = 40;
      const barPadding = 50;
      const labelOffset = barPadding;

      const svgHeight =
        this.data.length * (barHeight + barPadding) - barPadding + labelOffset;

      container.style.height = `${svgHeight}px`;

      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", svgHeight)
        .attr("viewBox", `0 -${labelOffset} ${width} ${svgHeight}`);

      const maxValue = d3.max(this.data, (d) => d.value);

      const xScale = d3.scaleLinear().domain([0, maxValue]).range([0, width]);

      this.graph = svg
        .selectAll(".bar-group")
        .data(this.data)
        .join("g")
        .attr("class", "bar-group")
        .attr("transform", (d, i) => `translate(0, ${i * (barHeight + barPadding)})`);

      this.graph
        .append("rect")
        .attr("class", "bar")
        .attr("width", (d) => xScale(d.value))
        .attr("height", barHeight)
        .attr("rx", "3")
        .attr("fill", (d) => d.color);

      this.graph
        .append("text")
        .attr("class", "label")
        .attr("x", 5)
        .attr("y", -barPadding / 5.7)
        .attr("font-size", "18px")
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .attr("fill", "#000")
        .text((d) => d.label);

      this.graph
        .append("text")
        .attr("class", "value")
        .attr("x", (d) => xScale(d.value) - 5)
        .attr("y", barHeight / 2)
        .attr("dy", ".35em") // Vertically center the text within the bars
        .attr("text-anchor", "end")
    .attr("font-size", "16px")
    .attr("font-family", "sans-serif")
    .attr("fill", "#fff")
    .text((d) => d3.format(",")(d.value));

  this.updateGraph();
},


  
      updateGraph() {
        this.graph.style("display", (d, i) => (this.visibleBars[i] ? "block" : "none"));
      },
    },
  };
  </script>
  
  <style scoped>
.bar-graph-container {
  position: relative;
  width: 100%;
  height: auto;
}
  
  .bar {
    stroke: #fff;
    stroke-width: 1.5px;
  }
  

  </style>
  
  