define.amd.jQuery = true;
define(["jquery", "jquerym"],
	function($){

	// need to disable jQuery Mobile hash support that it clashes with dojox/app own support
	$.mobile.hashListeningEnabled = false;
	// need to disable jQuery Mobile pushState support
	$.mobile.pushStateEnabled = false;

		// $.mobile.autoInitializePage = false
		// data-role="none"
	var itemlistmodel = null;

	var refreshData = function(){
		var datamodel = itemlistmodel.model[todoApp.selected_item];
		if(datamodel){
			// we need to try/catch because at first initialization the checkboxes are not yet
			// created and refresh will throw an error
			// deselect everything
			try{
				$("input[type='radio']").attr("checked", false).checkboxradio("refresh");
			}catch(e){
			}
			// select repeat type
			try{
				$("#radio-choice-"+(datamodel.repeat+1)).attr("checked", true).checkboxradio("refresh");
			}catch(e){
			}
		}
	};

	return {
		init: function(){
			this.loadedModels.itemlistmodel = todoApp.currentItemListModel;
			itemlistmodel = this.loadedModels.itemlistmodel;

			// connect a listener on the list that does update the model
			$("#list_repeat").change(function(e){
			    // stuff
				var index = parseInt(e.target.value)-1;
				var datamodel = itemlistmodel.model[todoApp.selected_item];
				if(datamodel){
					datamodel.repeat = index;
				}
			});
		},

		beforeActivate: function(){
			this.loadedModels.itemlistmodel = todoApp.currentItemListModel;
			itemlistmodel = this.loadedModels.itemlistmodel;
			refreshData();
		},

		destroy: function(){
			// disconnect listener on the list
		}
	}
});
