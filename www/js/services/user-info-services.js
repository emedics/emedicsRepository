
MyApp.service('UserInfo', function(localStorageService, Utils, gApp) {

    /*
            Macro Definition
    */
    this.STORAGE_HEADER         = "M2M_";
    this.STORAGE_ACCOUNT        = this.STORAGE_HEADER + "account";
    this.STORAGE_PAYMENT        = this.STORAGE_HEADER + "payment";

    /*
            Member Variables
    */
    this.account = {};
    this.account.isSigned       = false;
    this.account.memberId       = "";
    this.account.loginHash      = "";
    this.account.id             = "";
    this.account.password       = "";
    this.account.updatedTime    = null;

    this.account.details        = [];
    this.account.statements     = [];

    this.payment = {};
    this.payment.guarantor      = "";
    this.payment.cardNumber     = 0;
    this.payment.balance        = 0;
    this.payment.paymentAmount  = 0;
    this.payment.dueDate        = 0;
    this.payment.pastDueAmount  = 0;

    this.payment.checkNumber  = "";
    this.payment.nameOfBank  = "";
    this.payment.bankAccountNumber  = "";
    this.payment.bankRoutingNumber  = "";
    this.payment.nameOnBankAccount  = "";

    this.payment.cardType  = "";
    this.payment.cardNumber  = "";
    this.payment.expirationMonth  = "";
    this.payment.expirationYear  = "";
    this.payment.CVV  = "";
    this.payment.nameOnCard  = "";
    this.payment.billingAddress  = "";
    this.payment.city  = "";
    this.payment.state  = "";
    this.payment.zip  = "";
    this.payment.payByCheck  = "";


    this.getUpdatedTime = function() {
        var date = new Date();

        if (this.updatedTime != null)
            date = new Date(this.updatedTime);

        var strDate = "";

        strDate += date.getFullYear();
        strDate += "-" + Utils.get2DigitNumber(date.getMonth() + 1);
        strDate += "-" + Utils.get2DigitNumber(date.getDate());
        strDate += " " + Utils.get2DigitNumber(date.getHours());
        strDate += ":" + Utils.get2DigitNumber(date.getMinutes());
        strDate += ":" + Utils.get2DigitNumber(date.getSeconds());

        return strDate;
    };

    this.clearAllInfo = function() {
        this.account = {};
        this.account.isSigned = false;
        this.saveAllInfo();
    };

    this.setInfo = function(memberId, loginHash, id, password) {
        this.account.isSigned   = true;
        this.account.memberId   = memberId;
        this.account.loginHash  = loginHash;
        this.account.id         = id;
        this.account.password   = password;
    };

    this.setPaymentInfo = function(paymentAmount, checkNumber, nameOfBank, bankAccountNumber, bankRoutingNumber,nameOnBankAccount,payByCheck) {
        this.payment.paymentAmount = paymentAmount;
        this.payment.checkNumber  = checkNumber;
        this.payment.nameOfBank  = nameOfBank;
        this.payment.bankAccountNumber  = bankAccountNumber;
        this.payment.bankRoutingNumber  = bankRoutingNumber;
        this.payment.nameOnBankAccount  = nameOnBankAccount;
        this.payment.payByCheck  = payByCheck;

    };
    this.setCardPaymentInfo = function(paymentAmount, cardType, cardNumber, expirationMonth, expirationYear,CVV, nameOnCard,billingAddress,city,state,zip,  payByCheck) {
        this.payment.paymentAmount = paymentAmount;
        this.payment.cardType  = cardType;
        this.payment.cardNumber  = cardNumber;
        this.payment.expirationMonth  = expirationMonth;
        this.payment.expirationYear  = expirationYear;
        this.payment.CVV  = CVV;
        this.payment.nameOnCard  = nameOnCard;
        this.payment.billingAddress  = billingAddress;
        this.payment.city  = city;
        this.payment.state  = state;
        this.payment.zip  = zip;
        this.payment.payByCheck  = payByCheck;

    };

    this.loadAllInfo = function() {
        gApp.patients = localStorageService.get(this.STORAGE_PATIENTS);
        if (typeof gApp.patients === 'undefined' || gApp.patients === null)
            this.patients = [];
    };

    this.saveAllInfo = function() {

        localStorageService.set(this.STORAGE_PATIENTS, gApp.patients);
    };

});
