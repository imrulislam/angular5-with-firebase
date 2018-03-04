import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/clients';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    name: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnEdit: boolean = true;

  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.clientService.getClient(this.id).valueChanges().subscribe(client => {
      this.client = client;
    });
  }

  onsubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('From Validation Failed! Please Try again.',
        { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['edit-client' + this.id]);
    } else {
      this.clientService.updateClient(this.id, value);
      this.flashMessages.show('Client Updated.',
        { cssClass: 'alert-success', timeout: 3000 });
      this.router.navigate(['/client/' + this.id]);
    }
  }

}
