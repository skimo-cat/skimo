function setDificultatOnCimCard(alpina, esqui, fisica) {
    if (!alpina || alpina == '?') alpina = 0;
    if (!esqui || esqui == '?') esqui = 0;
    if (!fisica || fisica == '?') fisica = 0;

    document.getElementById('progress-bar-dificultat-alpina').style.width = ((alpina/5) * 100) + "%";
    document.getElementById('progress-bar-dificultat-esqui').style.width = ((esqui/5) * 100) + "%";
    document.getElementById('progress-bar-dificultat-fisica').style.width = ((fisica/5) * 100) + "%";
}


function resetDificultatOnCimCard() {
    document.getElementById('progress-bar-dificultat-alpina').style.width = "0%";
    document.getElementById('progress-bar-dificultat-esqui').style.width = "0%";
    document.getElementById('progress-bar-dificultat-fisica').style.width = "0%";
}

function setRouteOnCimCard(title, description, start, distance, elevation, route_id, links) {
    SELECTED_ROUTE = route_id;
    // Reset all boxes
    let boxes = document.getElementsByClassName("route-select-btn");
    for (let i=0; i<boxes.length; i++) {
        boxes[i].style.fontSize = "xx-large";
    }

    // Reset dificultat bars
    resetDificultatOnCimCard();

    if (!title || title == 'null') {
        title = "";
    }
    if (!description || description == 'null') {
        description = "";
    }
    if (!start || start == 'null') {
        start = "";
    }

    document.getElementsByClassName("card-cim-route-title")[0].innerHTML = title;
    document.getElementById("cim-card-route-description").innerHTML = description;

    document.getElementById("cim-route-start").innerHTML = (start == undefined || start == 'null') ? "N/D" : start;
    document.getElementById("cim-route-distance").innerHTML = distance + ((distance != '?') ? 'km' : '');
    document.getElementById("cim-route-elevation").innerHTML = elevation + ((elevation != '?') ? 'm' : '');


    if (!links) links = [];
    document.getElementById("card-cim-route-links").innerHTML = "";
    for (let i=0; i<links.length; i++) {
        let link = links[i];
        let link_box = document.createElement("li");
        link_box.innerHTML = "<a class='route_link' target=”_blank” href='" + link + "'>" + link + "</a>";

        document.getElementById("card-cim-route-links").appendChild(link_box);

    }


    let selected_box = document.getElementById("card-cim-route-" + route_id);
    if (selected_box) {
        selected_box.style.fontSize = "xxx-large";
        setDificultatFromRoute(route_id);
    }
}

function createCimCard(cim) {
    let id = cim.id;
    let routes = cim.routes;
    let num_routes = routes.length;

    // ----- Header -----
    document.getElementById("card-inner-cim-name").innerHTML = cim.name;
    document.getElementsByClassName("card-cim-height")[0].innerHTML = cim.height;

    document.getElementById("route-selector").innerHTML = "";
    for (let i=0; i<num_routes; i++) {
        let route = routes[i];

        let route_box = document.createElement("div");
        route_box.innerHTML = "&#9632;";
        route_box.style.color = GPX_COLORS[i];
        route_box.setAttribute("class", "box route-select-btn");
        route_box.setAttribute("id", "card-cim-route-" + route.id);
        route_box.addEventListener("click", function() {
            setRouteOnCimCard(route.name, route.description, route.origin, route.distance, route.elevation, route.id, route.links);
        });

        document.getElementById("route-selector").appendChild(route_box);

    }

    setRouteOnCimCard(routes[0].name, routes[0].description, routes[0].origin, routes[0].distance, routes[0].elevation, routes[0].id, routes[0].links);
    setDificultatFromRoute(routes[0].id);

    document.getElementById("cim-info-overlay").style.visibility = 'visible';
}

// Event handlers
document.getElementById("cim-overlay-close").onclick = function() {
    document.getElementById("cim-info-overlay").style.visibility = 'hidden';
}