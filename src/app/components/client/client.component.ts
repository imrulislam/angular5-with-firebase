import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/clients';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: any;
  totalOwed: number;


  constructor(
    public clientService: ClientService
  ) { }

  ngOnInit() {
    this.clientService.getClients().snapshotChanges().map(
      client => {
        this.clients = client.map((data) => {
          const obj = <Client>data.payload.val();
          obj.$key = data.key;
          return obj;
        });
        this.getTotalOwed();
        return client;
      }
    ).toPromise();
  }

  getTotalOwed() {
    let total = 0;
    for (let i = 0; i < this.clients.length; i++) {
      total += parseFloat(this.clients[i].balance);
    }
    this.totalOwed = total;
  }

}
