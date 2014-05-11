//TODO describe vehicle list
Vehicles = new Meteor.Collection("vehicles");
//TODO describe drives list
Drives = new Meteor.Collection("drives");
//TODO describe
Testers = new Meteor.Collection("testers");

// ID of currently selected list
Session.setDefault('selected_vehicle_plate', null);
Session.setDefault('new_tester_open', false);

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

Template.drives.new_tester_open = function () {
    return Session.equals('new_tester_open', true);
};

Template.drives.driveList = function(){
    var curVehicle = Session.get('selected_vehicle_plate');
    return Drives.find({vehicle: curVehicle}, {sort: {description: 1}});
};

Template.newDrive.events({
    'click .save':
        function (event, template) {
            var curVehicle = Session.get('selected_vehicle_plate');
            var description = template.find(".description").value;
            var privateDrive = template.find(".private").checked;
            var start = template.find(".start").value;
            var end = template.find(".end").value;
            var successfulRentals = template.find(".successfulRentals").value;
            var failedRentals = template.find(".failedRentals").value;
            var selectedTester = template.find(".selectedTester").value;
            var newDrive =
                {
                    description: description,
                    vehicle: curVehicle,
                    privateDrive: privateDrive,
                    start : start,
                    end : end,
                    successfulRentals : successfulRentals,
                    failedRentals : failedRentals,
                    testerId : selectedTester
                };
            var id = Drives.insert(newDrive);
        },

    'click .cancel':
        function () {
            //mode clean something
        }
});

Template.newDrive.events({
    'click .newTester':
        function (event, template) {
            Session.set('new_tester_open', true);
        }
});

Template.newDrive.testerList = function(){
    return Testers.find({},{sort:{name:1}});
};

Template.newTester.events({
    'click .save':
        function (event, template) {
            var name = template.find(".name").value;
            var company = template.find(".company").value;
            var newTester =
            {
                name: name,
                company: company
            };
            var id = Testers.insert(newTester);
            Session.set('new_tester_open', false);
            template.find(".name").value = '';
            template.find(".company").value = '';
        },
    'click .closeBtn':
        function (event, template) {
            Session.set('new_tester_open', false);
        }
});


