import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ProfileService } from '../../service/profile.service';
interface LoginForm {
  email: FormControl<null | string>;
  password: FormControl<null | string>;
}
@Component({
  selector: 'app-auth-log-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})



export class AuthLogInComponent {
  private _formBuilder = inject(FormBuilder);
  private _authServide = inject(AuthService);
  private _userService = inject(UserService);
  private _profileService = inject(ProfileService);

  form = this._formBuilder.group({
    email: this._formBuilder.control(null, [Validators.required, Validators.email]),
    password: this._formBuilder.control(null, [Validators.required]),
    role: this._formBuilder.control('user', [Validators.required]),
  })

  async submit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    const { data, error } = await this._authServide.loginIn({
      email: email ?? '',
      password: password ?? '',
    });

    if (error || !data.session) {
      console.error('Error al iniciar sesión', error);
      return;
    }

    const userId = data.user.id;

    // Obtener el perfil del usuario desde 'profiles'
    const { data: profileData, error: profileError } = await this._authServide.supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('No se pudo obtener el perfil:', profileError);
      return;
    }

    console.log('Usuario logueado con rol:', profileData.role);
    this._userService.setUserRole({ rol: profileData.role });
    this._profileService.redirectToProfileBasedOnRole(); // Redirigir según el rol
  }

}
