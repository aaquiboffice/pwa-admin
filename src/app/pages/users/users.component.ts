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
import { Router, RouterLink } from "@angular/router";
import { AdminApiService } from "../../core/admin-api.service";
@Component({
  selector: "app-users",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: "./users.component.html",
  styleUrl: "./users.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private fb = inject(NonNullableFormBuilder);
  private api = inject(AdminApiService);
  private router = inject(Router);
  admin = this.api.admin;
  notice = signal("");
  error = signal("");
  form = this.fb.group({
    name: this.fb.control("", Validators.required),
    email: this.fb.control("", [Validators.required, Validators.email]),
    password: this.fb.control("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  create() {
    if (this.form.invalid || this.admin?.role !== "super-admin") {
      this.form.markAllAsTouched();
      return;
    }
    this.api
      .createAdmin({
        ...this.form.getRawValue(),
        permissions: [
          "dashboard:read",
          "entries:read",
          "entries:update",
          "entries:delete",
        ],
      })
      .subscribe({
        next: () => {
          this.notice.set("Admin user created successfully.");
          this.form.reset();
        },
        error: () => this.error.set("Could not create Admin user."),
      });
  }
  logout() {
    this.api.logout();
    this.router.navigateByUrl("/login");
  }
}
