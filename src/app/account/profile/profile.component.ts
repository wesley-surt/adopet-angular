import { ProfileService } from 'src/app/entities/profile/profile.service';
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
import { District, SimplifiedState, State } from 'src/app/services/locality/locality';
import { Observable, Subscription, map, tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  @Output() stateEmitter = new EventEmitter<number>()

  public formGroupProfile!: FormGroup;
  public profile!: Profile;
  public states!: State[];
  public federationUnits$!: Observable<State[]>;
  public cities!: District[];
  private subscriptionStates!: Subscription;
  private subscriptionCities!: Subscription;

  constructor(
  private localityService: LocalityService,
  private activatedRoute: ActivatedRoute,
  private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const profileIncomplete = this.activatedRoute.snapshot.data['profileIncomplete'];
      this.federationUnits$ = this.activatedRoute.snapshot.data['states'];

      if(profileIncomplete === true) {
        console.log(profileIncomplete, 'please, complete your profile');
      } else {
        console.log(profileIncomplete, 'Profile completed. All ok');
      };

      this.loadStatesAndCities();
    });

    this.profileService.returnProfile()
    .subscribe(returnedProfile => this.profile = returnedProfile);

    this.formGroupProfile = this.formBuilder.group({
      photo: [`${this.profile.photo ?? ''}`],
      name: [`${this.profile.name ?? ''}`, [Validators.required, upperCase, onlyLetters ]],
      telephone: [`${this.profile.telephone ?? ''}`, [Validators.required, telephoneFormat ]],
      uf: [`${this.profile.state ?? ''}`, [Validators.required]],
      city: [`${this.profile.city ?? ''}`, [Validators.required]],
      about: [`${this.profile.about ?? ''}`]
    });
  }

  ngOnDestroy(): void {
    this.subscriptionStates.unsubscribe();
    this.subscriptionCities.unsubscribe();
  }

  public register(): void {
    let user!: User;
    this.userService.returnUser().subscribe(res => user = res as User);
    this.profileService.returnProfile().subscribe(returnedProfile => {
      const profileForm = this.formGroupProfile.getRawValue() as Profile;
      this.checkExistingProfile(returnedProfile, profileForm, user);
    })
  }

  public currentState(state: State) {

    const stateToSave: SimplifiedState = {
      id: state.id,
      nome: state.nome
    }

    this.localityService.updateState(stateToSave);
    this.loadCities(state);
  }

  private checkExistingProfile(profile: Profile, profileForm: Profile, user: User): void {

    switch(profile._id) {
      case '':
        this.profileService.register(user, profileForm)
        .subscribe(profile => this.profileService.saveProfile(profile as Profile));

        break;

      default:
        this.profileService.update(profileForm);

        break;
    }
  }

  private loadStatesAndCities(): void {

    this.subscriptionStates =
      this.federationUnits$.subscribe(colection => {
        this.states = colection;

        this.localityService.returnState().subscribe(returnedState => {

          try {
            this.updateStateAndLoadCities(colection, returnedState);

          } catch (err) {
            console.log(err);
          };
      });
    });
  }

  public updateStateAndLoadCities(colection: State[], returnedState: SimplifiedState): void {
    const currentState = colection.find(state => state.nome === returnedState.nome) as State;

    if(!currentState)
      throw new Error('Error: Current state not found in country states listing.');

    const updatedState = {
      id: currentState.id,
      nome: currentState.nome
    };

    this.localityService.updateState(updatedState);
    this.loadCities(currentState);
  }

  public loadCities(state: State): void {

    this.subscriptionCities = this.localityService.getCities(state)
    .pipe( map( c => c ))
    .subscribe(colection =>
      this.cities = colection), (err: any) => console.log(err);
  }
}
