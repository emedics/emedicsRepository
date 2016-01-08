MyApp.controller('FormsCtrl', function($scope, $ionicLoading, $ionicPopover, $ionicPopup,$ionicViewSwitcher, 
	$ionicHistory, $ionicScrollDelegate,$ionicTabsDelegate, $state, $timeout, gApp, HttpGet, 
	HttpService, Utils, $filter) {
	$scope.bNew = 0;
	var bActive = true;
	$scope.$on('$ionicView.enter', function() {
		$ionicViewSwitcher.nextDirection('previous');
		$scope.timePickerObject = {
		  inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
		  step: 15,  //Optional
		  format: 24,  //Optional
		  titleLabel: '24-hour Format',  //Optional
		  setLabel: 'Set',  //Optional
		  closeLabel: 'Close',  //Optional
		  setButtonType: 'button-positive',  //Optional
		  closeButtonType: 'button-stable',  //Optional
		  callback: function (val) {    //Mandatory
		    timePickerCallback(val);
		  }
		};

		$scope.onTop(false);
		bActive = true;
		if (gApp.patient.menus === null)
		{
			var data = {};
			$ionicLoading.show();
	        HttpGet(HttpService.getLocalURL("JSON_Menu.json"), data, function(resp, error) {
	            if (error) {
	            	$ionicLoading.hide();
	                Utils.alertPopup("Error", "Failed to load local database file 'JSON_Menu.json'.");
	                return;
	            } else {
	            	$scope.bNew = 1;
			      	$scope.menus = angular.copy(resp.menus[gApp.patient.bMnuID]);
			      	$scope.selsections = $scope.menus.sections;
			      	$scope.temp = {section:$scope.selsections[0]};
			      	$scope.nCurCnt = $scope.selsections.length;
			      	for (var i = 0; i < $scope.selsections.length; i++)
			      	{
			      		if (Utils.isNULL($scope.selsections[i].sections) === true)
					    {
							if ($scope.selsections[i].secID === -1)
						    	$scope.selsections[i].sections = angular.copy(gApp.annexe.annexes[$scope.selsections[i].aneID].sections);
						    else
						    	$scope.selsections[i].sections = angular.copy([gApp.annexe.annexes[$scope.selsections[i].aneID].sections[$scope.selsections[i].secID]]);
						    $scope.selsections[i].sStatus = 1;
						    $scope.selsections[i].sStatusStyle = {'color' : 'red'};
					    }
			      	}
			      	gApp.patient.menus = angular.copy(resp.menus);
			      	$scope.onSelectChanged(-1);
			      	$ionicLoading.hide();
			      	$timeout(function() {
			      		gApp.patient.menus[gApp.patient.bMnuID] = angular.copy($scope.menus);
					}, 50);
	            }
	        });
		}
		else 
		{
			$scope.menus = angular.copy(gApp.patient.menus[gApp.patient.bMnuID]);
		    $scope.selsections = $scope.menus.sections;
		    $scope.temp = {section:$scope.selsections[0]};
		    $scope.nCurCnt = $scope.selsections.length;
		    for (var i = 0; i < $scope.selsections.length; i++)
	      	{
	      		if (Utils.isNULL($scope.selsections[i].sections) === true)
			    {
					if ($scope.selsections[i].secID === -1)
				    	$scope.selsections[i].sections = angular.copy(gApp.annexe.annexes[$scope.selsections[i].aneID].sections);
				    else
				    	$scope.selsections[i].sections = angular.copy([gApp.annexe.annexes[$scope.selsections[i].aneID].sections[$scope.selsections[i].secID]]);
				    $scope.selsections[i].sStatus = 1;
				    $scope.selsections[i].sStatusStyle = {'color' : 'red'};
			    }
	      	}
		    $scope.onSelectChanged(-1);
		    $timeout(function() {
			    gApp.patient.menus[gApp.patient.bMnuID] = angular.copy($scope.menus);
			}, 50);
		}
		$ionicPopover.fromTemplateUrl('templates/my-popover.html', {
		    scope: $scope,
		}).then(function(popover) {
		    $scope.popover = popover;
		});
	});

	$scope.onSave = function(){
		$scope.saveToStorage();
		Utils.alertPopup('Warning', 'Form is successfully saved.');	
	};

	$scope.onTop = function(bActual){
		$ionicScrollDelegate.$getByHandle('my-handle').scrollTop(bActual);
	};

	$scope.onPrevious = function(){
		var nInd = $scope.nCurInd;
		while ($scope.selsections[nInd - 1].sections[0].bHidden === false)
		{
			nInd --;
			if (nInd < 0) return;
		}
		$scope.onSelectChanged(nInd - 1);
	};

	$scope.onNext = function(){
		var nInd = $scope.nCurInd;
		while ($scope.selsections[nInd + 1].sections[0].bHidden === false)
		{
			nInd ++;
			if (nInd > $scope.nCurCnt - 1) return;
		}
		$scope.onSelectChanged(nInd + 1);
	};

	$scope.saveToStorage = function(){
		$scope.menus.date = new Date();
		gApp.patient.menus[gApp.patient.bMnuID] = angular.copy($scope.menus);

		if ($scope.bNew == 1)
		{
			gApp.patient.ID = gApp.patients.usefulID;
    		gApp.patients.usefulID++;
			gApp.patients.list.push(gApp.patient);
			if (gApp.patient.bMnuID != 0)
				gApp.patient.menus[0].date = new Date();
			$scope.bNew = 0;
		}

		if (typeof gApp.patient.name === 'undefined' || gApp.patient.bMnuID === 0)
		{
			if (gApp.patient.menus[0].sections[0].sections !=null && gApp.patient.menus[0].sections[0].sections[0].subsections[0].members[0].value !='')
				gApp.patient.name = angular.copy(gApp.patient.menus[0].sections[0].sections[0].subsections[0].members[0].value);
			else
				gApp.patient.name = 'Unknown Name';
		}

        gApp.patient.date = new Date();
		gApp.saveAllInfo();
	};

	isChanged = function(){
		if (angular.equals(gApp.patient.menus[gApp.patient.bMnuID], $scope.menus) === false)
			return true;
		return false;
	}

	$scope.onBack = function(){
		if (isChanged() === true)
		{
			Utils.confirmPopupYesNo('Warning', 'Do you want to save current working form now?', 
				function(){
					$scope.saveToStorage();
					$ionicHistory.goBack();
		       	},
		       	function(){
					$ionicHistory.goBack();
		       	});
		}
		else
			$ionicHistory.goBack();
	};

    $scope.onSelectChanged = function(nInd) {
    	if (nInd === -1)
    	{
    		$scope.menutitle = $scope.menus.title.FR;
    		if ($scope.menutitle.length > 14)
    			$scope.menutitle = $scope.menutitle.substring(0, 13) + "...";
    		nInd = 0;
    	}
    	else $scope.popover.hide();
    	$scope.nCurInd = nInd;
	    $scope.temp.section = $scope.selsections[nInd];
	    $scope.onTop(true);
	    if (isChanged() === false)
	    {
	    	$timeout(function() {
				gApp.patient.menus[gApp.patient.bMnuID] = angular.copy($scope.menus);
			}, 51);
	    }
    };

    $scope.$on("MenuSelected", function (event, index) {
    	if (gApp.patient.bMnuID == index) 
    		return;
    	if (isChanged() === true)
		{
			Utils.confirmPopupYesNo('Warning', 'Do you want to save current working form now?', 
				function(){
					$scope.saveToStorage();
					gApp.patient.bMnuID = index;
					$state.go($state.current, {}, {reload: true});
		       	},
		       	function(){
		       		gApp.patient.bMnuID = index;
		       		$state.go($state.current, {}, {reload: true});
		       	});
		}
		else
		{
			gApp.patient.bMnuID = index;
			$state.go($state.current, {}, {reload: true});
		}
	})
	
	tabSelect = function(index){
		switch(index)
		{
			case 0:
				$state.go('tabs.main');
				break;
			case 1:
				$state.go('tabs.draft');
				break;
			case 2:
				$state.go('tabs.sent');
				break;
			case 3:
				$state.go('tabs.settings');
				break;
		}
		gApp.bForm = false;
		bActive = false;
	}
	$scope.$on("TabSelected", function(event, index){
		if (bActive === false) return;
		gApp.bForm = true;
		if (isChanged() === true)
		{
			Utils.confirmPopupYesNo('Warning', 'Do you want to save current working form now?', 
				function(){
					$scope.saveToStorage();
					tabSelect(index);
		       	},
		       	function(){
		       		tabSelect(index);
		       	});
		}
		else
			tabSelect(index);
	})
	onGoto = function(item, temp, nInd){
		if (nInd === 1)
		{
			var i = 0;
			while (!angular.equals(temp[i], item))
			{
				temp[i].bHidden = true;
				i++;
			}
		}
		item.bHidden = false;
	}
	onGotoS = function(item, temp)
	{
		var i = 0;
		while (!angular.equals(temp[i], item))
		{
			if (i != $scope.nCurInd)
				temp[i].sections[0].bHidden = false;
			i++;
		}
	}
	onActive = function(temp){
		for (var i = 0;i < temp.length; i++)
		{
			temp[i].bHidden = false;
			if (typeof temp[i].items != "undefined") onActive(temp[i].items);
		}
	}
	getObject = function(type, id, index, value, bInit){
		var nInd, item, m_id = angular.copy(id), j = 0, temp, tem;
		do
		{
			nInd = id.indexOf('-');
			if (nInd > -1)
			{
				m_id = id.substring(0, nInd);
				id = id.substring(nInd + 1);
			}
			else
				m_id = id;
			if (j === 0)
			{
				for (var i = 0; i < $scope.menus.sections.length; i++)
				{
					temp = $scope.menus.sections[i].sections.filter(function( obj ) {
					  return obj.M_ID === m_id;
					});
					if (temp != null && temp.length != 0)
					{
						if (nInd === -1)
						{
							if (type === "GOTO" && bInit != 1)
							{
								if (index === -3)
									onGotoS($scope.menus.sections[i], $scope.menus.sections, value);
								else
									$scope.onSelectChanged(i);
								return;
							}
						}
						item = temp[0];
						break;
					}
				}
			}
			if (j === 1)
				temp = item.subsections;
			if (j === 2)
				temp = item.members;
			if (j > 2)
				temp = item.items;
			if (j != 0)
			{
				tem = temp.filter(function(obj){
						return obj.M_ID === m_id;
					});
				if (tem === null || tem.length === 0) return null;
				item = tem[0];
			}
			if (typeof item === 'undefined') return null;
			if (nInd === -1)
			{
				if (type === "GOTO")
					onGoto(item,temp,index);
				if (type === "SHIDE")
					item.bHidden = value;
				if (type === "ACTIVE")
				{
					if (typeof item.members != "undefined")
					{
						item.bHidden = false;
						item = item.members;
					}
					onActive(item);
				}
				return item;
			}
			j++;
		}while(1 > 0);
	}
	function unCheck(member){
		for (var i = 0; i < member.items.length; i++)
			member.items[i].value = false;
	}
	$scope.onChecked = function(sitem, member){
		if (sitem.type != "SHIDE" && sitem.type != "GOTO") return;
		if (sitem.type === "GOTO" && sitem.value === false) 
		{
			$scope.bLock = false;
			return;
		}
		if (sitem.value === true && $scope.bLock === true)
		{
			sitem.value = false;
			return;
		}
		if (sitem.type === "GOTO" && sitem.value === true) 
		{
			$scope.bLock = true;
			unCheck(member);
			sitem.value = true;
		}

		var nInd = sitem.flow.indexOf(',');
		if (nInd === -1)
		{
			if (sitem.type === "GOTO")
				getObject(sitem.type, sitem.flow, -3, sitem.value);
			else
				getObject(sitem.type, sitem.flow, 1, sitem.value);
		}
		else
		{
			var temp = angular.copy(sitem.flow),j = 0;
			while (nInd > -1)
			{
				j++;
				getObject(sitem.type, temp.substring(0, nInd), j, sitem.value);
				temp = temp.substring(nInd + 1);
				nInd = temp.indexOf(',');
			}
			getObject(sitem.type, temp, j + 1, sitem.value);
		}
	}
	$scope.onOptioned = function(sitem, bInit){
		var item = sitem.items.filter(function(obj){
			return obj.val === sitem.value;
		})[0];
		if (item.type != "SHIDE" && item.type != "GOTO") return;
		var nInd = item.flow.indexOf(','), value = true;

		if (sitem.type === "RADIO") value = item.value;
		if (nInd === -1)
			getObject(item.type, item.flow, 1, value, bInit);
		else
		{
			var temp = angular.copy(item.flow),j = 0;
			while (nInd > -1)
			{
				j++;
				getObject(item.type,temp.substring(0, nInd), j, value, bInit);
				temp = temp.substring(nInd + 1);
				nInd = temp.indexOf(',');
			}
			getObject(item.type, temp, j + 1, value, bInit);
		}
		if (typeof item.active === "undefined") return;
		nInd = item.active.indexOf(',');
		if (nInd === -1)
			getObject("ACTIVE", item.active, 1, true);
		else
		{
			var temp = angular.copy(item.active),j = 0;
			while (nInd > -1)
			{
				j++;
				getObject("ACTIVE",temp.substring(0, nInd), j, true);
				temp = temp.substring(nInd + 1);
				nInd = temp.indexOf(',');
			}
			getObject("ACTIVE", temp, j + 1, true);
		}
	}
	$scope.onChange = function(){
		$scope.temp.section.bCompleted = false;
		$scope.temp.section.sStatus = 2;
		$scope.temp.section.sStatusStyle = {'color' : 'blue'};
	}
	$scope.onDay = function(mem){
		var item = getObject("Day",mem.flow);
		if (item === null) return;
		if (mem.value === null)
			item.value = "";
		else
			item.value = moment().locale(gApp.langu.split('-')[0]).isoWeekday(mem.value.getDay()).format('ddd');
	}
	$scope.onTime = function(mem){
		$scope.mTime = mem;
	}
	$scope.getNumber = function(num) {
    	return new Array(num);   
	}
	function timePickerCallback(val) {
		if (typeof val === 'undefined') return;
		$scope.timePickerObject.inputEpochTime = val;
		$scope.mTime.value = $scope.epochParser(val);
	}
	$scope.epochParser = function(val) {
	  if (val === null) {
	    return "00:00";
	  } else {
	    var hours = parseInt(val / 3600);
	    var minutes = (val / 60) % 60;
	    return (prependZero(hours) + ":" + prependZero(minutes));
      }
    }
    $scope.onChangeStatus = function(){
    	if ($scope.temp.section.bCompleted === true)
    	{
    		$scope.temp.section.sStatus = 3;
    		$scope.temp.section.sStatusStyle = {'color' : 'green'};
    	}
    	else
    	{
    		$scope.temp.section.sStatus = 2;
    		$scope.temp.section.sStatusStyle = {'color' : 'blue'};
    	}
    }
    function prependZero(param) {
      if (String(param).length < 2) {
      	return "0" + String(param);
      }
      return param;
  	}
})
