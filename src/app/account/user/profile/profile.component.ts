import { ProfileService } from 'src/app/entities/profile/profile.service';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/entities/profile/profile';
import { UserService } from 'src/app/entities/user/user.service';
import { User } from 'src/app/entities/user/user';
import { LocalityService } from 'src/app/services/locality/locality.service';
import { District, SimplifiedState, State } from 'src/app/services/locality/locality';
import { Subscription, map } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Animal } from 'src/app/entities/animals/animals';
import { AnimalsService } from 'src/app/entities/animals/animals.service';
import { AnimalCardDialogComponent } from 'src/app/components/animal-card-dialog/animal-card-dialog.component';
import { upperCase } from '../user-utils/upper-case';
import { onlyLetters } from '../user-utils/only-letters';
import { telephoneFormat } from '../user-utils/telephone-format';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  @ViewChild('button') public button!: TemplateRef<any>;

  public dialogRef!: MatDialogRef<AnimalCardDialogComponent>;

  public preSelectionState!: string;
  public preSelectionCitie!: string;

  public formGroupProfile!: FormGroup;

  public auxiliaryState!: SimplifiedState;
  public animalClickedId!: string;
  public animals!: Animal[];

  public dynamicMessage = 'EXIBIR';
  public show = false;

  public profile!: Profile;
  public states!: State[];
  public cities!: District[];

  private subscriptionStates!: Subscription;
  private subscriptionCities!: Subscription;
  private subscriptionAnimals!: Subscription;

  constructor(
    private localityService: LocalityService,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private animalsService: AnimalsService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const profileIncomplete = this.activatedRoute.snapshot.data['profileIncomplete'];
      this.states = this.activatedRoute.snapshot.data['states'];

      if(profileIncomplete === true) {
        console.log(profileIncomplete, 'please, complete your profile');
      } else {
        console.log(profileIncomplete, 'Profile completed. All ok');
      };
    });

    try {
      this.loadStateAndCities();
      this.localityService.updateState(this.auxiliaryState);

    } catch (err) { console.log(err) };

    this.profileService.returnProfile()
    .subscribe(returnedProfile => this.profile = returnedProfile);

    this.runReactiveForm();

    this.preSelectionState = this.profile.state ?? '-- Selecione Um Estado --';
    this.preSelectionCitie = this.profile.city ?? '-- Selecione Uma Cidade --';

    // Apenas para separar a parte que busca os animais para serem renderizados
    //--------------------------------*********---------------------------------------------

    this.localityService.returnState().subscribe((state) => {

      const stateSubstituto: SimplifiedState = {
        id: 31,
        nome: 'Minas Gerais'
      }

      // this.animals = [
      //   {
      //     id: '123658974',
      //     photoUrl: '6asd5f46a8sdf4',
      //     name: 'Cachorrito',
      //     age: '25',
      //     characteristics: 'ele é bacana',
      //     city: 'contagem'
      //   },
      //   {
      //     id: '123658974',
      //     photoUrl: '6asd5f46a8sdf4',
      //     name: 'Gatito',
      //     age: '50',
      //     characteristics: 'ele é simpático',
      //     city: 'Belo horizonte'
      //   },
      // ];

      console.log(this.animals);
      this.subscriptionAnimals = this.animalsService.fetchAll(stateSubstituto).subscribe((animals) => {
          this.animals = animals
      })
    })
  }

  ngOnDestroy(): void {
    this.subscriptionStates.unsubscribe();
    this.subscriptionCities.unsubscribe();
    this.subscriptionAnimals.unsubscribe();
    this.dialogRef.close();
  }

  public register(): void {
    let user!: User;
    this.userService.returnUser().subscribe(res => user = res as User);

    if(this.formGroupProfile.status !== 'INVALID') {
      this.profileService.returnProfile().subscribe(returnedProfile => {

        const profileForm = this.formGroupProfile.getRawValue() as Profile;
        this.checkExistingProfile(returnedProfile, profileForm, user);
      });
    }

    this.runReactiveForm();
  }

  public selectedState(state: State) {
    const stateToSave: SimplifiedState = {
      id: state.id,
      nome: state.nome
    }

    this.localityService.updateState(stateToSave);
    this.loadCities(state);
  }

  private loadStateAndCities(): void {
    this.localityService.returnState().subscribe(returnedState => {
      const currentState = this.states.find(state => state.nome === returnedState.nome);

      if(!currentState)
      throw new Error('Current state not found in country states listing.');

      this.auxiliaryState = {
        id: currentState.id,
        nome: currentState.nome
      };

      this.loadCities(currentState);
    });
  }

  private runReactiveForm(): void {
    this.formGroupProfile = this.formBuilder.group({

      photo: [`${this.profile.photo ?? ''}`],
      name: [`${this.profile.name ?? ''}`, [Validators.required, upperCase, onlyLetters ]],
      telephone: [`${this.profile.telephone ?? ''}`, [Validators.required, telephoneFormat]],
      uf: [null, [Validators.required]],
      city: [null, [Validators.required]],
      about: [`${this.profile.about ?? ''}`]
    });
  }

  private loadCities(state: State): void {
    this.subscriptionCities = this.localityService.getCities(state)
    .pipe( map( c => c ))
    .subscribe(colection =>
      this.cities = colection), (err: any) => console.log(err);
  }

  private checkExistingProfile(profile: Profile, profileForm: Profile, user: User): void {
    switch(profile._id) {

      case '':
        this.profileService.register(user, profileForm)
        .subscribe(profile => this.profileService.saveProfile(profile as Profile));
        break;

      default:
        this.profileService.update(profileForm)
        .subscribe(profile => this.profileService.saveProfile(profile as Profile));
        break;
        // Preciso fazer o back-end retornar o perfil atualizado.
    }
  }

  public toggleShow(): void {
    this.show = !this.show;

    if(this.show) {
      this.dynamicMessage = 'OCULTAR';
    } else {
      this.dynamicMessage = 'EXIBIR';
    }
  }

  public openDialog(animal: any): void {
    this.animalClickedId = animal._id ?? '';

    this.dialogRef = this.dialog.open(AnimalCardDialogComponent, {
      data: {animal, path: '/profile', button: this.button}
    });
  }
}
