import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './component/layouts/layouts.component';
import { HomeComponent } from './component/home/home.component';
import { CrewComponent } from './component/crew/crew.component';

const routes: Routes = [
  {
    path:"",
    component: LayoutsComponent,
    children:[
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "crew/:id",
        component: CrewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
