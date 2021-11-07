import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { patternValidator } from '../helpers/custom-validators';
import { MustMatch } from '../helpers/must-match.validator';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private service: LoginService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required,
      Validators.minLength(8),
      patternValidator(/\d/, { hasNumber: true }),
      patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      patternValidator(/[a-z]/, { hasSmallCase: true }),
      ]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    this.loadProfile();
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  loadProfile() {
    const user = JSON.parse(localStorage.getItem('user') || "[]");
    this.form.patchValue(user);
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.service.update(this.form.value).subscribe(data => {
      if (data) {
        this.toastr.success('PokeDex', 'Your profile have been updated.');
      }
    });
  }
}
