import { api, LightningElement,track, wire} from 'lwc';
import deleteCartRecord from '@salesforce/apex/BookDetailHomePage.deleteCartRecord';
import addAddress from '@salesforce/apex/BookDetailHomePage.addAddress';
import getAddress from '@salesforce/apex/BookDetailHomePage.getAddress';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import {NavigationMixin} from 'lightning/navigation';
import { updateDataConnector } from 'lightning/analyticsWaveApi';
export default class Cartitem extends NavigationMixin(LightningElement){

    @api addedItem;
    @api remainingCart;
   @api saveLater=[];
    error;  
    FirstName;
    LastName;
    Email;
    BilingAddress;
    MobileNumber;
    AlternateNumber;
    HouseNo;
    sendData=[];
    changeaddeditem=[];
    array=[];
    totalsum=0;


    //To delete the kart items
    handledelete(event){
        let cartId = event.target.value;
        console.log("cartId===============", cartId);
        deleteCartRecord({deletedId:cartId})
        .then((result)=>{
                    console.log('Delete Book Id',result);
                    this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Address Saved',
                        variant: 'success'
                    }),
                    );
        }).catch(error=>{
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
   
    
        
    
     //To add extra quantity in kart
    increment(event){
       this.addedItem=JSON.parse(JSON.stringify(this.addedItem));
       console.log('stringify change item',this.changeaddeditem);  
       let tValue = event.target.value; 
       for(let i=0;i<this.addedItem.length;i++){  
            if(this.addedItem[i].Books_Details__r.Id == tValue){
                console.log('value===');
                console.log('this.added177',this.addedItem[i]);
                console.log('count ===',this.addedItem[i].count);
                console.log('this.Books_Details__r.stock__c',this.addedItem[i].Books_Details__r.stock__c);
                if(this.addedItem[i].count<this.addedItem[i].Books_Details__r.stock__c){
                    let updateCount=this.addedItem[i].count;
                    console.log('hi');
                    updateCount++;
                    console.log('update count ====',updateCount);
                
                    this.addedItem[i].count=updateCount;
                    console.log('change count -----------', this.addedItem[i].count);
                }
                else{
                    this.dispatchEvent(new ShowToastEvent({
                        title:'Availability',
                        message: 'Product is out of stock',
                        variant: 'info'
                    }))
                }  
            }
        }
    }

    
    //To remove Extra Quantity from kart
    decrement(event){
      this.addedItem=JSON.parse(JSON.stringify(this.addedItem));
      console.log('stringify change item',this.changeaddeditem);  
      let tValue = event.target.value; 
      for(let i=0;i<this.addedItem.length;i++){
        
          if(this.addedItem[i].Books_Details__r.Id == tValue){
                console.log('value===');
                console.log('this.added177',this.addedItem[i]);
                console.log('count ===',this.addedItem[i].count);
                let updateCount=this.addedItem[i].count;
                    if(updateCount==1){
                        break;
                    }
                    else{
                        updateCount--;
                        console.log('update count ====',updateCount);
                    
                        this.addedItem[i].count=updateCount;
                        console.log('change count -----------', this.addedItem[i].count);
                    }
            }
       }
    }



    //To remove checked item from kart for buy later
    saveLaterRecordCart(event){
            if(event.target.checked){
            console.log('inside true');
                for(let i=0;i<this.addedItem.length;i++){
                console.log('inside for');
                    if(this.addedItem[i].Books_Details__r.Id==event.target.value){
                        console.log('inside if true');
                        this.saveLater.push(this.addedItem[i]);
                        console.log(JSON.stringify(this.saveLater));
                        console.log('length',this.saveLater.length);
                        break;
                    }
                }

             }
           else{
                for(let i=0;i<this.saveLater.length;i++){
                    if(this.saveLater[i].Books_Details__r.Id==event.target.value){
                        console.log(JSON.stringify(this.saveLater));
                        this.saveLater.splice(i,1);
                        console.log('Save it later=======',JSON.stringify(this.saveLater));
                        console.log('length',this.saveLater.length);
                        break;
                    }
                }
            }
        if(event.target.checked){
                    if(this.createcart==true){
                        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>0000000000000000000');
                        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>1111111');
                        this.sendData=this.addedItem;
                        this.createcart=false;
                    }

                    for(let i=0;i<this.sendData.length;i++){
                        if(this.sendData.Books_Details__r.Id==event.target.value){
                        this.sendData.splice(i,1);
                        }
                    }
                console.log('ontherWay',this.sendData.length);
          }
     }


    // checkout button for the placed order 
    checkout(event){
            console.log(this.remainingCart);
            for(let i=0;i<this.addedItem.length;i++){
                    var price=this.addedItem[i].Books_Details__r.Price__c;
                    console.log(price);
                    var quan=this.addedItem[i].count;
                    console.log(this.quan);
                    var tp=price*quan;
                    this.totalsum=this.totalsum+tp;
                    console.log('this.totalsum',this.totalsum);
                    console.log(tp);
                    var pair = {totalPrice:tp};
                    this.array[i]={...this.addedItem[i], ...pair};
                    console.log('this is array',JSON.stringify(this.array[i]));
            }
                this.addedItem=this.array;
                    let componentDef = {
                    componentDef: "c:checkOut",
                        attributes: {   
                        addedItem:this.addedItem,
                        totalAmount:this.totalsum
                        }
                    };
            // Encode the componentDefinition JS object to Base64 format to make it url addressable
        let encodedComponentDef = btoa(JSON.stringify(componentDef));
        console.log('encode',JSON.stringify(encodedComponentDef))
        this[NavigationMixin.Navigate]({
        type: 'standard__webPage',
        attributes: {
        url: '/one/one.app#' + encodedComponentDef
        }
        });
    }

}