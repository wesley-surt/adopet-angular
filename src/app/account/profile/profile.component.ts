import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/entities/profile/profile';
import { UserService } from 'src/app/entities/user/user.service';
import { User } from 'src/app/entities/user/user';
import { upperCase } from './upper-case';
import { telephoneFormat } from './telephone-format';
import { onlyLetters } from './onlyLetters';
import { LocalityService } from 'src/app/services/locality/locality.service';
import { District, State } from 'src/app/services/locality/locality';
import { Observable, Subscription, map, tap } from 'rxjs';
import { ProfileService } from 'src/app/entities/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  @Output() stateEmitter = new EventEmitter<number>()

  public formGroupProfile!: FormGroup;
  public cities!: District[];
  public profile!: Profile;
  private subscriptionFederationUnits!: Subscription;
  private subscriptionCities!: Subscription;
  public states!: Observable<State[]>;

  constructor(
    private localityService: LocalityService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService
    ) {}

  ngOnDestroy(): void {
    this.subscriptionFederationUnits.unsubscribe();
    this.subscriptionCities.unsubscribe();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const profileIncomplete = this.activatedRoute.snapshot.data['profileIncomplete'];
      this.states = this.activatedRoute.snapshot.data['states'];

      if(profileIncomplete === true) {
        console.log(profileIncomplete, 'please, complete your profile');
      } else {
        console.log(profileIncomplete, 'Profile completed. All ok');
      };

      // this.loadStateAndCities();

      this.formGroupProfile = this.formBuilder.group({
      photo: [`${this.profile.photo ?? ''}`],
      name: [`${this.profile.name ?? ''}`, [Validators.required, onlyLetters, ]],
      telephone: [`${this.profile.telephone ?? ''}`, [Validators.required, telephoneFormat ]],
      uf: [`${this.profile.state ?? ''}`, [Validators.required]],
      city: [`${this.profile.city ?? ''}`, [Validators.required]],
      about: [`${this.profile.about ?? ''}`]
    });
  }

  register(): void {
    this.userService.returnUser().subscribe(res => user = res as User);
    this.profileService.returnProfile().subscribe(returnedProfile => {
      const profileForm = this.formGroupProfile.getRawValue() as Profile;
      this.checkExistingProfile(returnedProfile, profileForm, user);
    })
  }

  // public currentState(state: State) {
  //   this.updateStateAndLoadCities(state);
    // Dependendo de como o código proceder durante os testes, pprecisarei dar um refresh na página
    // neste local.
  // }

  // private checkExistingProfile(profile: Profile, profileForm: Profile, user: User): void {

  //   switch(profile._id) {
  //     case '':
  //       this.profileService.register(user, profileForm)
  //       .subscribe(profile => this.profileService.saveProfile(profile as Profile));

  //       break;

  //     default:
  //       this.profileService.update(profileForm);

  //       break;
  //   }
  // }

//   private loadStateAndCities(): void {
//     this.localityService.returnState().subscribe(returnedState => {

//     try {
//       const currentState = this.state.find(state => state.nome === returnedState.nome) as State;

//       if(!currentState)
//         throw new Error('Error: Current state not found in country states listing.');

//         this.updateStateAndLoadCities(currentState);

//     } catch (err) {
//       console.log(err);
//     };
//   });
// }
    )}}

/**
 *   private updateStateAndLoadCities(currentState: State): void {
    const updatedState = {
      id: currentState.id,
      nome: currentState.nome
    };

    this.localityService.updateState(updatedState);

    this.localityService.getCities(currentState)
    .pipe( map( c => c ))
    .subscribe(collection =>
      this.cities = collection), (err: any) => console.log(err);
  }
 */
