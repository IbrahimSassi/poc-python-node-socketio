<template>
    <div id="app">

    </div>
</template>

<script>
  import * as d3 from 'd3/d3'
  const io = require('socket.io-client').connect('http://localhost:3001');
  var svg, pie, color, arc, outerArc, radius;
  export default {
    name: 'app',
    data () {
      return {
//        svg: false,
        tab: [
          {label: 'Lorem ipsum', value: 5},
          {label: 'dolor sit', value: 15},
          {label: 'amet', value: 20},
          {label: 'elit', value: 33}
        ]
      }
    },
    methods: {
      d3Initialization(){
        svg = d3.select("#app")
          .append("svg")
          .append("g")

        svg.append("g")
          .attr("class", "slices");
        svg.append("g")
          .attr("class", "labels");
        svg.append("g")
          .attr("class", "lines");

        var width = 960,
          height = 450
        radius = Math.min(width, height) / 2;

        pie = d3.layout.pie()
          .sort(null)
          .value(function (d) {
            return d.value;
          });

        arc = d3.svg.arc()
          .outerRadius(radius * 0.8)
          .innerRadius(radius * 0.4);

        outerArc = d3.svg.arc()
          .innerRadius(radius * 0.9)
          .outerRadius(radius * 0.9);

        svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


        color = d3.scale.ordinal()
          .domain(this.tab.keys())
          .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var randomData = () => {
//        var labels = color.domain();
//        return labels.map(function(label){
//          return { label: label, value: Math.random() }
//        });
          return this.tab;
        }

        this.change(randomData());


      },
      connectSocket(){
        io.on('messageToVue', (newEntry) => {
          console.log("Message", newEntry);
          this.tab.push(newEntry)
          this.change(this.tab);
        })
      },
      change(data) {

          /* ------- PIE SLICES -------*/
        var slice = svg.select(".slices").selectAll("path.slice")
          .data(pie(data), this.key);

        slice.enter()
          .insert("path")
          .style("fill", function (d) {
            return color(d.data.label);
          })
          .attr("class", "slice");

        slice
          .transition().duration(1000)
          .attrTween("d", function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
              return arc(interpolate(t));
            };
          })

        slice.exit()
          .remove();

          /* ------- TEXT LABELS -------*/

        var text = svg.select(".labels").selectAll("text")
          .data(pie(data), this.key);

        text.enter()
          .append("text")
          .attr("dy", ".35em")
          .text(function (d) {
            return d.data.label;
          });

        function midAngle(d) {
          return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }

        text.transition().duration(1000)
          .attrTween("transform", function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
              var d2 = interpolate(t);
              var pos = outerArc.centroid(d2);
              pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
              return "translate(" + pos + ")";
            };
          })
          .styleTween("text-anchor", function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
              var d2 = interpolate(t);
              return midAngle(d2) < Math.PI ? "start" : "end";
            };
          });

        text.exit()
          .remove();

          /* ------- SLICE TO TEXT POLYLINES -------*/

        var polyline = svg.select(".lines").selectAll("polyline")
          .data(pie(data), this.key);

        polyline.enter()
          .append("polyline");

        polyline.transition().duration(1000)
          .attrTween("points", function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
              var d2 = interpolate(t);
              var pos = outerArc.centroid(d2);
              pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
              return [arc.centroid(d2), outerArc.centroid(d2), pos];
            };
          });

        polyline.exit()
          .remove();
      },
      key(d){
        return d.data.label;
      }
    },
    mounted(){
      this.d3Initialization()
      this.connectSocket()
    }
  }
</script>

<style>
    #app {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        width: 1000px;
        height: 1000px;
        position: relative;
    }

    svg {
        width: 100%;
        height: 100%;
    }

    path.slice {
        stroke-width: 2px;
    }

    polyline {
        opacity: .3;
        stroke: black;
        stroke-width: 2px;
        fill: none;
    }
</style>
