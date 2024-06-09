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
      if (this.param.buttonValue === 'restart') {
        this.buttonActions.setModeValue("restart");
        this.buttonActions.setActionValue("-1");
        this.buttonActions.sendUpdateModeRequest("1");

      } else {
        this.buttonActions.setModeValue(this.param.buttonValue);
        this.buttonActions.updateGroupStatus(true);
      }

    } else {
      this.buttonActions.setActionValue(this.param.buttonValue);
      this.buttonActions.sendUpdateActionRequest(this.param.buttonValue);

      if(this.param.buttonValue === 'back') {
        this.buttonActions.updateGroupStatus(false);

      } else {
        this.buttonActions.setActionValue(this.param.buttonValue);
        this.buttonActions.sendUpdateActionRequest(this.param.buttonValue);
      }
    }
  }
}