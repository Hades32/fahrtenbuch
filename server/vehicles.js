Meteor.methods({
    removeVehicleByPlate: function(plate){
        Vehicles.remove({plate: plate});
        Drives.remove({vehicle: plate});
    }
});