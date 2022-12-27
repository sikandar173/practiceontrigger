public with sharing class ContactUsHandler {
    @AuraEnabled

  public static ContactUS__c contactUs(string name,string phone,string email,string description){
    ContactUS__c contt=new ContactUS__c();
    contt.Name=name;
    contt.Phone__c=phone;
    contt.Email__c=email;
    contt.Description__c=description;
    System.debug('beforedata==================='+ contt);
    insert contt;
    System.debug('afterdata==================='+ contt);
    return contt;
  }
}