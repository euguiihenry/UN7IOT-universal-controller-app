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

  getStatus() { 
    if(this.connection.getModeValue() === 'Any') {
      this.hardwareStatus = 'Sem Modo Configurado';
    } else if (this.connection.getModeValue() === 'send') {
      this.hardwareStatus = 'Enviando Comando';
    } else if (this.connection.getModeValue() === 'read') {
      this.hardwareStatus = 'Gravando Dados';
    } else {
      this.hardwareStatus = 'Reiniciando Hardware';
    }
  }

  ngOnInit(): void {
    this.getStatus();
  }

}
