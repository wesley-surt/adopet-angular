import { Component, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Animal } from 'src/app/entities/animals/animals';

@Component({
  selector: 'app-animal-card-dialog',
  templateUrl: './animal-card-dialog.component.html',
  styleUrls: ['./animal-card-dialog.component.css']
})
export class AnimalCardDialogComponent {
  @Output() path!: string;
  public pathAux: string = this.data.path;

  constructor(
    private dialogRef: MatDialogRef<AnimalCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {animal: Animal, path: string}
  ) {}

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
