import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/clients';
import { FlashMessagesService } from 'angular2-flash-messages';
import { timeout } from 'q';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Tree } from '@angular/router/src/utils/tree';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    name: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnAdd: boolean = true;

  constructor(
    public clientService: ClientService,
    public angularFlashMsg: FlashMessagesService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onsubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      this.angularFlashMsg.show('From Validation Failed! Please Try again.',
        { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['addClient']);
    } else {
      this.clientService.addNewClient(value);
      this.angularFlashMsg.show('New Client Added.',
        { cssClass: 'alert-success', timeout: 3000 });
      this.router.navigate(['/']);
    }
  }

}
