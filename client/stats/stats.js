
Template.stats.lastMonthDays = function(){
    return '?';
};

Template.stats.currentMonthDays = function(){

    var now = new Date();
    var startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(),1, 0,0,0);
    var startOfNextMonth = new Date(now.getFullYear(), now.getMonth()+1,1, 0,0,0);
    var endOfCurrentMonth = new Date(startOfNextMonth.getTime()-1);

    console.log('start: '+startOfCurrentMonth);
    console.log('end: '+endOfCurrentMonth);

    var drivesThisMonth = Drives.find(
        { $or:[
            { $and: [ {start: { $gt: startOfCurrentMonth } }, { end: { $lt:endOfCurrentMonth } } ] },
            { $and: [ {start: { $lt: startOfCurrentMonth } }, { end: { $gt:startOfCurrentMonth } } ] },
            { $and: [ {start: { $lt: endOfCurrentMonth } }, { end: { $gt:endOfCurrentMonth } } ] }
        ]});

    //TODO some drives are longer than one day... 31 column solution?

    return drivesThisMonth.count();
};

