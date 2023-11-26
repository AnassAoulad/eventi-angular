import { Component, OnInit } from '@angular/core'
import {
  AbstractControl,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../core/services/auth.service'

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value
    const confirmPassword = control.get('confirmPassword')?.value

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true }
    } else {
      return null
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatchValidator() }
  )

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: NonNullableFormBuilder
  ) { }

  ngOnInit(): void { }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }

  get name() {
    return this.registerForm.get('name')
  }

  submit() {
    const { name, email, password } = this.registerForm.value

    if (!this.registerForm.valid || !name || !password || !email) {
      return
    }

    this.authService
      .register(email, password)
      .subscribe(() => {
        this.router.navigate(['/home'])
      })
  }
}
