import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetAllComponent } from './get-all/get-all.component';
import { PostComponent } from './post/post.component';
import { GetByIdComponent } from './get-by-id/get-by-id.component';
import { UpdateComponent } from './update/update.component';
import { DeleteByIdComponent } from './delete-by-id/delete-by-id.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"regi",component:RegisterComponent},
  {path:"get",component:GetAllComponent},
  {path:"post",component:PostComponent},
  {path:"getById/:id",component:GetByIdComponent},
  {path:"update/:id",component:UpdateComponent},
  {path:"delete/:id",component:DeleteByIdComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
