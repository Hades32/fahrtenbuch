Template.statusDisplay.status = function () {
    return Meteor.status();
};

Template.statusDisplay.statusOk = function () {
    if (Meteor.status().connected)
        return "";
    else
        return "not-connected";
};


