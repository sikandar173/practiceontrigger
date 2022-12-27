import { LightningElement, track } from 'lwc';
import registration from '@salesforce/apex/RegisterPage.registration';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RegisterPage extends LightningElement {
    @track firstName;
    @track lastName;
    @track phone;
    @track email;
    @track password;
    @track pass;


    handleFirstName(event){
        
        this.firstName=event.target.value;
        console.log('FirstName',event.target.value);
    }
    handleLastName(event){
        this.lastName=event.target.value;
        console.log('LastName',event.target.value);
    }
    handleEmail(event){
        this.email=event.target.value;
        console.log('Email',event.target.value);

    }
    handleMobile(event){
        this.phone=event.target.value;
        console.log('mobile',event.target.value);
    }
    handlepassword(event){
        this.pass=event.target.value;
        console.log('password',event.target.value);
       
    }
    handleConfirmPassword(event){
        
        if(this.pass===event.target.value){
        this.password=event.target.value;
        console.log('Confirm password',event.target.value);
        }
        else{
            alert('password is miss match');
        }

        
    }

    handleDOB(event){
      // this.Dob=event.target.value;
       this.regObj.DateOfBirth__c=event.target.value;
        console.log('DOB',this.regObj.DateOfBirth__c);
    }


    handleRegister(){

        registration({firstName:this.firstName,lastName:this.lastName,phone:this.phone,email:this.email})
        .then(result=>{
            console.log('result:',JSON.stringify(result));
         
            const toastEvent = (new ShowToastEvent({
                title: 'Success!',
                message: 'Your record is saved successfully',
                variant: 'success'
            }));
            this.dispatchEvent(toastEvent);
            this.window,location.reload();
    
        })
        .catch(error=>{
                this.error=error.message;
                const toastEvent1 = (new ShowToastEvent({
                    title: 'Error!',
                    message: 'YOur record is not saved',
                    variant: 'error'
                }));
                this.dispatchEvent(toastEvent1);
        });
        console.log('clicked');
     
        }
       

    }