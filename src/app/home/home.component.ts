import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DefaultButtonComponent } from '../components/default-button/default-button.component';
import { Button } from '../interfaces/button.interface';
import { ButtonActionsService } from '../services/button-actions/button-actions.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DefaultButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private subscription!: Subscription;

  constructor(private buttonActions: ButtonActionsService) { }

  groupEnabled: boolean = false;

  modeButtons: Button[] = [
    { buttonText: 'Gravar', buttonValue: 'read', buttonType: 'mode' },
    { buttonText: 'Enviar', buttonValue: 'send', buttonType: 'mode' }
  ];

  actionButtons1: Button[] = [
    { buttonText: '1', buttonValue: '1', buttonType: 'action' },
    { buttonText: '2', buttonValue: '2', buttonType: 'action' },
    { buttonText: '3', buttonValue: '3', buttonType: 'action' }
  ];

  actionButtons2: Button[] = [
    { buttonText: '4', buttonValue: '4', buttonType: 'action' },
    { buttonText: '5', buttonValue: '5', buttonType: 'action' },
    { buttonText: '6', buttonValue: '6', buttonType: 'action' }
  ];

  actionButtons3: Button[] = [
    { buttonText: '7', buttonValue: '7', buttonType: 'action' },
    { buttonText: '8', buttonValue: '8', buttonType: 'action' },
    { buttonText: '9', buttonValue: '9', buttonType: 'action' }
  ];

  actionButtons4: Button[] = [
    { buttonText: '0', buttonValue: '0', buttonType: 'action' }
  ];

  ngOnInit() {
    this.subscription = this.buttonActions.subscribe(value => {
      this.groupEnabled = value;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
