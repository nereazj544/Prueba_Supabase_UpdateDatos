import { Routes } from '@angular/router';
import { AuthLogInComponent } from './auth/auth-login/auth-login.component';
import { SettingPerfilComponent } from './perfil/setting/setting-perfil/setting-perfil.component';
import { AdminComponent } from './perfil/admin/admin.component';

export const routes: Routes = [

    {path: 'login', component: AuthLogInComponent},

    { path: 'perfil/admin', component: AdminComponent},
    { path: 'setting/setting-perfil', component: SettingPerfilComponent},


];
