<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="container-fluid px-0">
      <div class="row h-100">
        <div class="">
          <div class="p-4 bg-white rounded w-100">
            <div style="min-height: 160px;">
            <h1 class="mb-1" v-html="currentText.title"></h1>
            <p class="fs-4 mb-0" v-html="currentText.content"></p>
          </div>
            <div ref="barGraphContainer" class="bar-graph-container"></div>
            <p class="pt-1 mb-0 fs-5 text-center"><i>Scroll here to continue. Scroll or click the map to see the data.</i></p>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "mapOverlayWchart",
  props: {
    currentIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      barData: [
        { label: "Mt. Laurel Projections", value: 305504, color: "#ae017e", index: 4 },
        { label: "What we have", value: 206083, color: "#238443", index: 5 },
        { label: "What we need", value: 797109, color: "#cc4c02", index: 6 },
      ],
      visibleBars: [true, true, true],
      graph: null,
      xScale: null,
      textMinHeight: 0,
      textData: [
        { title: "Where do we stand now?", content: "Based on 2017 court projections, Mount Laurel calls for <b>305,504</b> affordable homes across the state by 2025.", index: 4 },
        { title: "Current Estimates", content: '2022 <a href="https://www.nj.gov/dca/divisions/codes/publications/developments.html" target="_blank">data</a> shows we have <b>206,083</b> affordable homes.', index: 5 },
        { title: "The Housing Need", content: "<p>Roughly <b>797,109</b> renter households across the state are moderate to low income.", index: 6 },
      ],
    };
  },



  mounted() {
    this.createGraph();
  },



  watch: {
    currentIndex(newIndex) {
      // Update the visibility of bars based on the currentIndex
      this.visibleBars = this.barData.map((bar) => bar.index === newIndex);
    },

    visibleBars: {
      handler() {
        this.updateGraph();
      },
      deep: true,
    },
  },


  computed: {

    currentText() {
      return this.textData.find((text) => text.index === this.currentIndex) || { title: "", content: "" };
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
        this.barData.length * (barHeight + barPadding) - barPadding + labelOffset;

      container.style.height = `${svgHeight}px`;

      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", svgHeight)
        .attr("viewBox", `0 -${labelOffset} ${width} ${svgHeight}`);

      const maxValue = d3.max(this.barData, (d) => d.value);

      const xScale = d3.scaleLinear().domain([0, maxValue]).range([0, width]);

      this.graph = svg
        .selectAll(".bar-group")
        .data(this.barData)
        .join("g")
        .attr("class", "bar-group")
        .attr("transform", (d, i) => `translate(0, ${i * (barHeight + barPadding)})`);

      this.graph
        .append("rect")
        .attr("class", "bar")
        .attr("width", 0) // Initialize bar width to 0 for animation
        .attr("height", barHeight)
        .attr("rx", "3")
        .attr("fill", (d) => d.color)
        .transition()
        .duration(1000) // Duration of the animation in milliseconds
        .attr("width", (d) => xScale(d.value)); // Final bar width after animation

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
        .attr("font-weight", "400")
        .attr("font-family", "sans-serif")
        .attr("fill", "#fff")
        .text((d) => d3.format(",")(d.value));

      this.updateGraph();
    },

    updateGraph() {
      this.graph.style("display", (d, i) => (i <= this.currentIndex - 4 ? "block" : "none"));
    },


  },
};
</script>

<style>
/* ... */
h1 {
  font-family: 'Lora', serif;
  font-weight: 900;
}
/* ... */

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
