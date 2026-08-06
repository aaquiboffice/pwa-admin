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
import { AdminApiService } from "../core/admin-api.service";
@Component({
  selector: "app-admin-login",
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `<main class="login">
    <div class="brand">
      <b>CD</b><small>CIVICDESK ADMIN</small>
      <h1>Manage every service<br /><i>with clarity.</i></h1>
    </div>
    <form class="card" [formGroup]="form" (ngSubmit)="submit()">
      <small>ADMIN PORTAL</small>
      <h2>Welcome back</h2>
      <p>Sign in to manage submitted records.</p>
      <label
        >Email<input
          type="email"
          formControlName="email"
          placeholder="admin@example.com" /></label
      ><label
        >Password<input
          type="password"
          formControlName="password"
          placeholder="Password"
      /></label>
      @if (error()) {
        <em>{{ error() }}</em>
      }
      <button [disabled]="loading()">
        {{ loading() ? "Signing in…" : "Sign in" }} <span>→</span>
      </button>
    </form>
  </main>`,
  styles: [
    `
      .login {
        min-height: 100dvh;
        max-width: 1080px;
        margin: auto;
        padding: 30px;
        display: grid;
        grid-template-columns: 1fr 380px;
        gap: 90px;
        align-items: center;
      }
      .brand b {
        display: grid;
        place-items: center;
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: #0d7469;
        color: #fff;
      }
      .brand small,
      .card > small {
        display: block;
        margin-top: 25px;
        color: #d18450;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.16em;
      }
      .brand h1 {
        margin: 18px 0;
        color: #173f39;
        font-size: clamp(42px, 6vw, 68px);
        line-height: 1.02;
      }
      .brand i {
        color: #d18450;
      }
      .card {
        padding: 34px;
        background: #fff;
        border: 1px solid #dfeae6;
        border-radius: 20px;
        box-shadow: 0 18px 50px #1c594512;
      }
      .card h2 {
        margin: 20px 0 8px;
      }
      .card p {
        color: #80918d;
        font-size: 13px;
      }
      .card label {
        display: block;
        margin: 22px 0 0;
        font-size: 11px;
        font-weight: 700;
      }
      .card input {
        display: block;
        width: 100%;
        height: 44px;
        margin-top: 8px;
        padding: 0 12px;
        border: 1px solid #d5e4df;
        border-radius: 8px;
      }
      .card em {
        display: block;
        color: #c36054;
        font-size: 11px;
        margin-top: 15px;
      }
      .card button {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 44px;
        margin-top: 22px;
        border: 0;
        border-radius: 8px;
        background: #0d7469;
        color: #fff;
        padding: 0 14px;
        font-weight: 700;
      }
      @media (max-width: 700px) {
        .login {
          display: block;
          padding: 35px 18px;
        }
        .brand {
          margin-bottom: 40px;
        }
        .card {
          padding: 28px 22px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private api = inject(AdminApiService);
  private router = inject(Router);
  loading = signal(false);
  error = signal("");
  form = this.fb.group({
    email: this.fb.control("", [Validators.required, Validators.email]),
    password: this.fb.control("", Validators.required),
  });
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
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
