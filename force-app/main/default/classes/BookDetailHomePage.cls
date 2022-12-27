public class BookDetailHomePage {
    @AuraEnabled(cacheable=true)
    public static List<Books_Details__c> fetchingBooksData(){
         
        return [SELECT Id, Book_Name__c, Author_Name__c, 
                         Publisher_Name__c,Image__c,
                         Description__c, Price__c,stock__c
                    FROM Books_Details__c LIMIT 10 OFFSET 2];
    }
    

    @AuraEnabled
    public static AddToCart__c insertDataIntoCart(String cartId){

            AddToCart__c cart = new  AddToCart__c();
            cart.Books_Details__c = cartId;
            cart.quantity__c=1;
            cart.UserId__c = UserInfo.getUserId();
            System.debug('cartId==============' + cart);
            INSERT cart;
           return cart;
           

    }
    // @AuraEnabled
    // public static void updateCartData(string updateId ){
    //     AddToCart__c cart1 =[select Id,quantity__c from AddToCart__c where Id=:updateId];
    //     cart1.quantity__c++;
    //     UPDATE cart1;
    //    // return cart1;
    // }

    // @AuraEnabled(cacheable=true)
    // public static Integer getCartData(String cartId){
    //     AddToCart__c cart= [ SELECT id from AddToCart__c where UserId__c=:cartId];
    //     Integer cartCount=cart.size();
    //     return cartCount;
 //   }
   


    @AuraEnabled(cacheable=true)
    public static List<AddToCart__c> fetchCartItem(){
        List<AddToCart__c> cartList = [SELECT Id,Books_Details__c, quantity__c, Books_Details__r.Author_Name__c,
                                        Books_Details__r.Book_Name__c,
                                        Books_Details__r.Price__c,
                                        Books_Details__r.Publisher_Name__c,Books_Details__r.Image__c,Books_Details__r.stock__c FROM AddToCart__c where UserId__r.Id=:UserInfo.getUserId()];
        System.debug('cartList=================>>>>>>>>>>>>>>>>' + cartList);
         return cartList;      
    }

    @AuraEnabled(cacheable=true)
    public static List<AddToCart__c> fetchCartItem1(){
        List<AddToCart__c> cartList1 = [SELECT Id,Books_Details__c, quantity__c, Books_Details__r.Author_Name__c,
                                        Books_Details__r.Book_Name__c,
                                        Books_Details__r.Price__c,
                                        Books_Details__r.Publisher_Name__c,Books_Details__r.Image__c,Books_Details__r.stock__c FROM AddToCart__c where UserId__r.Id=:UserInfo.getUserId()];
        System.debug('cartList=================>>>>>>>>>>>>>>>>' );
         return cartList1;
    }

    @AuraEnabled
    public static AddToCart__c deleteCartRecord(Id deletedId){
        AddToCart__c cartItem = [SELECT Id FROM AddToCart__c WHERE Id =: deletedId];
     System.debug('contact from delete method'+ cartItem);
        DELETE cartItem;
        return cartItem;

    }
    @AuraEnabled
    public static BillingAddress__c addAddress(String FirstName, String LastName, String Email,String BilingAddress,Integer MobileNumber,Integer AlternateNumber,String HouseNo){
        BillingAddress__c item = new BillingAddress__c();
        item.FirstName__c = FirstName;
       // item.House_No__c = HouseNo;
        item.LastName__c =  LastName; 
        item.MobileNumber__c=MobileNumber;
        item.AlternateNumber__c=AlternateNumber;
        item.UserAddress__c=UserInfo.getUserId();
        INSERT item;
        System.debug('cartList=================' + item);
        return item;
 
         
    }
    @AuraEnabled
    public static List<BillingAddress__c> getAddress(){
        return  [SELECT id,FirstName__c,
                        LastName__c, 
                        MobileNumber__c,
                        AlternateNumber__c
                         FROM BillingAddress__c
                         WHERE UserAddress__r.Id=:UserInfo.getUserId() ];
    }
    // @AuraEnabled(cacheable=true)
    // public static List<Books_Details__c> searchingRecord(String searchkey){
    //     String searchKeyword = '%' + searchkey + '%';

    //     List<Books_Details__c> bookListRecord = new List<Books_Details__c>();
    //     for (Books_Details__c  bookList : [SELECT Id, Book_Name__c, Author_Name__c, Publisher_Name__c,Price__c FROM Books_Details__c 
    //                                        WHERE Id =: [SELECT Id FROM Books_Details__c WHERE Book_Name__c=:searchKeyword]]) {
    //         bookListRecord.add(bookList);
    //     }
    //     return bookListRecord;
    // }
    @AuraEnabled(cacheable=true)
    public static List<Books_Details__c> searchingRecord(String searchkey){
        String searchRecord = '%'+ searchkey +'%';
        String Query = '';
        if(searchkey !=null){
            Query = 'SELECT Id, Book_Name__c, Author_Name__c, Image__c, Publisher_Name__c,Price__c FROM Books_Details__c WHERE Book_Name__c LIKE:searchRecord';
        }
        List<Books_Details__c> bookListRecord = Database.query(Query);
        // for (Books_Details__c  bookList : [SELECT Id, Book_Name__c, Author_Name__c, Publisher_Name__c,Price__c FROM Books_Details__c 
        //                                    WHERE Id =: [SELECT Id FROM Books_Details__c WHERE Book_Name__c=:searchkey]]) {
        //     bookListRecord.add(bookList);
        // }
        System.debug('bookListRecord=============='+bookListRecord);
        return bookListRecord;
    }
}