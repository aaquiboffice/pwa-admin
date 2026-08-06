import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminApiService, Entry } from '../../core/admin-api.service';
import { ZardTableImports } from '../../shared/components/table/table.imports';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [FormsModule, RouterLink, ZardTableImports],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordsComponent implements OnInit {
  private readonly api = inject(AdminApiService);
  private readonly router = inject(Router);

  readonly admin = this.api.admin;
  readonly entries = signal<Entry[]>([]);
  readonly error = signal('');
  readonly editing = signal('');
  readonly draft = signal<Entry | null>(null);
  readonly services = [
    ['ration-card', 'New Ration Card'],
    ['election-card', 'Election Card'],
    ['abha-card', 'ABHA Card'],
    ['ayushman-card', 'Ayushman Card'],
    ['domicile', 'Domicile Certificate'],
    ['income', 'Income Certificate'],
    ['residence', 'Residence Certificate'],
    ['caste', 'Caste Certificate'],
  ];
  readonly actions = [
    ['new', 'New'],
    ['add', 'Name Addition'],
    ['delete', 'Name Deletion'],
    ['online', 'Online'],
    ['renew', 'Renewal'],
  ];

  ngOnInit(): void {
    if (!this.api.token) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.load();
  }

  load(): void {
    this.error.set('');
    this.api.entries().subscribe({
      next: value => this.entries.set(value),
      error: () => this.error.set('Records could not be loaded.'),
    });
  }

  label(value: string): string {
    return this.services.find(item => item[0] === value)?.[1] || value;
  }

  action(value: string): string {
    return this.actions.find(item => item[0] === value)?.[1] || '—';
  }

  edit(row: Entry): void {
    this.editing.set(row._id);
    this.draft.set({ ...row });
    this.error.set('');
  }

  setDraftField(field: keyof Entry, value: string): void {
    const current = this.draft();
    if (!current || field === '_id') return;
    this.draft.set({ ...current, [field]: value });
  }

  cancel(): void {
    this.editing.set('');
    this.draft.set(null);
  }

  update(): void {
    const current = this.draft();
    if (!current) return;
    this.error.set('');
    this.api.update(current._id, current).subscribe({
      next: () => {
        this.cancel();
        this.load();
      },
      error: error => this.error.set(error.error?.message || 'Update failed.'),
    });
  }

  delete(row: Entry): void {
    if (!confirm(`Delete ${row.name}?`)) return;
    this.api.remove(row._id).subscribe({
      next: () => this.load(),
      error: () => this.error.set('Delete failed.'),
    });
  }

  logout(): void {
    this.api.logout();
    this.router.navigateByUrl('/login');
  }
}
