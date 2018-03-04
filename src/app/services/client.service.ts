import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Client } from '../models/clients';

@Injectable()
export class ClientService {
  clients: AngularFireList<any[]>;
  client: AngularFireObject<any>;

  constructor(
    public afd: AngularFireDatabase
  ) {
    this.clients = this.afd.list('/clients') as AngularFireList<Client[]>;
  }

  // Get All Clients
  getClients() {
    return this.clients;
  }

  // Add New Client
  addNewClient( client: any ) {
    this.clients.push(client);
  }
  // Get Single Client
  getClient(id: string) {
    this.client = this.afd.object('/clients/' + id) as AngularFireObject<Client>;
    return this.client;
  }

  // Update Single Client
  updateClient(id: string, client: any) {
    this.clients.update(id, client);
  }

  // Delete Client
  deleteClient(id: string) {
    return this.clients.remove(id);
  }
}
