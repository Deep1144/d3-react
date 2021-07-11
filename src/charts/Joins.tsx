import React, { useEffect } from "react";
import * as d3 from "d3";

function Joins() {
  useEffect(() => {
    function getData() {
      let data = [];
      let numItems = Math.ceil(Math.random() * 5) * 2;

      for (let i = 0; i < numItems; i++) {
        data.push(Math.random() * 60);
      }
      console.log(data);
      return data;
    }

    function update(data) {
      d3.select(".joins")
        .selectAll("circle")
        .data(data)
        .join("circle")
        // .join(
        //   (enter) => {
        //     console.log(enter);
        //     return enter.append("circle");
        //     // return enter;
        //   },
        //   (update) => {
        //     console.log(update);
        //     update.append("text").text("some")
        //     return update.attr("fill", "red");
        //   }
        // )
        .attr("cx", function (d, i) {
          return (i + 1) * 100;
        })
        .attr("cy", 50)
        .attr("r", function (d: any) {
          return 0.5 * d;
        })
        .style("fill", function (d) {
          return d > 30 ? "orange" : "grey";
        });
    }

    function updateAll() {
      let myData = getData();
      update(myData);
    }
    updateAll();
    d3.select("button").on("click", updateAll);
  }, []);

  return (
    <div className="d-flex justify-content-center flex-column">
      <svg height="300" width="800">
        <g className="joins"></g>
      </svg>
      <button>Update</button>
    </div>
  );
}

export default Joins;
