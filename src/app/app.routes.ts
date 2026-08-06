import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { RecordsComponent } from "./pages/records/records.component";
import { UsersComponent } from "./pages/users/users.component";
import { LayoutComponent } from "./layout/layout.component";
export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent, title: "CivicDesk Admin Login" },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        title: "CivicDesk Admin Dashboard",
      },
      { path: "records", component: RecordsComponent, title: "CivicDesk Records" },
      { path: "users", component: UsersComponent, title: "CivicDesk Admin Users" },
    ],
  },
  { path: "**", redirectTo: "login" },
];
