import { Component, Inject, OnDestroy, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Animal } from 'src/app/entities/animals/animals';


@Component({
  selector: 'app-animal-card-for-dialog',
  templateUrl: './animal-card-for-dialog.component.html',
  styleUrls: ['./animal-card-for-dialog.component.css']
})
export class AnimalCardForDialogComponent implements OnDestroy {

  @Output() path!: string;

  public templateRefButton: TemplateRef<any> = this.data.button;
  public pathAux: string = this.data.path;
  public customButton: any;

  constructor(
    private dialogRef: MatDialogRef<AnimalCardForDialogComponent>,
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
