import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AdminApiService } from "../../core/admin-api.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly api = inject(AdminApiService);
  private readonly router = inject(Router);
  readonly loading = signal(false);
  readonly error = signal("");
  readonly form = this.formBuilder.group({
    email: this.formBuilder.control("", [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control("", Validators.required),
  });
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set("");
    this.api
      .login(this.form.controls.email.value, this.form.controls.password.value)
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.router.navigateByUrl("/dashboard");
        },
        error: () => {
          this.loading.set(false);
          this.error.set("Invalid email or password.");
        },
      });
  }
}
