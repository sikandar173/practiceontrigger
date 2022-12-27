import { LightningElement,track} from 'lwc';
import forLoginPage from '@salesforce/apex/LoginHandler.forLoginPage';
export default class LoginPage extends (LightningElement) {
    username;
    password;
    errorCheck;
    errorMessage;
    error;
    passwordType = 'password';

    handleLogin(event){
      if(this.username && this.password)
      {
        event.preventDefault();
        forLoginPage({ username: this.username, password: this.password })
            .then((result) => {
                window.location.href = result;  
            })
            .catch((error) => {
                this.error = error;      
                this.errorCheck = true;
                this.errorMessage ='Incorrect Username or Password';
            });
      }  
    }
    
    emailHandler(event){
      this.username=event.target.value;
    }


    passwordHandler(event){
       this.password=event.target.value; 
    }


    checkboxhandler(event){
      this.passwordType = event.target.checked ? 'text':'password';
    }
      
}