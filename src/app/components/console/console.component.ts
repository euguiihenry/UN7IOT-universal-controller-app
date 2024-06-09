import { Component } from '@angular/core';
import { ButtonActionsService } from '../../services/button-actions/button-actions.service';

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [],
  templateUrl: './console.component.html',
  styleUrl: './console.component.scss'
})
export class ConsoleComponent {
  hardwareStatus: string = "Offiline";

  constructor(private connection: ButtonActionsService) { }

  async getStatus(): Promise<void> { 
    const modeStatus = await (await this.connection.getModeStatus('v2')).toPromise(); // Subscribe to the Observable and get the value
    
    if (modeStatus?.virtualPort === 'v2') {
      if (modeStatus?.atrributedValue === "Sender Mode") {
        this.hardwareStatus = 'Enviando Comando';

      } else if (modeStatus?.atrributedValue === "Reader Mode") {
        this.hardwareStatus = 'Gravando Dados';

      } else {
        this.hardwareStatus = 'Sem Modo Configurado';
      }
    }
  }

  ngOnInit(): void {
    this.getStatus();
  }

}
