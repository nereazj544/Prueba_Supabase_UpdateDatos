import { Injectable } from "@angular/core";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { environment } from "../env/environment.development";
import { from } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SupabaseService {
    supabaseClient: SupabaseClient;
    private userActual: any = null;

    constructor() {
        this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
        this.cargarUsuario();
    }

    async cargarUsuario() {
        const { data: { user }, error } = await this.supabaseClient.auth.getUser();
        if (user) {
            const { data, error } = await this.supabaseClient
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            if (data) {
                this.userActual = data;
                console.log('Usuario cargado:', this.userActual);
            }
        }
    }

    getUsuario() {
        return this.userActual;
    }

    async updateUserProfile(id: string, profileData: any) {
        try {
            const { data, error } = await this.supabaseClient
                .from('profiles')
                .update(profileData)
                .eq('id', id);

            if (error) {
                throw error;
                console.log('Error al actualizar el perfil:', error);
            }

            console.log('Perfil actualizado:', data);
            return data;
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            throw error;
        }


    }



    async getUserProfileById(id: string) {
        return await this.supabaseClient
            .from('profiles')
            .select('*')
            .eq('username', id)
            .single();
    }
    async getCurrentUserId(): Promise<string | null> {
        const { data, error } = await this.supabaseClient.auth.getUser();
        if (error || !data.user) return null;
        return data.user.id;
    }

};