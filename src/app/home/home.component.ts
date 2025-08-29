import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from '../Services/permission/permission.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  showBitacoraOptions = false;
  showAjustesOptions = false;
  showClass = false;
  showTeacherLog = false;
  showCategorias = false;
  showZones = false;
  showIssues = false;
  showStudentlog = false;

  constructor(private permissionService: PermissionService) {
    this.showClass = this.permissionService.canAccessScreen('/classes');
    this.showTeacherLog = this.permissionService.canAccessScreen('/teacherlog');
    this.showCategorias = this.permissionService.canAccessScreen('/categorias');
    this.showZones = this.permissionService.canAccessScreen('/zones');
    this.showIssues = this.permissionService.canAccessScreen('/issues');
    this.showStudentlog = this.permissionService.canAccessScreen('/studentlog');
  }

  toggleBitacoraOptions() {
    this.showBitacoraOptions = !this.showBitacoraOptions;
    this.showAjustesOptions = false;
  }

  toggleAjustesOptions() {
    this.showAjustesOptions = !this.showAjustesOptions;
    this.showBitacoraOptions = false;
  }
}
