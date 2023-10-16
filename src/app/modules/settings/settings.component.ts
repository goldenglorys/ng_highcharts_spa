import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  displayedColumns: string[] = ['serial', 'chart', 'edit'];
  dataSource!: MatTableDataSource<string>;
  constructor(public dialog: MatDialog) {
    const chartData: any = localStorage.getItem('chartList');
    this.dataSource = new MatTableDataSource(JSON.parse(chartData));
  }
  openDialog(operation: string, chartTitle?: string) {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      data: { operation, chartTitle },
    }); 
    dialogRef.afterClosed().subscribe((result: string[]) => {
      this.dataSource = new MatTableDataSource(result);
    });
  }
}
