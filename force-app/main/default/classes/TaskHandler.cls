public class TaskHandler {
public static void createTask(List<Task> newTask)
{
        Map<String,String> mapEmailCom = new Map<String,String>();
        Map<String,String> mapEmailSub = new Map<String,String>();
        Map<String,String> mapCallCom = new Map<String,String>();
        Map<String,String> mapCallSub = new Map<String,String>();
     for(TaskAtttribute__mdt taskmdt:[select Label,Subject__c,Comment__c from TaskAtttribute__mdt])
     {
       if(taskmdt.Label =='Email')
       { 
                mapEmailCom.put(taskmdt.Label, taskmdt.Comment__c);
                mapEmailSub.put(taskmdt.Label, taskmdt.Subject__c);
       } 
        if(taskmdt.Label =='Call')
        {
                 mapCallCom.put(taskmdt.Label, taskmdt.Comment__c);
                mapCallSub.put(taskmdt.Label, taskmdt.Subject__c);
        }
     }
     for(Task t:newTask)
     {
         if(t.Priority=='Normal' && t.Subject=='Call' )
                
            {
                
                t.ActivityDate = System.today();
                t.Subject =mapCallSub.get('Call');
                t.Description=mapCallCom.get('Call');
            }
            else if(t.Priority=='Normal' && t.Subject=='Email' )
            {
                t.ActivityDate = System.today();
                t.Subject =mapEmailSub.get('Email');
                t.Description=mapEmailCom.get('Email');
            }
          else if(t.Priority=='High' && t.Subject=='Call')
            {
                 t.ActivityDate = System.today()+7;
                t.Subject =mapCallSub.get('Call');
                t.Description=mapCallCom.get('Call');
            }
            
            else if(t.Priority=='High' && t.Subject=='Email')
            {
                t.ActivityDate = System.today()+7;
                t.Subject =mapEmailSub.get('Email');
                t.Description=mapEmailCom.get('Email');
            }
         
     }
}
    public static void followuptask(List<Task> taskAfter){
       List<Task> taskList=new List<task>();
       for(Task t:taskAfter){
           if(t.Subject !='Follow Up Task'){
           if(t.Priority=='High')	
           {
               
             Task newTask=new Task();
              newTask.Subject='Follow Up Task';
              newTask.ActivityDate=System.today()+7;
              newTask.Priority='High';
              taskList.add(newTask); 
               
           }
       }
           
       }
       INSERT taskList;
     } 
}