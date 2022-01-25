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
    var map;
    var scope;
    /*
    *  local functions
    * */
    function calcBounds(entries) {
        var minLat = 90;
        var minLng = 180;
        var maxLat = -90;
        var maxLng = -180;
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var e = entries_1[_i];
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
        return [[minLat, minLng], [maxLat, maxLng]];
    }
    function addMarker(obj) {
        //@ts-ignore
        L.marker(obj.latlng).addTo(map)
            .bindTooltip("Consumption : " + obj.consumption + "<br>\n                              Production  : " + obj.production + "<br>\n                              Total Cap   : " + obj.total_capacity + "<br>\n                              Avail Cap   : " + obj.avail_capacity);
    }
    /*
    *   methods
    * */
    return {
        run: function (entries) {
            console.log(entries);
            // setup map
            //@ts-ignore
            map = L.map('map').fitBounds(calcBounds(entries));
            //@ts-ignore
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            // add markers
            for (var _i = 0, entries_2 = entries; _i < entries_2.length; _i++) {
                var e = entries_2[_i];
                addMarker(e);
            }
        }
    };
}());
// @ts-ignore
getEntries().then(function (entries) { return app.run(entries); });
