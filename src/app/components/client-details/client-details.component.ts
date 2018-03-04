import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/clients';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;


  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    // Get Client
    this.clientService.getClient(this.id).valueChanges().subscribe(client => {
      if (client.balance > 0) {
        this.hasBalance = true;
      }
      this.client = client;
    });
  }

  updateBalance(id: string) {
    // Update Client
    this.clientService.updateClient(this.id, this.client);
    this.flashMessages.show( 'Balance Updated', {cssClass: 'alert-success', timeout: 4000} );
    this.showBalanceUpdateInput = false;
    this.router.navigate(['/client/' + this.id]);
  }

  onDeleteClick() {
    if ( confirm('Are You sure to delete this client??') ) {
      this.clientService.deleteClient(this.id);
      this.flashMessages.show( 'Client Deleted', {cssClass: 'alert-success', timeout: 4000} );
      this.router.navigate(['']);
    }
  }

}
