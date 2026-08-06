import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import {
  AdminApiService,
  Count,
  Dashboard,
} from "../../core/admin-api.service";
@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private api = inject(AdminApiService);
  private router = inject(Router);
  readonly admin = this.api.admin;
  readonly dashboard = signal<Dashboard>({ total: 0, counts: [] });
  readonly error = signal("");
  readonly services = [
    ["ration-card", "New Ration Card"],
    ["election-card", "Election Card"],
    ["abha-card", "ABHA Card"],
    ["ayushman-card", "Ayushman Card"],
    ["domicile", "Domicile Certificate"],
    ["income", "Income Certificate"],
    ["residence", "Residence Certificate"],
    ["caste", "Caste Certificate"],
  ];
  readonly actions = [
    ["new", "New"],
    ["add", "Name Addition"],
    ["delete", "Name Deletion"],
    ["online", "Online"],
    ["renew", "Renewal"],
  ];
  ngOnInit() {
    if (!this.api.token) {
      this.router.navigateByUrl("/login");
      return;
    }
    this.api
      .dashboard()
      .subscribe({
        next: (value) => this.dashboard.set(value),
        error: () => this.error.set("Dashboard could not be loaded."),
      });
  }
  count(service: string, action = "") {
    return (
      this.dashboard().counts.find(
        (item: Count) =>
          item.service === service && item.rationAction === action,
      )?.count || 0
    );
  }

  logout() {
    this.api.logout();
    this.router.navigateByUrl("/login");
  }
}
