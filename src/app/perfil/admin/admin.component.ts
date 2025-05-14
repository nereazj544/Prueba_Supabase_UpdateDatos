import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShowService } from '../../service/show.service';
import { SupabaseService } from '../../service/supabase.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  id = '';
  username = '';
  imagen_perfil = '';
  banner = '';
  presentacion = '';
  genero = '';
  location = '';

  constructor(
    private showService: ShowService,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit() {
    const userId = await this.supabaseService.getCurrentUserId();
    if (!userId) {
      console.error('No hay usuario autenticado');
      return;
    }
    this.id = userId;
    const { data, error } = await this.showService.getUserProfileById(this.id);
    if (error) {
      console.error('Error al obtener perfil:', error);
      return;
    }
    this.username = data.username;
    this.imagen_perfil = data.imagen_perfil;
    this.banner = data.banner;
    this.presentacion = data.presentacion;
    this.genero = data.genero;
    this.location = data.location;
  }
}
