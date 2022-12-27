public with sharing class RegisterPage {
@AuraEnabled
public static user registration(String firstName, String lastName, string phone, String email){
Profile profileObj = [SELECT Id, Name
            FROM Profile 
            WHERE Name='Customer Community Login User'];

account accObj=[select Id from account where Name='AllCustomer'];
System.debug('AccountId'+accObj.Id);
contact con=new contact();
con.FirstName=firstName;
con.LastName=lastName;
con.accountId=accObj.Id;
INSERT con;

System.debug('ContactId'+con.Id);
user newUser=new user();
newUser.LastName=lastName;
newUser.FirstName=firstName;
newUser.Username=email;
newUser.Email=email;
newUser.Alias=firstName.substring(0,3);
newUser.TimeZoneSidKey='America/Los_Angeles';
newUser.LocaleSidKey='en_US';
newUser.EmailEncodingKey='UTF-8';
newUser.ContactId=con.Id;
newUser.ProfileId=profileObj.Id;
newUser.LanguageLocaleKey='en_US';

insert newUser;
return newUser;
}


@AuraEnabled
public static String doLogin(String username, String password)
{
    try 
    {
        System.debug('UserName---'+ username);
        System.debug('Password debug top'+password);
        System.debug('<------->');
        String startUrl = 'https://raagvitech-a8-dev-ed.develop.my.site.com/newproject/';
        ApexPages.PageReference pageRef = Site.login(username, password, startUrl);
        System.debug('-->'+pageRef);
        System.debug('-->'+password);
        if(pageRef != null) return pageRef.getUrl();
        throw new CalloutException();
        
    } 
    catch (Exception e) 
    {
        system.debug('e.getMessagelogin+   '+e.getMessage());
        throw new AuraHandledException(e.getMessage());
    }
}

}