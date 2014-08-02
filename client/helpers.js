$.fn.realVal = function(){
    var $obj = $(this);
    var val = $obj.val();
    var type = $obj.attr('type');
    if (type && type==='checkbox') {
        return $obj.prop('checked');
    } else {
        return val;
    }
};

$.createDataSchemaObject = function (template) {
    var newObj = {};
    var dataInputs = template.findAll('[data-schema-key]');
    for (var i = 0; i < dataInputs.length; i++) {
        var jqInput = $(dataInputs[i]);
        newObj[jqInput.data('schema-key')] = jqInput.realVal();
    }
    return newObj;
};

$.fillDataSchemaInputs = function (template, obj) {
    var dataInputs = template.findAll('[data-schema-key]');
    for (var i = 0; i < dataInputs.length; i++) {
        var jqInput = $(dataInputs[i]);
        jqInput.val(obj[jqInput.data('schema-key')]);
    }
};

$.clearDataSchemaInputs = function(template){
    var dataInputs = template.findAll('[data-schema-key]');
    for (var i = 0; i < dataInputs.length; i++) {
        var jqInput = $(dataInputs[i]);
        jqInput.val('');
    }
};