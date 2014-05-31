
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

Template.driveListItem.distance = function(){
    return this.endKM - this.startKM;
};

Template.driveListItem.distanceIssue = function(){
    return (this.endKM - this.startKM) > 120 ? "issue" : "";
};
