import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AnimalsService } from '../../../entities/animals/animals.service';
import { LocalityService } from 'src/app/services/locality/locality.service';
import { Animal } from 'src/app/entities/animals/animals';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AnimalCardForDialogComponent } from 'src/app/components/animal-card-for-dialog/animal-card-for-dialog.component';
import { SimplifiedState } from 'src/app/services/locality/locality';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-animals-feed',
  templateUrl: './animals-feed.component.html',
  styleUrls: ['./animals-feed.component.css']
})
export class AnimalsFeedComponent implements OnInit, OnDestroy {

  @ViewChild('button') public button!: TemplateRef<any>;

  public animals!: Animal[];
  public dialogRef!: MatDialogRef<AnimalCardForDialogComponent>;
  private subscriptionAnimals!: Subscription;

  constructor(
    private animalsService: AnimalsService,
    private localityService: LocalityService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {

    this.localityService.returnState().subscribe((state) => {

      const stateSubstituto: SimplifiedState = {
        id: 31,
        nome: 'Minas Gerais'
      }

      this.animals = [
        {
          id: '123658974',
          photoUrl: '6asd5f46a8sdf4',
          name: 'Cachorrito',
          age: '25',
          characteristics: 'ele é bacana',
          city: 'contagem'
        },
        {
          id: '123658974',
          photoUrl: '6asd5f46a8sdf4',
          name: 'Gatito',
          age: '50',
          characteristics: 'ele é simpático',
          city: 'Belo horizonte'
        },
      ]
      // this.subscriptionAnimals = this.animalsService.fetchAll(stateSubstituto).subscribe((animals) => {
      //     this.animals = animals
      // })
    })
  }

  ngOnDestroy(): void {
    this.subscriptionAnimals;
    this.dialogRef.close();
  }

  public openDialog(animal: Animal): void {

    this.dialogRef = this.dialog.open(AnimalCardForDialogComponent, {
      data: {animal, path: '/feed', button: this.button}
    });
  }
}
