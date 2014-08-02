
function lastMonth() {
    var now = new Date();
    var lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0);
    return lastMonth;
}

function monthString(monthDate) {
    return (monthDate.getMonth()+1) + " / " + monthDate.getFullYear();
}

Template.stats.lastMonth = function(){

    return monthString(lastMonth());
};

Template.stats.currentMonth = function(){

    return monthString(new Date());
};

Template.stats.lastMonthUsageDays = function(){

    return calculateUsageDays(lastMonth());
};

Template.stats.currentMonthUsageDays = function() {

    var now = new Date();
    return calculateUsageDays(now);
};

Template.stats.helpers({
    currency: function(num){
        const rounded = Math.round(num * 100) / 100;
        return rounded+" €";
    }
});


function calculateUsageDays(dayInMonth) {
    var drivesThisMonth = Drives.findPrivateInMonthOfDay(dayInMonth);

    var thisYear = dayInMonth.getFullYear();
    var thisMonth = dayInMonth.getMonth();
    var startOfCurrentMonth = new Date(thisYear, thisMonth, 1, 0, 0, 0);
    var startOfNextMonth = new Date(thisYear, thisMonth + 1, 1, 0, 0, 0);
    var endOfCurrentMonth = new Date(startOfNextMonth.getTime() - 1);

    // list of vehicles and the days they were driven
    var vehicles = [];
    var usageDaysSum = 0;

    drivesThisMonth.forEach(function (drive) {

        //each day of this drive is handled
        var startDayOfDrive = drive.start.getMonth() === thisMonth ? drive.start.getDate() : 1;
        var endDayOfDrive = drive.end.getMonth() === thisMonth ? drive.end.getDate() : endOfCurrentMonth.getDate();
        Lazy.range(startDayOfDrive, endDayOfDrive + 1).each(function (day) {
            if (!vehicles[drive.vehicle]) {
                vehicles[drive.vehicle] = { days: [], vehicle: drive.vehicle };
            }
            if (vehicles[drive.vehicle].days.indexOf(day) === -1) {
                vehicles[drive.vehicle].days.push(day);
                usageDaysSum++;
            }
        });
    });
    var usageList = [];
    var gwvtSum = 0;
    for(var plate in vehicles){
        var vehicle = vehicles[plate];
        vehicle.usageDays = vehicle.days.length;
        delete vehicle.days;
        vehicle.gwvt = calcGWTV(plate, vehicle.usageDays);
        gwvtSum += vehicle.gwvt;
        usageList.push(vehicle);
    }
    usageList.push({ vehicle: "Summe", usageDays: usageDaysSum, gwvt:gwvtSum });
    return usageList;
}

function calcGWTV(plate, usageDays) {
    var vehicle = Vehicles.findOne({plate:plate});
    return usageDays * (vehicle.blp/100/30);
}

