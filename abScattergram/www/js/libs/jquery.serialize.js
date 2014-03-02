// Serialize
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    function _obj(name, obj, value){
        if((i = name.indexOf(".")) > 0){
            var v = name.slice(0,i);
            var vv = name.slice(i+1);
            if (obj.hasOwnProperty(v)){
                return _obj(vv, obj[v], value);
            } else {
                obj[v] = {};
                return _obj(vv, obj[v], value);
            }
        } else {
            if (obj[name] !== undefined){
                if (!obj[name].push) {
                    obj[name] = [obj[name]];
                }
                obj[name].push(value || '');
            } else {
                obj[name] = value || '';
            }
            return obj[name];
        }
    }
	$.each(a, function() {
        _obj(this.name, o, this.value);
    });
    return o;
};

// deserialize
$.fn.deserializeObject = function(obj) {
	var form = this;
	$.each(obj, function(i, el){
		if (_.isObject(el)){
		} else {
			try {
	        	var d = form.find('*[name="'+i+'"]');
	        	var type = "";
	        	if (d.length > 1){
	        		type = d[0].type;
	        	}
	        	switch(type){
	        	case "radio":
	        	case "checkbox":
	        		var _checkboxradio = form.find('*[name="'+i+'"][value="'+el+'"]');
	        		_checkboxradio.prop('checked',true).checkboxradio('refresh');
	        		break;
	        	default:
	        		// check tagName
	        		if (d.prop('tagName').toLowerCase() == "select") {
	        			d.val(el).selectmenu();
	            		d.val(el).selectmenu('refresh').trigger('change');
	        		} else {
	        			d.val(el);
	        		}
	    		break;
	        	}
	    	} catch (err){
	    		//console.error("deserializeObject Error.(name="+i+")" + err);
	    	}	
		}
	});
};
