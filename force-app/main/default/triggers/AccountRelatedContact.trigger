trigger AccountRelatedContact on Account(after insert) {
    List<Contact> conList=new List<Contact>();
for(Account acc:Trigger.new){
    Contact con=new Contact();
    con.AccountId=acc.Id;
    con.LastName=acc.Name;
    con.Phone=acc.Phone;
    con.Email=acc.Email__c;
    conList.add(con);
}
insert conList;
}