
// ----------------- Vehicles -------------------

Template.vehicles.vehicleList = function(){
    return Vehicles.find({}, {sort: {plate: 1}});
};

Template.vehicles.selected = function () {
    return Session.equals('selected_vehicle_plate', this.plate) ? 'selected' : '';
};

Template.vehicles.events({
    'mousedown .vehicle': function (evt) { // select list
        Session.set('selected_vehicle_plate', this.plate);
    }
});
