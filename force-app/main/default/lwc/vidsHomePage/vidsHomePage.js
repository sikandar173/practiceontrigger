import { LightningElement, api, wire, track} from 'lwc';
import IMAGES from "@salesforce/resourceUrl/imagesforProj";
import fetchVideos from "@salesforce/apex/VideosAndMovies.getVideosNames";
import checkk from "@salesforce/apex/VideosAndMovies.methodName";
import useridfromsite from '@salesforce/user/Id';
//import linktovideoname from "@salesforce/apex/VideosAndMovies.getNameOfVideo"

export default class VidsHomePage extends LightningElement 
{
    //variables
    recordId = useridfromsite;
    videolist = []; // will have a list of video names
    selectedvidname = ''; //will have the selected name on click of anchor tag
    selectedvideourl = ''; //will contain the URL for video names (anchor tag)

    //image from static resources
    midotImage = IMAGES + '/imagesforProj/icons/midooot.png';
    
    //on page reload for 
    connectedCallback()
    {
       console.log('checking for user INFO... see down!');
       checkk().then(result => {
        console.log('itSS here >>> ',result);
        })
        .catch(error => {
            this.error = error;
        });
    }
    @wire(fetchVideos)
    resultantlist({data, error})
        {
            if (data) 
            {
                console.log('the data in if part >>',data);
                this.videolist = data;
                console.log('id is -.- ',this.recordId);
            } 
            else
            {
                console.log('the data ?--?? >>',data);
                console.log('Error yo! -- ', error); 
            }
        }

    onClickOfVideoName(event) // to navigate to particular video page
    {
        this.selectedvidname = event.currentTarget.dataset.value;
        console.log('name -- > ',this.selectedvidname);
        // linktovideoname({ videoname : this.selectedvidname }).then(result => {
        //     console.log('(onclick of anchor )checking if we got -->',result);
        //     if(result)
        //     {
        //         this.selectedvideourl = 'https://raagvitech-a8-dev-ed.develop.my.site.com/newproject/s/videohomepage/vidiosubpage'+'/?c__name='+result;
        //         console.log('url is ---  ',selectedvideourl);
        //     }
        // })
        // .catch(error => {
        //     this.error = error;
        // });

        this.selectedvidname = this.selectedvidname.replace(/ /g,"_");
        console.log('after changing the name--> ',this.selectedvidname);
        this.selectedvideourl = 'https://raagvitech-a8-dev-ed.develop.my.site.com/newproject/s/videohomepage/vidiosubpage'+'/?c__name='+this.selectedvidname;
        console.log('url is ---  ',selectedvideourl);
    }

}