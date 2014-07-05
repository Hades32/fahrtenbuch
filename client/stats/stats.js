
Template.stats.lastMonthUsageDays = function(){

    var now = new Date();
    var lastMonth = new Date(now.getFullYear(), now.getMonth()-1, 1, 0, 0, 0);
    return calculateUsageDays(lastMonth);
};
Template.stats.lastMonthDrives = function(){

    var now = new Date();
    var lastMonth = new Date(now.getFullYear(), now.getMonth()-1, 1, 0, 0, 0);
    return Drives.findInMonthOfDay(lastMonth).count();
};

Template.stats.currentMonthUsageDays = function() {

    var now = new Date();
    return calculateUsageDays(now);
};
Template.stats.currentMonthDrives = function() {

    var now = new Date();
    return Drives.findInMonthOfDay(now).count();
};

function calculateUsageDays(dayInMonth) {
    var drivesThisMonth = Drives.findInMonthOfDay(dayInMonth);

    var thisYear = dayInMonth.getFullYear();
    var thisMonth = dayInMonth.getMonth();
    var startOfCurrentMonth = new Date(thisYear, thisMonth, 1, 0, 0, 0);
    var startOfNextMonth = new Date(thisYear, thisMonth + 1, 1, 0, 0, 0);
    var endOfCurrentMonth = new Date(startOfNextMonth.getTime() - 1);

    // this list hold for each day of the month if a specific vehicle was driven on that day
    var usedDays = [];

    var usageDays = 0;

    drivesThisMonth.forEach(function (drive) {
        //each day of this drive is handled
        var startDayOfDrive = drive.start.getMonth() === thisMonth ? drive.start.getDate() : 1;
        var endDayOfDrive = drive.end.getMonth() === thisMonth ? drive.end.getDate() : endOfCurrentMonth.getDate();
        Lazy.range(startDayOfDrive, endDayOfDrive + 1).each(function (day) {
            if (!usedDays[day]) {
                usedDays[day] = { vehicles: [] };
            }
            if (usedDays[day].vehicles.indexOf(drive.vehicle) === -1) {
                usedDays[day].vehicles.push(drive.vehicle);
                usageDays++;
            }
        });
    });
    return usageDays;
}

