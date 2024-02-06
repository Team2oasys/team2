import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "./user";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
  })
  export class Register {
    registerForm: FormGroup;
    passwordFieldType: string = 'password';
    showAlert: boolean = false;
    alertMessage: string = '';
    usernameField: any; // Replace 'any' with the appropriate type
    passwordField: any;
  
    constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) {
      this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.validateUsername]],
        password: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(12), this.validatePassword]]
      });
    }
  
    validateUsername(control: FormControl) {
      const value = control.value;
      const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
      if (value && (!usernameRegex.test(value) || value.length < 8 || value.length > 20)) {
        return { invalidUsername: true };
      }
      return null;
    }
  
    validatePassword(control: FormControl) {
      const value = control.value;
      const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]*$/;
      if (value && (value.length < 8 || !passwordRegex.test(value))) {
        return { invalidPassword: true };
      }
      return null;
    }
  
    onSubmit() {
      if (this.registerForm.valid) {
        const user: User = {
          id: this.registerForm.value.id,
          username: this.registerForm.value.username,
          password: this.registerForm.value.password
        };
        this.userService.postData(user).subscribe(
          (data: any) => {
            alert("Your Account Has Been Opened");
            console.log('User registration successful:', data);
            this.router.navigate([""]);
          },
          (error) => {
            this.showAlert = true;
            this.alertMessage = 'An error occurred during registration. Please try again.';
            console.error('Registration failed:', error);
          }
        );
      } else {
        console.log('Form not submitted. Invalid data.');
      }
    }
  
    goToLogin() {
      this.router.navigate([""]);
    }
  
    togglePasswordVisibility(): void {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }
  }
  
   postData(user:User){
     return this.http.post<User>(`${this.url}register`,user);
    }


