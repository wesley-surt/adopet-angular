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
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  @Output() stateEmitter = new EventEmitter<number>()

  public preSelectionState: string = '-- Select Uf --';
  public preSelectionCitie: string = '-- Select Cities --';

  public formGroupProfile!: FormGroup;

  public auxiliaryState!: SimplifiedState;

  public profile!: Profile;
  public states!: State[];
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

    } catch (err) {
      console.log(err);
    };

    this.profileService.returnProfile()
    .subscribe(returnedProfile => {
      this.profile = returnedProfile;
    });

    this.formGroupProfile = this.formBuilder.group({
      photo: [`${this.profile.photo ?? ''}`],
      name: [`${this.profile.name ?? ''}`, [Validators.required, upperCase, onlyLetters ]],
      telephone: [`${this.profile.telephone ?? ''}`, [Validators.required, telephoneFormat ]],
      uf: [null, [Validators.required]],
      city: [null, [Validators.required]],
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
      throw new Error('Error: Current state not found in country states listing.');

      this.auxiliaryState = {
        id: currentState.id,
        nome: currentState.nome
      };

      this.loadCities(currentState);
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
        this.profileService.update(profileForm);

        break;
    }
  }
}
