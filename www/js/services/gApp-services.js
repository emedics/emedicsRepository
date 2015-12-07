MyApp.service('gApp', function(localStorageService){
	/*
            Macro Definition
    */
    this.STORAGE_HEADER         = "M2M_";
    this.STORAGE_PATIENTS        = this.STORAGE_HEADER + "patients";
    this.STORAGE_USER            = this.STORAGE_HEADER + "user";

    /*
            Member Variables
    */
    this.patients = {};
    this.patients.usefulID = 1;
    this.patients.list = [];
    this.patient = null;
    this.patients.bLogged = false;

    this.user={};

    this.clearAllInfo = function() {
        this.patients = {};
        this.patients.bMenuIndex = 0;
        this.patients.usefulID = 1;
        this.patients.list = [];
        this.patient = null;
        this.patients.bLogged = true;
        this.saveAllInfo();
    };

	this.loadAllInfo = function() {
        this.patients = localStorageService.get(this.STORAGE_PATIENTS);
        if (this.patients === null || this.patients.list === null)
        {
            this.patients = {};
            this.patients.bMenuIndex = 0;
            this.patients.usefulID = 1;
            this.patients.list = [];
        }
    };

    this.saveAllInfo = function() {
        localStorageService.set(this.STORAGE_PATIENTS, this.patients);
    };

    this.saveUserInfo = function(){
        localStorageService.set(this.STORAGE_USER, this.user);
    };

    this.loadUserInfo = function(){
        this.user = localStorageService.get(this.STORAGE_USER);
        if (this.user === null)
            this.user = {};
    };

    this.clearUserInfo = function(){
        this.user = {};
        this.saveUserInfo();
    };
})