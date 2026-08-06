import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() menuClick = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  readonly menu: MenuItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: '▦' },
    { label: 'Records', route: '/records', icon: '☷' },
    { label: 'Users', route: '/users', icon: '♙' },
  ];

  onMenuSelect() {
    this.menuClick.emit();
  }

  onLogout() {
    this.logout.emit();
  }
}
