Meteor.methods({
    removeVehicleByPlate: function(plate){
        Vehicles.remove({plate: plate});
    }
});