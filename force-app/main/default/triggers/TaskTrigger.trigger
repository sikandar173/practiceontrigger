trigger TaskTrigger on Task (before insert,after insert) {
    
    if(Trigger.isBefore)
    {
        TaskHandler.createTask(Trigger.new);
    }
     if(trigger.isafter){
        
       TaskHandler.followuptask(Trigger.new);
    }
}