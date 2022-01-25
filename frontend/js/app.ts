interface LatLng {
    lat : number;
    lng : number;
}

interface Entry {
    latlng : LatLng;
    consumption : number;
    production : number;
    total_capacity : number;
    avail_capacity : number;
}

/*
let test : Entry = {
    latlng : {
        lat: 39.480186,
        lng: -0.392100
    },
    consumption : 1230,
    production : 250,
    total_capacity : 4000,
    avail_capacity : 500,
};

let test2 : Entry = {
    latlng : {
        lat: 39.420186,
        lng: -0.372100
    },
    consumption : 600,
    production : 50,
    total_capacity : 0,
    avail_capacity : 0,
};

let test3 : Entry = {
    latlng : {
        lat: 42.420186,
        lng: -0.372100
    },
    consumption : 600,
    production : 50,
    total_capacity : 0,
    avail_capacity : 0,
};


let entries : Entry[] = [
    test, test2, test3
];
*/

var app = (function () {
    /*
    *  attributes
    * */
    let map;
    let scope;

    /*
    *  local functions
    * */
    function calcBounds(entries : Entry[]){
        let minLat = 90;
        let minLng = 180;
        let maxLat = -90;
        let maxLng = -180;

        for (const e of entries) {
            if (e.latlng.lat < minLat) {
                minLat = e.latlng.lat;
            }

            if (e.latlng.lat > maxLat) {
                maxLat = e.latlng.lat;
            }

            if (e.latlng.lng < minLng) {
                minLng = e.latlng.lng;
            }

            if (e.latlng.lng > maxLng) {
                maxLng = e.latlng.lng;
            }
        }

        return [[minLat,minLng],[maxLat,maxLng]];
    }

    function addMarker(obj : Entry) {
        //@ts-ignore
        L.marker(obj.latlng).addTo(map)
            .bindTooltip(`Consumption : ${obj.consumption}<br>
                              Production  : ${obj.production}<br>
                              Total Cap   : ${obj.total_capacity}<br>
                              Avail Cap   : ${obj.avail_capacity}`);
    }

    /*
    *   methods
    * */
    return {
        run : function (entries : Entry[]) {
            console.log(entries);

            // setup map
            //@ts-ignore
            map = L.map('map').fitBounds(calcBounds(entries));
            //@ts-ignore
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // add markers
            for (const e of entries) {
                addMarker(e);
            }
        }
    }
}());

// @ts-ignore
getEntries().then(entries => app.run(entries));