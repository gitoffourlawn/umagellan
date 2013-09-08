window.M = {};

M.map = {};

$(function() {
  M.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: getCoordsBy('name_short', 'MKM'),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  $('#map').height($(window).height() - 85);

  var directionsService = new google.maps.DirectionsService(),
      directionsDisplay = new google.maps.DirectionsRenderer({ map: M.map });

  function displayRoute(courses) {
    var request = {
      origin: courses[0],
      destination: courses[courses.length-1],
      waypoints: courses.slice(1, -1).map(function(c) {
        return { location: c }
      }),
      travelMode: google.maps.DirectionsTravelMode.WALKING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else { alert ('Failed to route!'); }
    });
  }

  function getCoordsBy(attrName, attrValue) {
    for (var i=0; i < BUILDINGS.length; i++) {
      if (attrValue === BUILDINGS[i][attrName])
        return new google.maps.LatLng(BUILDINGS[i].y, BUILDINGS[i].x);
    }
    return null;
  }

  M.initRoutes = function(paneID) {
      var courses = [];
      $("#"+paneID+".tab-pane .course-row").each(function(i, course) {
          courses.push(
              getCoordsBy("name_short", $(course).attr("data-build_code"))
          );
      });
      displayRoute(courses);
  }

  $(".nav-tabs a").mouseup(function() {
      M.initRoutes($(this).attr("href").slice(1));
  });

  $.each(BUILDINGS, function(i, b) {
    $('.homes').append('<option value="' + b.name_short + '">' + b.name_long + '</option>');
  });

});

