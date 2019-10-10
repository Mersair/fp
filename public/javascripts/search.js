const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function query() {
  document.getElementById("results").innerHTML = "";
  let str = document.querySelector("#search").value;
  fetch("api/books/getBooks", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then(function(res) {
    res.json().then(function(ret) {
      for (let i = 0; i < ret.length; i++) {
        if (ret[i].name.includes(str) || ret[i].name.includes(capitalize(str))) {
          let tdNode = document.createElement("td");
          let tdNode2 = document.createElement("td");
          let tdNode3 = document.createElement("td");
          let trNode = document.createElement("tr");
          tdNode.appendChild(document.createTextNode(ret[i].name));
          tdNode2.appendChild(document.createTextNode(ret[i].crn));
          tdNode3.innerHTML = (ret[i].location == "" || ret[i].location == "Physical" || ret[i].location == null ? "Physical" : "<a href='" + ret[i].location + "'>Digital</a>");
          trNode.appendChild(tdNode);
          trNode.appendChild(tdNode2);
          trNode.appendChild(tdNode3);
          document.getElementById("results").appendChild(trNode);
        }
      }
      return;
    });
  });
}

window.onload = function() {
  document.getElementById("searchButton").onclick = query;
};
