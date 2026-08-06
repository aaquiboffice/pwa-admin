import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
export type ZardTableType = 'default' | 'striped' | 'bordered';
export type ZardTableSize = 'default' | 'compact' | 'comfortable';
@Component({selector:'table[z-table]',standalone:true,template:'<ng-content />',changeDetection:ChangeDetectionStrategy.OnPush,encapsulation:ViewEncapsulation.None,host:{'[class]':'classes()'},exportAs:'zTable'})
export class ZardTableComponent { readonly zType=input<ZardTableType>('default'); readonly zSize=input<ZardTableSize>('default'); protected readonly classes=computed(() => `zard-table zard-table-${this.zType()} zard-table-${this.zSize()}`); }
@Component({selector:'thead[z-table-header]',standalone:true,template:'<ng-content />',host:{class:'zard-table-header'},exportAs:'zTableHeader'}) export class ZardTableHeaderComponent {}
@Component({selector:'tbody[z-table-body]',standalone:true,template:'<ng-content />',host:{class:'zard-table-body'},exportAs:'zTableBody'}) export class ZardTableBodyComponent {}
@Component({selector:'tr[z-table-row]',standalone:true,template:'<ng-content />',host:{class:'zard-table-row'},exportAs:'zTableRow'}) export class ZardTableRowComponent {}
@Component({selector:'th[z-table-head]',standalone:true,template:'<ng-content />',host:{class:'zard-table-head'},exportAs:'zTableHead'}) export class ZardTableHeadComponent {}
@Component({selector:'td[z-table-cell]',standalone:true,template:'<ng-content />',host:{class:'zard-table-cell'},exportAs:'zTableCell'}) export class ZardTableCellComponent {}
@Component({selector:'caption[z-table-caption]',standalone:true,template:'<ng-content />',host:{class:'zard-table-caption'},exportAs:'zTableCaption'}) export class ZardTableCaptionComponent {}
