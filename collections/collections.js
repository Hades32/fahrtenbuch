
//TODO describe vehicle list
Vehicles = new Meteor.Collection("vehicles");
//TODO describe drives list
Drives = new Meteor.Collection("drives");
//TODO describe
Testers = new Meteor.Collection("testers");



Drives.findInMonthOfDay = function (dayInMonth) {
    var thisYear = dayInMonth.getFullYear();
    var thisMonth = dayInMonth.getMonth();
    var startOfCurrentMonth = new Date(thisYear, thisMonth, 1, 0, 0, 0);
    var startOfNextMonth = new Date(thisYear, thisMonth + 1, 1, 0, 0, 0);
    var endOfCurrentMonth = new Date(startOfNextMonth.getTime() - 1);

    return Drives.find(
        {
            privateDrive: true,
            $or: [
                { $and: [
                    {start: { $gt: startOfCurrentMonth } },
                    { end: { $lt: endOfCurrentMonth } }
                ] },
                { $and: [
                    {start: { $lt: startOfCurrentMonth } },
                    { end: { $gt: startOfCurrentMonth } }
                ] },
                { $and: [
                    {start: { $lt: endOfCurrentMonth } },
                    { end: { $gt: endOfCurrentMonth } }
                ] }
            ]});
};