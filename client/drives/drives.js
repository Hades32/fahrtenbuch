
// ----------------- Drives ----------------------


Template.drives.any_vehicle_selected = function () {
    return ! Session.equals('selected_vehicle_plate', null);
};

Template.drives.new_tester_open = function () {
    return Session.equals('new_tester_open', true);
};

Template.drives.driveList = function(){
    var curVehicle = Session.get('selected_vehicle_plate');
    return Drives.find({vehicle: curVehicle}, {sort: {end: 1}});
};

Template.driveListItem.tester = function(){
    if (this.testerId) {
        var curTester = Testers.findOne({_id: this.testerId}, {sort: {name: 1}});
        if (curTester) {
            return curTester;
        }
    }
    return "???";
};

Template.driveListItem.startTime = function(){
    return new Date(this.start).toLocaleString();
};

Template.driveListItem.endTime = function(){
    return new Date(this.end).toLocaleString();
};

Template.newDrive.events({
    'click .save':
        function (event, template) {
            var curVehicle = Session.get('selected_vehicle_plate');
            var description = template.find(".description").value;
            var privateDrive = template.find(".private").checked;
            var start = template.find(".start").value;
            var end = template.find(".end").value;
            var successfulRentals = template.find(".successfulRentals").value || 0;
            var failedRentals = template.find(".failedRentals").value || 0;
            var startKM = template.find(".startKM").value;
            var endKM = template.find(".endKM").value;
            var selectedTester = template.find(".selectedTester").value;

            if (end < start){
                alert("Ende liegt vor Start!");
                return;
            }

            var newDrive =
            {
                description: description,
                vehicle: curVehicle,
                privateDrive: privateDrive,
                start : start,
                end : end,
                successfulRentals : successfulRentals,
                failedRentals : failedRentals,
                testerId : selectedTester,
                startKM : startKM,
                endKM : endKM
            };
            var id = Drives.insert(newDrive);

            if (id){
                template.find(".description").value = "";
                template.find(".start").value = "";
                template.find(".end").value = "";
                template.find(".successfulRentals").value  = "";
                template.find(".failedRentals").value  = "";
                template.find(".startKM").value = "";
                template.find(".endKM").value = "";
            }
        },

    'click .cancel':
        function () {
            //mode clean somethings
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