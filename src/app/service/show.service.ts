import { inject, Injectable } from "@angular/core";
import { SupabaseService } from "./supabase.service";



@Injectable({ providedIn: 'root' })
export class ShowService {
    private _supabaseClient = inject(SupabaseService).supabaseClient;

    getUserProfileById(id: string){
        return this._supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single();
    }


}
