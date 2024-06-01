import { Component, Input } from '@angular/core';
import Button from '../../interfaces/button.interface';
import { ConnectionApiService } from '../../services/connection-api.service';
import { getInfoInterface } from '../../interfaces/api.interface';

@Component({
  selector: 'app-default-button',
  standalone: true,
  imports: [],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.scss'
})
export class DefaultButtonComponent {
  @Input() param: Button = {} as Button;
  @Input() isDisable: boolean = false;

  constructor(private connection: ConnectionApiService) {
    this.param = {
      buttonText: 'Not Set',
      buttonValue: 'Undefined',
      buttonType: 'action',
    }
  }

  public sendValue(value: string, type: string): void {
    if(type === 'mode') {
      if (value === 'send') {
        const getInfo: getInfoInterface = {} as getInfoInterface;

        this.connection.getInfo(value).subscribe((data: getInfoInterface) => {
          getInfo.virtualPort = data.virtualPort;
          getInfo.atrributedValue = data.atrributedValue;
        });

        window.alert(getInfo);
      }

      if (value === 'read') {
        console.log('Reading value in esp32');
      }

    } else {
      console.log('Button value: ', value);
    }
  }

  getActionValue(valueParam: string): number {
    let value: number = Number(valueParam);
    return value;
  }

  setButtonStatus(): void {
    if(!this.isDisable) {
      this.isDisable = true;
    } else {
      this.isDisable = false;
    }
  }
}