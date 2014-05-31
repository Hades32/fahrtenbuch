
// ----------------- Vehicles -------------------

Template.vehicles.vehicleList = function(){
    return Vehicles.find({}, {sort: {plate: 1}});
};

Template.vehicles.selected = function () {
    return Session.equals('selected_vehicle_plate', this.plate) ? 'selected' : '';
};

Template.vehicles.events(okCancelEvents(
    '#new-vehicle-plate',
    {
        ok: function (text, evt) {
            if (Vehicles.findOne({plate:text})){
                alert("Fahrzeug existiert bereits!");
                return;
            }
            var id = Vehicles.insert({plate: text});
            evt.target.value = "";
        }
    }));

Template.vehicles.events({
    'mousedown .vehicle': function (evt) { // select list
        Session.set('selected_vehicle_plate', this.plate);
    }
});

Template.vehicles.events({
    'click .delete-vehicle': function (evt) {
        var curPlate = Session.get('selected_vehicle_plate');
        if (curPlate && prompt("Wirklich Fahrzeug löschen? - "+curPlate) ) {
            Meteor.call('removeVehicleByPlate',curPlate);
        }
    }
});
