import { LightningElement } from 'lwc';
import 	salesforceImage	  from "@salesforce/resourceUrl/salesforceImage";

export default class BingeItHomePage extends LightningElement 
{
    //logo taken from the static resource file
    bookImage = salesforceImage + '/Salesforce/Book.jpg';
    watchImage = salesforceImage + '/Salesforce/Watch.jpg';
}