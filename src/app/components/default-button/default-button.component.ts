import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../../interfaces/button.interface';
import { ButtonActionsService } from '../../services/button-actions/button-actions.service';

@Component({
  selector: 'app-default-button',
  standalone: true,
  imports: [],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.scss'
})
export class DefaultButtonComponent {
  @Input() param: Button = { } as Button;

  constructor(private buttonActions: ButtonActionsService) {
    this.param = {
      buttonText: 'Not Set',
      buttonValue: 'Undefined',
      buttonType: 'action'
    }
  }

  run() {
    if(this.param.buttonType === 'mode') {
      this.buttonActions.setModeValue(this.param.buttonValue);
      this.buttonActions.updateGroupStatus(true);

    } else {
      this.buttonActions.setActionValue(this.param.buttonValue);
      this.buttonActions.sendUpdateActionRequest(this.param.buttonValue);
      
      setTimeout(() => {
        this.buttonActions.updateGroupStatus(false);
      }, 4000)
    }
  }
}