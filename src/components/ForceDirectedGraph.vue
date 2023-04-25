
<template>
  <div ref="popupContainer" class="d-none popup-container"></div>
    <div ref="graphContainer" class="graph-container"></div>
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
    data() {
      return {
        graph: null,
      };
    },



    mounted() {
      this.createGraph();
      document.addEventListener("click", (event) => {
    if (!event.target.closest(".node")) {
      this.$refs.popupContainer.classList.add("d-none");
      if (this.popperInstance) {
        this.popperInstance.destroy();
      }
    }
  });
    },



    methods: {
      createGraph() {
  const container = this.$refs.graphContainer;
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  this.simulation = d3
    .forceSimulation(this.data.nodes)
    .force(
      "link",
      d3.forceLink(this.data.links).id((d) => d.id).distance(50)
    )
    .force("charge", d3.forceManyBody().strength(20))
    .force("center", d3.forceCenter(width / 2, height / 2).strength(1.9));

  // Add the following lines for the label simulation
  this.labelSimulation = d3
    .forceSimulation(this.data.nodes)
    .force("charge", d3.forceManyBody().strength(20))
    .force("collide", d3.forceCollide(45))
    .on("tick", ticked);

  const link = svg
    .selectAll(".link")
    .data(this.data.links)
    .join("line")
    .attr("class", "link")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", (d) => Math.sqrt(d.value));

  const node = svg
    .selectAll(".node")
    .data(this.data.nodes)
    .join("g")
    .attr("class", "node")
    .attr("id", (d) => `node-${d.id}`) // Add this line to assign a unique ID
    .call(this.drag(this.simulation));

  node
    .append("circle")
    .attr("r", (d) => d.radius)
    .attr("fill", (d) => d.color)
    .on("click", (event, d) => this.createPopup(event, d));

  node
    .append("foreignObject")
    .attr("x", (d) => d.radius + 5)
    .attr("y", "-0.5em")
    .attr("width", 190)
    .attr("height", 50)
    .append("xhtml:div")
    .style("font", "15px sans-serif")
    .style("word-wrap", "break-word")
    .style("pointer-events", "none")
    .html((d) => d.name);

  // Replace the following lines
  // this.simulation.on("tick", () => {
  //   ...
  // });
  // With these lines
  function ticked() {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
  }
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
    popupContent += `<p>${body}</p>`;
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
    this.$refs.popupContainer.style.left = (nodePosition.x + window.scrollX) + 'px';
    this.$refs.popupContainer.style.top = (nodePosition.y + window.scrollY) + 'px';
    this.popperInstance.update();
  });



},




      drag(simulation) {
        function dragstarted(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          this.labelSimulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(event, d) {
          d.fx = event.subject.x = event.x;
          d.fy = event.subject.y = event.y;
}
      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        this.labelSimulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
    .on("start", dragstarted.bind(this))
    .on("drag", dragged.bind(this))
    .on("end", dragended.bind(this));
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
  z-index:2;
}

</style>

  