import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class UserPreferencesService {
  private keys = {
    scale: 'scale',
  };

  constructor() {}

  async setScale(value: string): Promise<void> {
    const { Storage } = Plugins;
    Storage.set({ key: this.keys.scale, value });
  }

  async getScale(): Promise<string> {
    const { Storage } = Plugins;
    const { value } = await Storage.get({ key: this.keys.scale });
    return value || 'F';
  }
}
