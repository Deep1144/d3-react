import React, { useEffect } from "react";
import * as d3 from "d3";

function Updatejoins() {
  const width = 1200;

  function randomLetters() {
    return d3
      .shuffle("abcdefghijklmnopqrstuvwxyz".split(""))
      .slice(0, Math.floor(6 + Math.random() * 20))
      .sort();
  }

  useEffect(() => {
    const svg: any = d3
      .select(".update-join")
      .attr("width", width)
      .attr("height", 80)
      .attr("viewBox", `0 -40 ${width} 80`);

    const t = () => d3.transition().duration(2000);

    setInterval(() => {
      svg
        .selectAll("text")
        .data(randomLetters(), (d) => d)
        .join(
          (enter) => {
            return enter
              .append("text")
              .attr("font-size", "2rem")
              .attr("fill", "green")
              .attr("x", (d, i) => i * 40)
              .attr("y", -30)
              .text((d) => {
                return d;
              })
              .call((enter) => enter.transition(t).attr("y", 0));
          },
          (update) =>
            update
              .attr("fill", "black")
              .attr("y", 0)
              .call((update) =>
                update.transition(t).attr("x", (d, i) => i * 40)
              ),
          (exit) =>
            exit
              .attr("fill", "red")
              .call((exit) => exit.transition(t).attr("y", 30).remove())
        );
    }, 4000);
  }, []);

  return <svg className="update-join"></svg>;
}

export default Updatejoins;
