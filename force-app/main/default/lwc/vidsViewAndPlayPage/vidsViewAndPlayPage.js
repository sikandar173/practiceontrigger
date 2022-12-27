import { LightningElement } from 'lwc';
import displayvideo from "@salesforce/apex/VideosAndMovies.getEmbeddedVideo";
import jquery from "@salesforce/resourceUrl/jQuery361"

export default class VidsViewAndPlayPage extends LightningElement 
{
    //variables
    vname = '';
    displayvidname = '';
    embededlink = '';

    //method on page load get the parameter from url
    connectedCallback()
    {
        const queryfromurl = (window.location.search).split('?')[1];
        const parametersfromurl = new URLSearchParams(queryfromurl);
        console.log('parameter i got --> ',parametersfromurl);
        console.log('checkingggggg !!!!! -- ',(parametersfromurl.get('c__name')));

        for (let pair of parametersfromurl.entries()) 
        {
            this.vname = pair[1];
        }

        this.displayvidname = (this.vname).replace(/_/gi,' ');
        console.log('disp name -- ',this.displayvidname);

        //for fetching the embed video link
        displayvideo({ stringfromjs : this.displayvidname }).then(result => {
            console.log('checking if we got -->',result);
            this.embededlink = result;
        })
        .catch(error => {
            console.log('-X-X-X-X-X-X-X-X-',error);
        });

        this.jqueryLoadMethod();
    }

    //method that runs on playing the video
    onvideoplay()
    {
        console.log('Yaay IT is running man !! (iframe)>>');
        //var x = document.getElementsById("ifr");
        
    }

    //after the page is loaded
    // renderedCallback()
    // {
    //     console.log('--------------------rendercallback----------------------');
    //     // to load jquery
    //     Promise.all(loadScript(this, 'https://code.jquery.com/jquery-3.6.1.min.js')
    //                     .then(() => {
    //                     console.log(`jQuery loaded....`);
    //                     }).catch(err => {
    //                     console.log('errir loading   ',err);
    //                     })
    //             ).catch(e => {
    //                 console.log('sorry .. i broke the promise --> ',e);
    //             })


    //     $(document).ready(function(){
    //         $("iframe").on("load", function(){
    //             $(this).contents().on("mousedown, mouseup, click", function(){
    //                 console.log("Click detected inside iframe. $$$$$");
    //             });
    //         });
    //     });
    // }

    async jqueryLoadMethod()
    {
        loadScript(this, 'https://code.jquery.com/jquery-3.6.1.min.js')
                        .then(() => {
                        console.log(`jQuery loaded....`);
                        }).catch(err => {
                        console.log('errir loading   ',err);
                        });
    }
   
    

    
}