import {LightningElement, api,track, wire } from 'lwc';
import fetchingBooksData from '@salesforce/apex/BookDetailHomePage.fetchingBooksData';
import insertDataIntoCart from '@salesforce/apex/BookDetailHomePage.insertDataIntoCart';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import fetchCartItem from '@salesforce/apex/BookDetailHomePage.fetchCartItem';
import { refreshApex } from '@salesforce/apex';

export default class BookDetailPage extends LightningElement{
    @track cartbox=true;
    isShowModal = false;
    isCartModal = false;
    bookData=[];
    addCart=[];
    error;
    bookDetail;
    cartDetails = [];
    cartLength = 0;
    @api addedItem;
    @api itemPresentInCart;
    error;
    changeBookData=[];
    searchValue = '';
    cartThere;
    @api remainingCart=[];
    @api cartItem=[];
    changecartItem=[];


    fetchValue(event){

        console.log(event.detail);
    
    }


    searchKeyword(event) {
        this.searchValue = event.target.value;
        console.log('-----------search-----------',this.searchValue);
    }
   

    //To fetch records from cart object
    @wire(fetchCartItem)
    wiredCart({data, error}){
        if(data){
            this.addedItem = data;
            console.log('added item -----------45',this.addedItem);
            this.remainingCart = this.addedItem;
            console.log('remaining cart======47',this.remainingCart);
            this.cartItem = this.remainingCart
                for(var i=0;i<this.cartItem.length;i++){
                var pair = {count: 1};
                this.changecartItem[i]={...this.cartItem[i], ...pair};
                console.log('change item ==========52',JSON.stringify(this.changecartItem));
                // this.cartItem[i]=JSON.stringify(this.changecartItem);
                }
            this.cartLength=this.addedItem.length;
            this.addedItem=this.changecartItem;
            console.log('cart item ============update',this.addedItem);
        }
        else if(error){
            this.error = error;
            this.error = undefined;
            console.log("error=================", JSON.stringify(error));
        }
    }
    

    //To fetch records from bookdetails object
    @wire(fetchingBooksData) 
    fetchingData({data, error}){
        if(data){
            this.bookData = data;  
            for(var i=0;i<this.bookData.length;i++){
                if( this.bookData[i].stock__c==0){
                    var pair = {message: "out of stock"};
                    this.changeBookData[i]={...this.bookData[i], ...pair};                     
                }
                else if (this.bookData[i].stock__c>0 && this.bookData[i].stock__c<5) {
                    var pair = {message: "few left "};
                    this.changeBookData[i]={...this.bookData[i], ...pair};                      
                }
                else {
                    var pair={message:" "}
                    this.changeBookData[i]={...this.bookData[i], ...pair};                  
                }                             
            }
            this.bookData=this.changeBookData
            this.error = undefined;      
        }
        else if (error){
            this.error = error;
            this.error = undefined;
        }
    }
    

    //After clicking on any items to showing details of items
    showModalBox(event){
        this.bookid = event.target.dataset.id;
        console.log(event.target.dataset.id,'Book id');
        for(let i=0; i<this.bookData.length; i++){
            if(this.bookData[i].Id===event.target.dataset.id){
            this.bookDetail = this.bookData[i];
            console.log("elements==========", JSON.stringify(this.bookDetail));
            break;
            }
        }
        this.isShowModal = true;
        console.log("bookDetail===========",JSON.stringify(this.bookDetail));
    }


   //To insert Items into the cart
    handleAddToCart(event){
        console.log('============inhandlecart==============');
        this.bookid = event.target.dataset.id;  
        console.log('in book id check stock',this.bookid);
            for(let i=0;i<this.addedItem.length;i++){
                if(this.addedItem[i].Books_Details__r.Id == this.bookid ){
                alert('alreday added to an cart');
                this.cartThere=false;
                break;         
                }
            }
        if(this.cartThere==true){
            insertDataIntoCart({cartId:this.bookid})
            .then(result=>{
                console.log("bookid==================", this.bookid );
                console.log("beforeresult=====================", JSON.stringify(result));
                // cartItem=result;
                console.log('return result from apex',this.cartItem);      
                console.log("cartitem=====================", JSON.stringify(cartItem));
                this.dispatchEvent(new ShowToastEvent({
                    title:'Success',
                    message: 'Product Added in Cart',
                    variant: 'success'
                }))           
                this.error = undefined;
                refreshApex(this.data);
            })
            .catch(error=>{
                this.error = error;
                this.error = undefined;
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error Creating Record',
                    message: error.body.message,
                    variant: 'error'
                }),
                );
                console.log("error=============", JSON.stringify(error));
            });
            console.log("cartlength=============.jklhkhkhkgj==", this.addCart.length);
            console.log("cartItem===============", JSON.stringify(this.addCart));
            console.log('CartLength-------------',this.cartLength);
            this.cartLength ++;
        }
        else{
            this.cartThere=true;
        }
    }

   
    
    hideModalBox(){
        this.isShowModal = false;
        this.isCartModal = false;
    }
    CartModalBox(){
        console.log('cart model is true');
        console.log('cart is true ort not',this.isCartModal);
        this.isCartModal = true;
        console.log('cart is true ort not',this.isCartModal);
    }
    
}