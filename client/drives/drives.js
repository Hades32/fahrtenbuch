
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

Template.driveListItem.helpers({
    localTime: function(date){
        return date.toLocaleString();
    }
});

Template.driveListItem.tester = function(){
    if (this.testerId) {
        var curTester = Testers.findOne({_id: this.testerId}, {sort: {name: 1}});
        if (curTester) {
            return curTester;
        }
    }
    return "???";
};

Template.driveListItem.distance = function(){
    return this.endKM - this.startKM;
};

Template.driveListItem.distanceIssue = function(){
    return (this.endKM - this.startKM) > 120 ? "issue" : "";
};

Template.driveListItem.duration = function(){
    var duration = (this.end.getTime() - this.start.getTime());
    var oneHour = 60 * 60 * 1000;
    var oneDay = 24 * oneHour;
    return duration >= oneDay ? ~~(duration/oneDay)+" Tage" : ~~(duration/oneHour)+" Stunden";
};

Template.driveListItem.events({
    'click .delete':
        function (event, template) {
            if (prompt("Delete this drive?\n"+JSON.stringify(this, undefined, 2))){
                Drives.remove(this._id);
            }
        }
});
