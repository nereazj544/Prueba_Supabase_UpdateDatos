import { Routes } from '@angular/router';
import { AuthLogInComponent } from './auth/auth-login/auth-login.component';
import { SettingPerfilComponent } from './perfil/setting/setting-perfil/setting-perfil.component';

export const routes: Routes = [

    {path: 'login', component: AuthLogInComponent},
    { path: 'setting/setting-perfil', component: SettingPerfilComponent},


];
