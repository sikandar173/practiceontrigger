import { api, LightningElement } from 'lwc';
import getAddress from '@salesforce/apex/BookDetailHomePage.getAddress';
//import placedOrder from '@salesforce/apex/BookDetailHomePage.placedOrder';

export default class CheckOut extends LightningElement {
    @api addedItem;
    @api totalAmount;
    isBuyOpen = false;
    isCloseModal = false;
    isAddress=false;
    error;
    FirstName;
    LastName;
    Email;
    BilingAddress=[];
    MobileNumber;
    AlternateNumber;
    HouseNo;
    confirmOrder=false;
    AddresBook;
    adressData;
    addId;
    IDs=[];

    placeOrder(event){
        console.log('inside place Order');
        for(let i=0;i<this.addedItem.length;i++){
            this.IDs.push(this.addedItem[i].Books_Details__r.Id)
         
        } 
        console.log('LogIds',this.IDs);
        placedOrder({addressData:this.addId,cartItem:this.IDs,orderAmount:this.totalAmount})
        .then(result=>{
        this.orderDetails=result;
        }) 
    }
 
    handleRadioChange(event){
        this.addId=event.target.value;
for(let i=0;i<this.AddresBook.length;i++){
    if(this.AddresBook[i].Id==event.target.value){
       this.adressData=this.AddresBook[i];
    break;
    }
   
}
    this.confirmOrder=true;
    this.isAddress =false; 
    
        
    }


    BuyOpen(){
        getAddress()
        .then(result=>{
        this.AddresBook=result;
        }) 
        this.openAdress(); 
        }


        openAdress(){
            if(this.AddresBook.length!==0){
               
                this.isAddress=true;
                console.log('>>>>>>>>>>>openAdress>>>>>>>>>',JSON.stringify(this.AddresBook));
                
            }
                else{
                    this.isBuyOpen =true;   
                    console.log('>>>>>>>>>>>openAdress>>>>>>>>>');
                  
                }
               
        }

        AddNewAdress(){
            this.isAddress=false;
            this.isBuyOpen =true; 
            
        }

    closeModalBox(){
        this.isAddress = false;
        this.isBuyOpen = false;
        
    }
    submitDetails(event){
        if(event.target.dataset.name ==='FirstName'){
            this.FirstName = event.target.value;
            console.log("FirstName============", this.FirstName);
        }
        else if(event.target.dataset.name ==='LastName'){
            this.LastName = event.target.value;
            console.log("LastName============", this.LastName);
        }
        else if(event.target.dataset.name ==='Email'){
            this.Email = event.target.value;
            console.log("Email============", this.Email);
        }
        else if(event.target.dataset.name ==='BilingAddress'){
            this.BilingAddress = event.target.value;
            console.log("BilingAddress============", this.BilingAddress);
        }
        else if(event.target.dataset.name ==='MobileNumber'){
            this.MobileNumber = event.target.value;
            console.log("MobileNumber============", this.MobileNumber);
        }
        else if(event.target.dataset.name === 'AlternateNumber'){
            this.AlternateNumber = event.target.value;
            console.log("AlternateNumber============", this.AlternateNumber);
        }
        else if(event.target.dataset.name === 'HouseNo'){
            this.HouseNo = event.target.value;
            console.log("HouseNo============", this.HouseNo);   
        }
        
    }
    saveAddress(){
        if(this.FirstName && this.LastName && this.Email && this.BilingAddress && this.MobileNumber && this.HouseNo){
 
        
         addAddress({FirstName:this.FirstName,LastName:this.LastName, Email:this.Email,BilingAddress:this.BilingAddress,MobileNumber:this.MobileNumber,AlternateNumber:this.AlternateNumber,HouseNo:this.HouseNo})
         .then(result=>{
             this.addressId = result.Id;
             console.log("addressId============", this.addressId);
             this.dispatchEvent(
                 new ShowToastEvent({
                     title: 'Success',
                     message: 'Address Saved',
                     variant: 'success'  
 
                 }),
             );
            console.log("result================", JSON.stringify(result));
         })
     
         .catch(error=>{
             this.error = error;
             this.dispatchEvent(new ShowToastEvent({
                 title: 'Error Creating Record',
                 message: error.body.message,
                 variant: 'error'
             }),
             );
             console.log("error=============", JSON.stringify(error));
         })
     }
     else{
         alert('fill all required fields')
     }
     }



}