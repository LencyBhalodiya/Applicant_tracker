import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from 'src/app/shared/material-design/material-design.module';
import { ColorPipe } from './services/color.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReportsComponent } from './reports.component';
import {MatTableModule} from '@angular/material/table';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    ReportsComponent,
    SearchBarComponent,
    ColorPipe
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    NgxPaginationModule,
    MatTableModule
  ],
  exports:[SearchBarComponent]
})
export class ReportsModule {}