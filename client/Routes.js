Router.map(function(){
    this.route('fahrtenbuch', { path:'/' });
    this.route('fahrtenbuch', {
        path: '/fahrzeug/:plate',
        data: function() { return Posts.findOne(this.params.plate); }
    });
});