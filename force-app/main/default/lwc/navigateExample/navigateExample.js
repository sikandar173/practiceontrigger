import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class NavigateExample extends NavigationMixin(LightningElement) {
    handleNav(){
       alert('asdihwgiH')
    //    this[NavigationMixin.Navigate]({
    //     "type": "standard__webPage",
    //     "attributes": {
    //         "url": "https://www.youtube.com/"
    //     }
    // });
    
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'new'
            },
        });
    
    }
    
    // recordPageUrl;
    // connectedCallback() {
    //     // Generate a URL to a User record page
    //     this[NavigationMixin.GenerateUrl]({
    //         type: 'standard__recordPage',
    //         attributes: {
    //             recordId: '0035g00000kLga4AAC',
    //             actionName: 'view',
    //         },
    //     }).then((url) => {
    //         this.recordPageUrl = url;
    //     });
    // }
}