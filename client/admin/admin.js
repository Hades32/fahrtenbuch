
var VEHICLE_KEY = "sel_veh_id";

Template.admin.vehicleList = function(){
    return Vehicles.find({}, {sort: {plate: 1}});
};

function cancelVehicleSelection() {
    Session.set(VEHICLE_KEY, null);
}
Template.admin.events({
    'click .delete-vehicle': function(e, t) {
        var curPlate = Session.get(VEHICLE_KEY);
        if (curPlate && prompt("Wirklich Fahrzeug löschen? - "+curPlate) ) {
            Meteor.call('removeVehicleByPlate',curPlate);
        }
    },
    'click .vehicle td': function(e, t) {
        Session.set(VEHICLE_KEY, this._id);
        $.fillDataSchemaInputs(t, this);
    },
    'click .new-vehicle': function(e, t) {
        var newVehicleObj = $.createDataSchemaObject(t);
        if (Vehicles.findOne({plate:newVehicleObj.plate})){
            alert("Fahrzeug existiert bereits!");
            return;
        }
        var id = Vehicles.insert(newVehicleObj);
        $.clearDataSchemaInputs(t);
    },
    'click .edit-vehicle.btn': function(e, t) {
        var newVehicleObj = $.createDataSchemaObject(t);
        var id = Vehicles.update(Session.get(VEHICLE_KEY),newVehicleObj);
        $.clearDataSchemaInputs(t);
        cancelVehicleSelection();
    },
    'click .cancel-edit-vehicle.btn': function(e, t) {
        cancelVehicleSelection();
        $.clearDataSchemaInputs(t);
    }
});

Template.admin.selected = function () {
    return Session.equals(VEHICLE_KEY, this._id) ? 'selected' : '';
};

Template.admin.vehicleSelected = function(){
    return Session.get(VEHICLE_KEY) ? 'vehicle-selected' : 'no-vehicle-selected';
};
