var FlavorView = Backbone.View.extend({
    
    _template: _.itemplate($('#flavorsTemplate').html()),

    
    initialize: function() {	
    	this.model.unbind("reset");
        this.model.bind("reset", this.render, this);
        this.renderFirst();
    },
    
    events: {
    	
        'change .checkbox':'enableDisableDeleteButton',
        //'click #flavors_delete': 'checkIfDisabled',
        'click .btn-delete':'onDelete',
        'click .btn-delete-group':'onDeleteGroup'
    },
    
    /*checkIfDisabled: function (e) {
  		for (var index = 0; index < this.model.length; index++) { 
			var flavorId = this.model.models[index].get('id');	 
			if($("#checkbox_"+flavorId).is(':checked'))
				{
					$("#flavors_delete").attr("href", "#syspanel/flavors/"+flavorId+"/delete");
				}
		}	console.log("Button disabled");		
    },*/
   
  	/*enableDisableDeleteButton: function (e) {
  		for (var index = 0; index < this.model.length; index++) { 
			var flavorId = this.model.models[index].get('id');	 
			if($("#checkbox_"+flavorId).is(':checked'))
				{
   		   	   			$("#flavors_delete").attr("disabled", false);
						return;
				}
		}
		$("#flavors_delete").attr("disabled", true);
			
    },*/
    
    enableDisableDeleteButton: function () {
    	console.log("Checkbox size = "+$(".checkbox:checked").size());
        if ($(".checkbox:checked").size() > 0) { 
            $("#flavors_delete").attr("disabled", false);
        } else {
            $("#flavors_delete").attr("disabled", true);
        }
        
    },
    
    onDelete: function(evt) {
        var flavor = evt.target.value;
        console.log("Event target = "+evt.target);
        var flav = this.model.get(flavor);
        var subview = new ConfirmView({el: 'body', title: "Delete Flavor", btn_message: "Delete Flavor", onAccept: function() {
            flav.destroy();
        }});
        subview.render();
    },
    
    onDeleteGroup: function(evt) {
        var self = this;
        var subview = new ConfirmView({el: 'body', title: "Delete Flavors", btn_message: "Delete Flavor", onAccept: function() {
            $(".checkbox:checked").each(function () {
                    var flavor = $(this).val(); 
                    console.log("Flavor to delete: " + flavor);
                    var flav = self.model.get(flavor);
                    flav.destroy();
            });
        }});
        subview.render();
    },
             
    renderFirst: function() {
        UTILS.Render.animateRender(this.el, this._template, this.model);
        this.enableDisableDeleteButton();
    },
    
	render: function () {
        if ($("#flavors").html() != null) {
            var new_template = this._template(this.model);
            var checkboxes = [];
            for (var index in this.model.models) { 
                var flavorId = this.model.models[index].id;
                if ($("#checkbox_"+flavorId).is(':checked')) {
                    checkboxes.push(flavorId);
                }
            }
            $(this.el).html(new_template);
            for (var index in checkboxes) { 
                var flavorId = checkboxes[index];
                var check = $("#checkbox_"+flavorId);
                if (check.html() != null) {
                    check.prop("checked", true);
                }
            }    
            this.enableDisableDeleteButton();       
        }
        
        return this;
    },

});