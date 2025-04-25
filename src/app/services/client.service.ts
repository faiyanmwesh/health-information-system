import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';

const KEY = 'clients';
const ID = 'clients_next_id';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private nextId() {
    const n = parseInt(localStorage.getItem(ID) || '1',10);
    localStorage.setItem(ID, (n+1).toString());
    return n;
  }
  getAll(): Client[] {
    const d=localStorage.getItem(KEY);
    return d?JSON.parse(d):[];
  }
  saveAll(list: Client[]) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }
  add(c: Omit<Client,'id'|'createdAt'>) {
    const all = this.getAll();
    const cli: Client = { id:this.nextId(), createdAt:new Date().toISOString(), ...c };
    all.push(cli);
    this.saveAll(all);
    return cli;
  }
  update(u: Client) {
    this.saveAll(this.getAll().map(c=>c.id===u.id?u:c));
  }
  delete(id: number) {
    this.saveAll(this.getAll().filter(c=>c.id!==id));
  }
}
