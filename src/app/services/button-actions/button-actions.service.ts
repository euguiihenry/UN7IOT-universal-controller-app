import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ConnectionApiService } from '../api-connection/connection-api.service';
import { updateInfoInterface } from '../../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class ButtonActionsService {
  private actionButtonValue: string;
  private activeMode: string;
  private groupEnabled = new Subject<boolean>();
  private modeActivePort: string;

  constructor( private connection: ConnectionApiService ) { 
    this.actionButtonValue = "-1";
    this.activeMode = 'Any';
    this.modeActivePort = "v5"; // v5 stands for any port not configured in the blynk cloud
  }

  /* Action Values:
  =============================================================================*/
    setActionValue(value: string) {
      this.actionButtonValue = value;
    }

    getActionValue(): string {
      return this.actionButtonValue;
    }

  /* Mode Values:
  =============================================================================*/
    setModeValue(value: string) {
      this.actionButtonValue = "-1";
      this.activeMode = value;

      if(value === 'read') {
        this.modeActivePort = "v0";
      } else if(value === 'send') {
        this.modeActivePort = "v1";
      } else {
        this.modeActivePort = "v4";
      }
    }

    getModeValue(): string {
      return this.activeMode;
    }

  /* Show Action Buttons:
  =============================================================================*/
    subscribe(callback: (value: any) => void): Subscription {
      return this.groupEnabled.subscribe(callback);
    }

    updateGroupStatus(value: any) {
      this.groupEnabled.next(value);

      if(value) {
        this.sendUpdateModeRequest("1");
      } else {
        this.sendUpdateModeRequest("0");
      }
    }

  /* Send Update Request to Blynk Cloud
  =============================================================================*/
    sendUpdateModeRequest(value: string): void {
      this.connection.update(this.modeActivePort, value);
    }

    sendUpdateActionRequest(value: string): void {
      this.connection.update("v3", value);
    }
}
