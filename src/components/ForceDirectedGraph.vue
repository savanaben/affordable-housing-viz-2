<template>
  <div ref="popupContainer" class="d-none popup-container"></div>
  <div ref="graphContainer" class="graph-container"></div>
  <button @click="resetSimulation" class="reset-button btn btn-outline-secondary">Reset Simulation</button>
</template>

<script>

/* eslint-disable no-unused-vars */

import * as d3 from "d3";
import { createPopper } from "@popperjs/core";

export default {
  name: "ForceDirectedGraph",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  mounted() {
  this.createGraph();
  document.addEventListener("click", (event) => {
    if (event.target && typeof event.target.closest === 'function' && !event.target.closest(".node")) {
      this.$refs.popupContainer.classList.add("d-none");
      if (this.popperInstance) {
        this.popperInstance.destroy();
      }
    }
  });
},
  methods: {


    resetSimulation() {
    this.simulation.stop(); // Stop the current simulation
        // Remove the old SVG element
        d3.select(this.$refs.graphContainer).select("svg").remove();
    this.createGraph(); // Re-create the graph
    },



    createGraph() {
      const container = this.$refs.graphContainer;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      
      const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      this.simulation = d3.forceSimulation(this.data.nodes)
        .force("link", d3.forceLink(this.data.links)
          .id((d) => d.id)
          .distance(70))
          .force("charge", d3.forceManyBody().strength(-10))
          .force("collide", d3.forceCollide(60))
        .force("center", d3.forceCenter(width / 2, height / 2).strength(1))
        .on("tick", this.updateGraph.bind(this));

      const labelNodesData = this.data.nodes.map((node) => ({
      ...node,
      isLabelNode: true,
      radius: 40, // Adjust as needed to make space for labels
        }));
      const allNodes = this.data.nodes.concat(labelNodesData);
      this.simulation.nodes(allNodes);

      const link = svg.selectAll(".link")
        .data(this.data.links)
        .join("line")
        .attr("class", "link")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", (d) => Math.sqrt(d.value));

      const node = svg.selectAll(".node")
        .data(this.data.nodes)
        .join("g")
        .attr("class", "node")
        .attr("id", (d) => `node-${d.id}`)
        .call(this.drag(this.simulation));

      node.append("circle")
        .attr("r", (d) => d.radius)
        .attr("fill", (d) => d.color)
        .on("click", (event, d) => this.createPopup(event, d));

        //this is the invis click target
        node.append("circle")
        .attr("r", "28")
        .style("cursor", "pointer")
        .attr("fill", "rgba(0, 0, 0, 0.000001)")
        .on("click", (event, d) => this.createPopup(event, d));


    const labelNode = svg.selectAll(".label-node")
    .data(labelNodesData)
    .join("circle")
    .attr("class", "label-node")
    .attr("r", (d) => d.radius)
    .attr("fill", "none");


      node.append("foreignObject")
        .attr("x", (d) => d.radius + 5)
        .attr("y", "-0.5em")
        .attr("width", 130)
        .attr("height", 90)
        .attr("pointer-events", "none")
        .append("xhtml:div")
        .style("font", (d) => `${d.style?.fontSize || '15px'} sans-serif`)
        .style("font-weight", (d) => d.style?.fontWeight)
        .style("word-wrap", "break-word")
        .style("text-shadow", "2px 0 1px rgba(255, 255, 255, 0.9), -2px 0 1px rgba(255, 255, 255, 0.9), 0 2px 1px rgba(255, 255, 255, 0.9), 0 -2px 1px rgba(255, 255, 255, 0.9)") // Add 4 text shadows with increased offset and stronger effect
        .style("pointer-events", "none")
        .html((d) => d.name);


  //  node.append("text")
  // .attr("dx", (d) => d.radius + 5)
  // .attr("dy", ".35em")
  // .attr("pointer-events", "none")
  // .text((d) => d.name);

    },

    updateGraph() {
      const link = d3.selectAll(".link");
      const node = d3.selectAll(".node");

      link.attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);

      // Check for label-node collisions
      const labelNode = d3.selectAll(".label-node");
      const circleNode = d3.selectAll(".node circle");

  // Update invisible label node positions based on the main nodes
  labelNode.attr("cx", (d) => {
  const mainNode = this.data.nodes.find((node) => node.id === d.id);
  return mainNode.x + 60; // Add the desired x offset here
}).attr("cy", (d) => {
  const mainNode = this.data.nodes.find((node) => node.id === d.id);
  return mainNode.y - 0; // Add the desired y offset here
});

    },

    createPopup(event, d) {
      const popupContainer = this.$refs.popupContainer;
      const title = d.title || "";
      const body = d.body || "";
      const icon = d.icon || "";
      let popupContent = "";

      if (title) {
        popupContent += `<h5>${title}</h5>`;
      }

      if (icon) {
        popupContent += `<img src="${icon}" alt="${title}" />`;
      }

      if (body) {
        popupContent += `<p class="mb-0">${body}</p>`;
      }

      popupContainer.innerHTML = popupContent;
      popupContainer.classList.remove("d-none");

      if (this.popperInstance) {
        this.popperInstance.destroy();
      }

      this.popperInstance = createPopper(event.target, popupContainer, {
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
          },
        ],
      });

      const currentNode = d3.select(`#node-${d.id}`);
      this.popperInstance.update();

      d3.timer(() => {
        const nodePosition = currentNode.node().getBoundingClientRect();
        this.$refs.popupContainer.style.left =
          nodePosition.x + window.scrollX + "px";
        this.$refs.popupContainer.style.top =
          nodePosition.y + window.scrollY + "px";
        this.popperInstance.update();
      });
    },

    drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.subject.x = event.x;
        d.fy = event.subject.y = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    },
  },
};
</script>

<style scoped>
.graph-container {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.link {
  stroke: #999;
  stroke-opacity: 0.6;
}

.node {
  stroke: #fff;
  stroke-width: 1.5px;
}

.d-none {
  display: none;
}

.popup-container {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.reset-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 3;
}


</style>

