
Template.newTester.events({
    'click .save':
        function (event, template) {
            var name = template.find(".name").value;
            var company = template.find(".company").value;
            var newTester =
            {
                name: name,
                company: company
            };
            var id = Testers.insert(newTester);
            Session.set('new_tester_open', false);
            template.find(".name").value = '';
            template.find(".company").value = '';
        },
    'click .closeBtn':
        function (event, template) {
            Session.set('new_tester_open', false);
        }
});


