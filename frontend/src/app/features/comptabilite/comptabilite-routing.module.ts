import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComptabiliteComponent } from './comptabilite.component';

const routes: Routes = [
  { path: '', component: ComptabiliteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComptabiliteRoutingModule {}
