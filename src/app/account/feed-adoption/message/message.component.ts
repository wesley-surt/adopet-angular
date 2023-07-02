import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  public formGroupMessage!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroupMessage = this.formBuilder.group({
      name: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      nameAnimal: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  /** Por enquanto não vou implementar a funcionalidade que envia a mensagem porque, no momento, não sei
   * trabalhar com troca de mensagens.
   */
}
