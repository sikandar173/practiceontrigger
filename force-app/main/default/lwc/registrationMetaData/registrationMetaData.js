import { LightningElement ,wire,track} from 'lwc';
import getMetadata from '@salesforce/apex/MetadataApex.getMetadata';
import registerUser from '@salesforce/apex/MetadataApex.registerUser';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RegistrationMetaData extends LightningElement {
alldatafilled=true;
@track firstName;
@track lastName;
@track phone;
@track email;
@track password;
@track pass;

ShowToast(title, message, variant, mode){
    const evt = new ShowToastEvent({
      title: title,
      message:message,
      variant: variant,
      mode: mode
    });
    this.dispatchEvent(evt);
  }

    @wire (getMetadata) metadata;

    valueChange(event){
        //console.log(event.target.value);
        console.log(event.target.name);
        if(event.target.name=="LastName"){
            this.lastName=event.target.value;
            console.log( '---->l',this.lastName);
            this.handleChangeDesibleButton();
        }
        else if(event.target.name=="Email"){
            
            this.email=event.target.value;
            console.log( '---->e',this.email);
            this.handleChangeDesibleButton();
        }
        else if(event.target.name=="Mobile"){
            this.phone=event.target.value;
            console.log( '---->ph',this.phone);
           
        }
        else if(event.target.name=="Password"){
            this.pass=event.target.value;
            console.log( '---->p',this.pass);
            this.handleChangeDesibleButton();
        }
        
        else if(event.target.name=="FirstName"){
            this.firstName=event.target.value;
            console.log( '---->f',this.firstName);
            this.handleChangeDesibleButton();
        }
        else if(event.target.name=="RetypePassword"){
            if(event.target.value==this.pass){
                this.password=event.target.value;
            }
            else{
                    alert("password Missmatch");
                    this.pass='';
                    this.password='';
            }
            console.log( '---->retypePAss',this.pass);
            this.handleChangeDesibleButton();
        }
     

    }

    handleRegister(event){
   if(this.firstName==null || this.firstName=='' &&
   this.lastName==null || this.lastName=='' &&
   this.email==null ||  this.emaile=='' &&
   this.password==null || this.passworde=='' &&
   this.pass==null || this.pass ==''){

   console.log('IMPORTED ');
   const evt = new ShowToastEvent({
    title: "Fill All the Required Fields!!",
        message: "",
        variant: "error"
});this.dispatchEvent(evt);

}
     
else{
        registerUser({ firstName: this.firstName,
            lastName: this.lastName,
            phone:this.phone, 
            email: this.email,
            password: this.password })
            .then((result) => {
                        
            if(result)
            {                       
                console.log('it stop here---1');
                window.location.href = result;
                console.log(result);

            } 
            
        })
        .catch((error) => {
            this.error = error;

            console.log('error-',JSON.stringify(error));

            this.showTermsAndConditionsLoading = false;

            if(error && error.body && error.body.message)
            {

                this.showTermsAndConditions = false;
                this.errorCheck = true;
                this.errorMessage = error.body.message;

                console.log('error 2',JSON.stringify(this.errorMessage));
               
            }           

        });
    }
}



 isInputValid() {
        let isValid = true;
        let inputFields = this.template.querySelectorAll('.validate');
        inputFields.forEach(inputField => {
            if(!inputField.checkValidity()) {
                inputField.reportValidity();
                isValid = false;
            }
            this.contact[inputField.name] = inputField.value;
        });
        return isValid;
    }


    handleChangeDesibleButton(){
       
        if(this.firstName &&
        this.lastName &&
        this.email  &&
        this.password &&
        this.pass){
            console.log("inside if");
            this.alldatafilled=false;
        }
        else{
            console.log("inside else");
            this.alldatafilled=true;
        }
    }


    }