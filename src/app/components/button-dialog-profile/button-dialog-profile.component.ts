import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-button-dialog-profile',
  templateUrl: './button-dialog-profile.component.html',
  styleUrls: ['./button-dialog-profile.component.css']
})
export class ButtonDialogProfileComponent {
  @ViewChild('testButton') public testButtonTemplateRef!: TemplateRef<any>;
}
