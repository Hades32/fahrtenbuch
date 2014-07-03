Router.map(function(){
    this.route('fahrtenbuch', { path:'/' });
    this.route('fahrtenbuch', {
        path: '/fahrzeug/:plate',
        data: function() { Session.set('selected_vehicle_plate', this.params.plate); }
    });
    this.route('stats', { path:'/statistik' });
});