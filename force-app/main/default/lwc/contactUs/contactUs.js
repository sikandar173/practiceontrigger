import { LightningElement } from 'lwc';
import contactUs from '@salesforce/apex/ContactUsHandler.contactUs';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ContactUs extends LightningElement {
  name;
  phone;
  email;
  description;

  nameHandler(event){
    
        this.name = event.target.value;
        console.log("name==================", this.name);
  }
  phoneHandler(event){
    this.phone=event.target.value;
    console.log("phone==================", this.phone);
  }
  emailHandler(event){
    this.email=event.target.value;
    console.log("email==================", this.email);

  }
  HandleTextArea(event){
    this.description=event.target.value;
    console.log("comment==================", this.description);
  }

  HandleSubmit(event){
    contactUs({
        name:this.name,
        phone:this.phone,
        email:this.email,
        description:this.description
    })
    .then((result) => {
      console.log('recevied from server'+JSON.stringify(result));  
        
      const toastEvent = (new ShowToastEvent({
        title: 'Success!',
        message: 'Your record is saved successfully',
        variant: 'success'
    }));
    this.dispatchEvent(toastEvent);
    
     
    })
    .catch((error) => {
        this.error = error;      
        const toastEvent1 = (new ShowToastEvent({
          title: 'Error!',
          message: 'Your record is not saved',
          variant: 'error'
      }));
      this.dispatchEvent(toastEvent1);
    });
   
}
    mapMarkers = [
        {
            location: {
                City: 'Bengaluru',
                Country: 'India',
                PostalCode: '560068',
                State: 'KR',
                Street: ' Raagvitech,kudlu gate, UMC 2nd Floor',
            },
            title: 'Raagvitech',
            description:
                'Software Company',
        },
    ];
    zoomLevel = 15;
    listView = 'visible';

   
    
}