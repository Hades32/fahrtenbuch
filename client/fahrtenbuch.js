//TODO describe vehicle list
Vehicles = new Meteor.Collection("vehicles");
//TODO describe drives list
Drives = new Meteor.Collection("drives");

// ID of currently selected list
Session.setDefault('selected_vehicle_plate', null);

////////// Helpers for in-place editing //////////

// Returns an event map that handles the "escape" and "return" keys and
// "blur" events on a text input (given by selector) and interprets them
// as "ok" or "cancel".
var okCancelEvents = function (selector, callbacks) {
    var ok = callbacks.ok || function () {};
    var cancel = callbacks.cancel || function () {};

    var events = {};
    events['keyup '+selector+', keydown '+selector+', focusout '+selector] =
        function (evt) {
            if (evt.type === "keydown" && evt.which === 27) {
                // escape = cancel
                cancel.call(this, evt);

            } else if (evt.type === "keyup" && evt.which === 13 ||
                evt.type === "focusout") {
                // blur/return/enter = ok/submit if non-empty
                var value = String(evt.target.value || "");
                if (value)
                    ok.call(this, value, evt);
                else
                    cancel.call(this, evt);
            }
        };

    return events;
};

var activateInput = function (input) {
    input.focus();
    input.select();
};

// ----------------- Vehicles -------------------

Template.vehicles.vehicleList = function(){
    return Vehicles.find({}, {sort: {plate: 1}});
};

Template.vehicles.events(okCancelEvents(
    '#new-vehicle-plate',
    {
        ok: function (text, evt) {
            var id = Vehicles.insert({plate: text});
            evt.target.value = "";
        }
    }));

Template.vehicles.events({
    'mousedown .vehicle': function (evt) { // select list
        Session.set('selected_vehicle_plate', this.plate);
    }
});

Template.vehicles.selected = function () {
    return Session.equals('selected_vehicle_plate', this.plate) ? 'selected' : '';
};

// ----------------- Drives ----------------------


Template.drives.any_vehicle_selected = function () {
    return ! Session.equals('selected_vehicle_plate', null);
};

Template.drives.driveList = function(){
    var curVehicle = Session.get('selected_vehicle_plate');
    return Drives.find({vehicle: curVehicle}, {sort: {description: 1}});
};

Template.drives.events(okCancelEvents(
    '#new-drive-description',
    {
        ok: function (text, evt) {
            var curVehicle = Session.get('selected_vehicle_plate');
            var newDrive = {description: text, vehicle: curVehicle};
            var id = Drives.insert(newDrive);
            evt.target.value = "";
        }
    }));


