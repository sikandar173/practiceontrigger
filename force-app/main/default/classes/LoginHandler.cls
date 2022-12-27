public with sharing class LoginHandler {

    //method which is called onclick of login button
    @AuraEnabled
    public static string forLoginPage(String username, String password){
        try
        {
            //url of the community site
            
            String startUrl = 'http://raagvitech-a8-dev-ed.develop.my.site.com/newproject';

            //site class method to check username and password and return page reference object

            ApexPages.PageReference pageRef = Site.login(username, password, startUrl);
            if(pageRef != null) 
            return pageRef.getUrl();
            throw new CalloutException();

        } catch (Exception e) {
            system.debug('e.getMessagelogin+   '+e.getMessage());
            throw new AuraHandledException(e.getMessage());
         
        }
    }
}