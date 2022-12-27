public with sharing class MetadataApex {
        @AuraEnabled(cacheable=true)
        public static List<Registration__mdt> getMetadata(){
            List<Registration__mdt> mdata = new List<Registration__mdt>();
             mdata =[Select Sequence__c,Required__c, Label,Field_Api_Name__c,Field_type__c From Registration__mdt ORDER BY 	Sequence__c ASC ];
            return mdata;
        }


        @AuraEnabled
        public static string registerUser(String firstName, String lastName, string phone, String email, String password){
        		
                System.debug('firstName2 -->'+firstName);
 				System.debug('lastName2 -->'+lastName);
 				System.debug('email2 -->'+email);
 				System.debug('phone2 -->'+phone);
 				System.debug('password2 -->'+password); 
                // Account accObj=[select Id from Account where Name='AllCustomer'];
                // System.debug('accObj -->'+accObj);
               
        
            try {       
                String accountId= '0015g000011lKURAA2'; 
                System.debug('accountId -->'+accountId); 
                
                User user = new User();
                user.firstName = firstName;
                user.lastName = lastName;
                user.Username = email;
                user.Email = email;
                user.Phone = phone;
                user.CommunityNickname = firstname+lastname+email.substring(1,5);
                user.LocaleSidKey='en_US';
                user.EmailEncodingKey='UTF-8';
                user.LanguageLocaleKey='en_US';
                
                System.debug('firstName 1-->'+firstName);
 				System.debug('lastName 1-->'+lastName);
 				System.debug('email 1-->'+email);
 				System.debug('phone 1-->'+phone);
 				System.debug('password 1-->'+password);                
                            
                System.debug('user 1-->'+user);
                System.debug('user 2-->'+accountId);
                System.debug('user 3-->'+password);
    
                String userId = Site.createPortalUser(user, accountId, password);
    
                System.debug('user 4-->'+userId);
    
                if (userId != null) {
                    
                    
                    System.debug('user --3-->'+userId);
                    System.debug('accountId --10-->'+accountId);
                    System.debug('password --100-->'+password);
    
    
    
                    if (password != null ) {
                        ApexPages.PageReference pageRef = Site.login(email, password, null);
                        if(pageRef != null) 
                        return pageRef.getUrl();
                        System.debug('Password debug 2'+password);
                    }
                    else {
                        ApexPages.PageReference page = System.Page.SiteRegisterConfirm;
                        page.setRedirect(true);
    
                        System.debug('page redirect 2-->');
    
                        return page.getUrl();
                    }
                }
    
    
                return null; 
    
    
            } catch (Exception e) {
                system.debug('e.getMessage+   '+e.getMessage());
                
                if(!Test.isRunningTest()) throw new AuraHandledException(e.getMessage());
    
                return null;
                
            }
        }

        }