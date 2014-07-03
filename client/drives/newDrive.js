
Template.newDrive.events({
    'click .save':
        function (event, template) {
            var curVehicle = Session.get('selected_vehicle_plate');
            var description = template.find(".description").value;
            var privateDrive = template.find(".private").checked;
            var start = new Date(template.find(".start").value);
            var end = new Date(template.find(".end").value);
            var successfulRentals = template.find(".successfulRentals").value || 0;
            var failedRentals = template.find(".failedRentals").value || 0;
            var startKM = template.find(".startKM").value;
            var endKM = template.find(".endKM").value;
            var selectedTester = template.find(".selectedTester").value;

            if (end < start){
                alert("Zeit: Ende liegt vor Start!");
                return;
            }

            if (endKM < startKM){
                alert("KM: Ende liegt vor Start!");
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
            Drives.insert(newDrive, function(err,id) {

                if (!err && id) {
                    template.find(".description").value = "";
                    template.find(".start").value = "";
                    template.find(".end").value = "";
                    template.find(".successfulRentals").value = "";
                    template.find(".failedRentals").value = "";
                    template.find(".startKM").value = "";
                    template.find(".endKM").value = "";
                }
            });
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

Template.newDrive.lastEndKm = function(){
    var curVehicle = Session.get('selected_vehicle_plate');
    var lastDrive = Drives.findOne({vehicle: curVehicle}, {sort: {end: -1}});
    if (lastDrive)
        return lastDrive.endKM;
    else
        return 0;
};