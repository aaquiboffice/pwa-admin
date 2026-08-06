import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { environment } from "../../environments/environment";

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}
export interface Entry {
  _id: string;
  name: string;
  contactNumber: string;
  apartmentName: string;
  service: string;
  rationAction: string;
  epicNumber: string;
  aadharNumber: string;
  status: string;
}
export interface Count {
  service: string;
  rationAction: string;
  count: number;
}
export interface Dashboard {
  total: number;
  counts: Count[];
}
@Injectable({ providedIn: "root" })
export class AdminApiService {
  private http = inject(HttpClient);
  private key = "civicdesk-admin";
  private readonly apiBase = environment.apiBaseUrl;
  private headers() {
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` }),
    };
  }
  get token() {
    return JSON.parse(localStorage.getItem(this.key) || "null")?.token || "";
  }
  get admin(): Admin | null {
    return JSON.parse(localStorage.getItem(this.key) || "null")?.admin || null;
  }
  login(email: string, password: string) {
    return this.http
      .post<{
        token: string;
        admin: Admin;
      }>(`${this.apiBase}/admin/auth/login`, { email, password })
      .pipe(tap((x) => localStorage.setItem(this.key, JSON.stringify(x))));
  }
  logout() {
    localStorage.removeItem(this.key);
  }
  dashboard(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.apiBase}/admin/dashboard`, this.headers());
  }
  entries(): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${this.apiBase}/admin/entries`, this.headers());
  }
  update(id: string, entry: Entry) {
    return this.http.put<Entry>(
      `${this.apiBase}/admin/entries/${id}`,
      entry,
      this.headers(),
    );
  }
  remove(id: string) {
    return this.http.delete<void>(`${this.apiBase}/admin/entries/${id}`, this.headers());
  }
  createAdmin(payload: object) {
    return this.http.post(`${this.apiBase}/admin/users`, payload, this.headers());
  }
}
