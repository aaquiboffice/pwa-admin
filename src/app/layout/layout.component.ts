import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminApiService } from '../core/admin-api.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  private readonly api = inject(AdminApiService);
  private readonly router = inject(Router);
  isMobile = window.innerWidth < 768;
  readonly mobileSidebarOpen = signal(false);

  @HostListener('window:resize')
  onResize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth < 768;
    if (wasMobile !== this.isMobile && !this.isMobile) {
      this.mobileSidebarOpen.set(false);
    }
  }

  toggleSidebar() {
    this.mobileSidebarOpen.set(!this.mobileSidebarOpen());
  }

  closeSidebar() {
    if (this.isMobile) {
      this.mobileSidebarOpen.set(false);
    }
  }

  onMenuItemClick() {
    if (this.isMobile) {
      this.mobileSidebarOpen.set(false);
    }
  }

  logout() {
    this.api.logout();
    this.router.navigateByUrl('/login');
  }
}
