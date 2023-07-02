import { Component, Inject, OnDestroy, Output, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Animal } from 'src/app/entities/animals/animals';


@Component({
  selector: 'app-animal-card-dialog',
  templateUrl: './animal-card-dialog.component.html',
  styleUrls: ['./animal-card-dialog.component.css']
})
export class AnimalCardDialogComponent implements OnDestroy {

  public templateRefButton: TemplateRef<any> = this.data.button;
  public pathAux: string = this.data.path;
  public customButton: any;

  constructor(
    private dialogRef: MatDialogRef<AnimalCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      animal: Animal,
      path: string,
      button: TemplateRef<any>
    }
  ) {}

  ngOnDestroy(): void {
    this.dialogRef.close();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
