const API_DOMAIN = "https://backend.skimo.cat/api/"

var CURR_CIM_SELECTED = null;

function editCim(id, key, value) {
    let newValue = prompt("Nou valor per a " + key + ":", value);
    if (newValue == null) {
        return;
    }

    fetch(API_DOMAIN + "/admin/cims/" + id + "/edit",
        {
        method: 'POST',
        body: key + "=" + newValue,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: 'include'
        })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.status != "ok") {
                    alert(data.message);
                    return;
                }
                getCims();
            });
        } else {
            alert("Error del servidor");
        }
    })
    .catch(err => {
        alert("Error del servidor");
    });
}

function getCims(callback = null) {
    let cimsTable = document.getElementById("cims-table-tbody");
    cimsTable.innerHTML = "";
    fetch(API_DOMAIN + "/cims/all")
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.status != "ok") {
                    alert(data.message);
                    return;
                }
                let cims = data.cims;
                for (let i = 0; i < cims.length; i++) {
                    let tr = document.createElement("tr");

                    let tdId = document.createElement("td");
                    tdId.innerText = cims[i].id;
                    tr.appendChild(tdId);

                    let tdName = document.createElement("td");
                    tdName.innerText = cims[i].name;
                    tdName.setAttribute('onclick', 'editCim(' + cims[i].id + ', "name", "' + cims[i].name + '")');
                    tr.appendChild(tdName);

                    let tdHeight = document.createElement("td");
                    tdHeight.innerText = cims[i].height;
                    tdHeight.setAttribute("onclick", "editCim(" + cims[i].id + ", 'height', '" + cims[i].height + "')");
                    tr.appendChild(tdHeight);

                    let tdLat = document.createElement("td");
                    tdLat.innerText = Math.round(cims[i].lat * 1000) / 1000;
                    tdLat.setAttribute("onclick", "editCim(" + cims[i].id + ", 'lat', '" + cims[i].lat + "')");
                    tr.appendChild(tdLat);
                    let tdLon  = document.createElement("td");
                    tdLon.setAttribute("onclick", "editCim(" + cims[i].id + ", 'lon', '" + cims[i].lon + "')");
                    tdLon.innerText = Math.floor(cims[i].lon * 1000) / 1000;
                    tr.appendChild(tdLon);

                    let tdActions = document.createElement("td");
                    let viewRoutesButton = document.createElement("button");
                    viewRoutesButton.innerText = "Veure rutes";
                    viewRoutesButton.setAttribute("onclick", "openRutesOverlay(" + JSON.stringify(cims[i].routes) + ", " + cims[i].id + ")");
                    tdActions.appendChild(viewRoutesButton);
                    tr.appendChild(tdActions);

                    cimsTable.appendChild(tr);
                }
                if (callback != null) {
                    callback(cims);
                }
            });
        } else {
            alert("Error del servidor");
        }
    })
    .catch(err => {
        alert("Error del servidor");
    });
}

function addCim(name, height, lat, lon) {
    fetch(API_DOMAIN + "/admin/cims/add",
        {
        method: 'POST',
        body: "name=" + name + "&height=" + height + "&lat=" + lat + "&lon=" + lon,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: 'include'
        })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.status != "ok") {
                    alert(data.message);
                    return;
                }
                getCims();
            });
        } else {
            alert("Error del servidor");
        }
    })
    .catch(err => {
        alert("Error del servidor");
    });
}

function deleteRoute(id) {
    if (!confirm("Segur que vols eliminar la ruta " + id + "?")) {
        return;
    }
    fetch(API_DOMAIN + "/admin/" + "/rutes/" + id + "/delete",
        {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: 'include'
        })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.status != "ok") {
                    alert(data.message);
                    return;
                }
                getCims(function(cims) {
                    for (let i = 0; i < cims.length; i++) {
                        if (cims[i].id == CURR_CIM_SELECTED) {
                            openRutesOverlay(cims[i].routes, CURR_CIM_SELECTED);
                            return;
                        }
                    }
                });
            });
        } else {
            alert("Error del servidor");
        }
    })
    .catch(err => {
        alert("Error del servidor");
    });
}

function updateRoute(id) {

    let description = document.getElementById("route-description-" + id).value;
    let gpx = document.getElementById("route-gpx-" + id).value;
    let links = document.getElementById("route-links-" + id).value;
    let origin = document.getElementById("route-origin-" + id).value;
    let distance = document.getElementById("route-distance-" + id).value;
    let elevation = document.getElementById("route-elevation-" + id).value;
    let name = document.getElementById("route-name-" + id).value;
    let foto_url = document.getElementById("route-foto_url-" + id).value;

    fetch(API_DOMAIN + "/admin/rutes/" + id + "/edit",
        {
        method: 'POST',
        body: "description=" + description + "&gpx=" + gpx + "&links=" + links + "&origin=" + origin + "&distance=" + distance + "&elevation=" + elevation + "&name=" + name + "&foto_url=" + foto_url,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: 'include'
        })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.status != "ok") {
                    alert(data.message);
                    return;

                }
                getCims(function(cims) {
                    for (let i = 0; i < cims.length; i++) {
                        if (cims[i].id == CURR_CIM_SELECTED) {
                            openRutesOverlay(cims[i].routes, CURR_CIM_SELECTED);
                            return;
                        }
                    }
                });
            });
        } else {
            alert("Error del servidor");
        }
    })
    .catch(err => {
        alert("Error del servidor");
    });
}   

function openRutesOverlay(routes, cim_id) {
    CURR_CIM_SELECTED = cim_id;
    let overlayDiv = document.getElementById("cim-routes");
    overlayDiv.style.display = "block";
    let tbody = document.getElementById("cim-routes-tbody");
    tbody.innerHTML = "";
    for (let i = 0; i < routes.length; i++) {
        let tr = document.createElement("tr");
        let tdId = document.createElement("td");
        tdId.innerText = routes[i].id;
        tr.appendChild(tdId);

        let tdName = document.createElement("td");
        let tdNameInput = document.createElement("input");
        tdNameInput.setAttribute("type", "text");
        tdNameInput.setAttribute("value", routes[i].name ? routes[i].name : "");
        tdNameInput.setAttribute("id", "route-name-" + routes[i].id);
        tdName.appendChild(tdNameInput);
        tr.appendChild(tdName);

        let tdFotoUrl = document.createElement("td");
        let tdFotoUrlInput = document.createElement("input");
        tdFotoUrlInput.setAttribute("type", "text");
        tdFotoUrlInput.setAttribute("value", routes[i].foto_url ? routes[i].foto_url : "");
        tdFotoUrlInput.setAttribute("id", "route-foto_url-" + routes[i].id);
        tdFotoUrl.appendChild(tdFotoUrlInput);
        tr.appendChild(tdFotoUrl);

        let tdDescription = document.createElement("td");
        let textAreaDescription = document.createElement("textarea");
        textAreaDescription.innerText = routes[i].description;
        textAreaDescription.setAttribute("id", "route-description-" + routes[i].id);
        tdDescription.appendChild(textAreaDescription);
        tr.appendChild(tdDescription);

        let tdGPX = document.createElement("td");
        let textAreaGPX = document.createElement("textarea");
        textAreaGPX.innerText = routes[i].gpx;
        textAreaGPX.setAttribute("id", "route-gpx-" + routes[i].id);
        tdGPX.appendChild(textAreaGPX);
        tr.appendChild(tdGPX);

        let tdLinks = document.createElement("td");
        let textAreaLink = document.createElement("textarea");
        textAreaLink.innerText = JSON.stringify(routes[i].links);
        textAreaLink.setAttribute("id", "route-links-" + routes[i].id);
        tdLinks.appendChild(textAreaLink);
        tr.appendChild(tdLinks);

        let tdOrigin = document.createElement("td");
        let textAreaOrigin = document.createElement("textarea");
        textAreaOrigin.innerText = routes[i].origin;
        textAreaOrigin.setAttribute("id", "route-origin-" + routes[i].id);
        tdOrigin.appendChild(textAreaOrigin);
        tr.appendChild(tdOrigin);

        let tdDistance = document.createElement("td");
        let tdDistanceInput = document.createElement("input");
        tdDistanceInput.setAttribute("type", "number");
        tdDistanceInput.setAttribute("value", routes[i].distance);
        tdDistanceInput.setAttribute("id", "route-distance-" + routes[i].id);
        tdDistance.appendChild(tdDistanceInput);
        tr.appendChild(tdDistance);

        let tdElevation = document.createElement("td");
        let tdElevationInput = document.createElement("input");
        tdElevationInput.setAttribute("type", "number");
        tdElevationInput.setAttribute("value", routes[i].elevation);
        tdElevationInput.setAttribute("id", "route-elevation-" + routes[i].id);
        tdElevation.appendChild(tdElevationInput);
        tr.appendChild(tdElevation);

        let tdActions = document.createElement("td");

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Eliminar";
        deleteButton.setAttribute("onclick", "deleteRoute(" + routes[i].id + ")");
        tdActions.appendChild(deleteButton);

        let updateButton = document.createElement("button");
        updateButton.innerText = "Actualitzar";
        updateButton.setAttribute("onclick", "updateRoute(" + routes[i].id + ")");
        tdActions.appendChild(updateButton);

        tr.appendChild(tdActions);

        tbody.appendChild(tr);
    }
}

document.getElementById("add-cim-button").onclick = function() {
    document.getElementById("overlay-div").style.display = "block";
}

document.getElementById("add-cim-form").addEventListener("submit", function(e) {
    e.preventDefault();
    if (e.submitter.value !== "Afegir") {
        document.getElementById("overlay-div").style.display = "none";
        return;
    }
    let name = document.getElementById("add-cim-name").value;
    let height = document.getElementById("add-cim-height").value;
    let lat = document.getElementById("add-cim-lat").value;
    let lon = document.getElementById("add-cim-lon").value;
    addCim(name, height, lat, lon);
    document.getElementById("overlay-div").style.display = "none";
});

document.getElementById("cim-routes-close").addEventListener("click", function(e) {
    let overlayDiv = document.getElementById("cim-routes");
    overlayDiv.style.display = "none";
    let tbody = document.getElementById("cim-routes-tbody");
    tbody.innerHTML = "";
    CURR_CIM_SELECTED = null;

    document.getElementById("add-route-container").style.display = "none";
});

document.getElementById("cim-routes-add").addEventListener("click", function(e) {
    let routes_form = document.getElementById("add-route-container");
    routes_form.style.display = "block";
});

document.getElementById("add-route-form").addEventListener("submit", function(e) {
    e.preventDefault();

    let description = document.getElementById("add-route-descripcio").value;
    let gpx = document.getElementById("add-route-gpx").value;
    let links = document.getElementById("add-route-links").value;
    let origin = document.getElementById("add-route-inici").value;
    let cim_id = CURR_CIM_SELECTED;

    fetch(API_DOMAIN + "/admin/cims/" + cim_id + "/rutes/add",
        {
        method: 'POST',
        body: "description=" + description + "&gpx=" + gpx + "&links=" + links + "&origin=" + origin,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: 'include'
        })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.status != "ok") {
                    alert(data.message);
                    return;
                }
                getCims(function(cims) {
                    for (let i = 0; i < cims.length; i++) {
                        if (cims[i].id == cim_id) {
                            openRutesOverlay(cims[i].routes, cim_id);
                            document.getElementById("add-route-descripcio").value = "";
                            document.getElementById("add-route-gpx").value = "";
                            document.getElementById("add-route-links").value = "";
                            document.getElementById("add-route-inici").value = "";

                            document.getElementById("add-route-container").style.display = "none";

                            return;
                        }
                    }
                });
            });
        } else {
            alert("Error del servidor");
        }
    })
    .catch(err => {
        alert("Error del servidor");
    });
});

document.getElementById("acces-denied").innerHTML = "";
getCims();