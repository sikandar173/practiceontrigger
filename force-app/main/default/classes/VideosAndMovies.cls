public with sharing class VideosAndMovies 
{
    /**
     *********************************************************************************************
     * To Fetch all the available videos (get all records)
     *********************************************************************************************
     */

    @AuraEnabled(cacheable=true)
    public static List<Video__c> getVideosNames() 
    {
        System.debug(''+UserInfo.getUserId());
        System.debug(''+UserInfo.getName()+' -+-+- '+UserInfo.getUserName());
        List<Video__c> vidlist = [SELECT Id, Name, Thumbnail__c 
                                    FROM Video__c
                                    ORDER BY Name, Id ASC];
        return vidlist;
    }

    /**
     *********************************************************************************************
     * To Fetch an embedded video link of that selected video name recieved from URL
     *********************************************************************************************
     */

    @AuraEnabled
    public static string getEmbeddedVideo(String stringfromjs)
    {
        String embeddedvidlink = [SELECT EmbedVideoLink__c 
                                    FROM Video__c
                                    WHERE Name =: stringfromjs].EmbedVideoLink__c;

        System.debug('got the embed video link --> '+embeddedvidlink);
        return embeddedvidlink;
    }

    /**
     *********************************************************************************************
     * To 
     *********************************************************************************************
     */

    @AuraEnabled
    public static string methodName()
    {
        return ''+UserInfo.getUserName();             
    }
}