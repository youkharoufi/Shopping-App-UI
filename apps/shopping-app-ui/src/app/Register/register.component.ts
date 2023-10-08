import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountFacade, RegisterUser } from '@shopping-app-ui/store';

@Component({
  selector: 'shopping-app-ui-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  registerUser: RegisterUser = {
  email:'',
  userName:'',
  addressLineOne:'',
  addressLineTwo:'',
  city:'',
  state:'',
  country:'',
  zipPostalCode:'',
  dateOfBirth:undefined,
  firstname:'',
  homePhone:'',
  lastname:'',
  mobilePhone:'',
  title:'',
  password:'',
  };

  passwordConfValue!: string;
  passwordsDontMatch = false;

  registerForm!:NgForm;

  constructor(private accountFacade: AccountFacade, private router: Router){}


  ngOnInit(): void{
    const states = document.querySelectorAll('select#state option') as NodeListOf<HTMLOptionElement>;
    console.log(states);

    states.forEach((state: HTMLOptionElement)=>{
      state.value = state.textContent!;
    })
  }


  register(){
    this.accountFacade.register(this.registerUser);
    setTimeout(()=>{
      this.router.navigateByUrl("/");
    },2000);
  }

  checkPasswordsMatch(password: string, passwordConf: string): void {
    this.passwordsDontMatch = password !== passwordConf;
  }
}
