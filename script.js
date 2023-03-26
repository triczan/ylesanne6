(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        setInterval(updateClock, 1000);

        function updateClock() {

            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let period = "AM";

            if (h === 0) {
                h = 12;
            } else if (h >= 12) {
                h = h % 12;
                period = "PM";
            }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + period;
        }

    });

    // forms

    let e = document.getElementById("delivery");

    e.innerHTML = "0,00 &euro;";
    let deliveryPrices = {
        tln: 0,
        trt: 2.5,
        nrv: 2.5,
        prn: 3
    };

    function estimateDelivery(event) {

        event.preventDefault();
        let fname = document.getElementById("fname").value;

        let lname = document.getElementById("lname").value;
        let letters = /^[A-Za-z]+$/;

        if (fname === "" || !fname.match(letters)) {
            alert("Sisesta eesnimi");
            return false;
        }
        if (lname === "" || !lname.match(letters)) {
            alert("Sisesta perekonnanimi");
            return false;
        }
        let linn = document.getElementById("linn");

        let selectedOption = linn.options[linn.selectedIndex];
        if (linn.value === "") {

            alert("Palun valige linn nimekirjast");
            linn.focus();
            return false;
        }

        let radios = document.getElementsByName("tarne");
        let checked = false;
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                checked = true;
                break;
            }
        }
        if (!checked) {
            alert("Vali tarneviis");
            return false;
        }
        let e = document.getElementById("delivery");

        let deliveryPrice = deliveryPrices[selectedOption.value];
        e.innerHTML = deliveryPrice.toFixed(2) + " &euro;";
        console.log("Tarne hind on arvutatud");

    }
    let form = document.getElementById("form");
    console.log(form)
    form.addEventListener("submit", estimateDelivery);
})();

// map

let mapAPIKey = "Aj2rsxEr2MEAH4i1rq41hWCnRE_CHCASWpw3xnCS6_S8UP4pOyA3jQp2yL-0EJfA";

let map;

function GetMap() {

    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );

    let newLocation = new Microsoft.Maps.Location(
        59.438857533604306,
        24.771319234361766
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 14,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
        title: 'Tartu Ülikool',
    });
    let newLocationPushpin = new Microsoft.Maps.Pushpin(newLocation, {
        title: 'Tallinna Ülikool',
    });
    let infoTartu = new Microsoft.Maps.Infobox(centerPoint, {
        title: 'Tartu Ülikool',
        description: 'See on Tartu Ülikool, mis asub Tartus.',
        visible: false
    });
    let infoTallinn = new Microsoft.Maps.Infobox(newLocation, {
        title: 'Tallinna Ülikool',
        description: 'See on Tallinna Ülikool, mis asub Tallinnas.',
        visible: false
    });

    Microsoft.Maps.Events.addHandler(pushpin, 'click', function() {
        infoTartu.setOptions({ visible: true });
    });
    Microsoft.Maps.Events.addHandler(newLocationPushpin, 'click', function() {
        infoTallinn.setOptions({ visible: true });
    });

    map.entities.push(pushpin);
    map.entities.push(newLocationPushpin);
    map.entities.push(infoTartu);
    map.entities.push(infoTallinn);

}

//https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=Aj2rsxEr2MEAH4i1rq41hWCnRE_CHCASWpw3xnCS6_S8UP4pOyA3jQp2yL-0EJfA

