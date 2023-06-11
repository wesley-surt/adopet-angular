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
  public states!: State[];
  public cities!: District[];
  public profile!: Profile;
  private subscriptionFederationUnits!: Subscription;
  private subscriptionCities!: Subscription;
  private subscriptionProfile!: Subscription;
  public federationUnits$!: Observable<State[]>;

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

      this.subscriptionFederationUnits = this.federationUnits$.subscribe(collection => {
        this.states = collection;

        this.localityService.returnState().subscribe(returnedState => {

          try {
            const currentState = collection.find(state => state.nome === returnedState.nome) as State;

            if(!currentState)
              throw new Error('Error: Current state not found in country states listing.');

            const updatedState = {
              id: currentState.id,
              nome: currentState.nome
            }

            this.localityService.updateState(updatedState);

            this.subscriptionCities = this.localityService.getCities(currentState)
            .subscribe(cities => {
              this.cities = cities;
            });

          } catch (err) {
            console.log(err);
          }
        });
      })
    });


    this.subscriptionProfile = this.profileService.returnProfile()
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
    this.subscriptionFederationUnits.unsubscribe();
    this.subscriptionCities.unsubscribe();
  }

  register(): void {
    let user!: User;
    this.userService.returnUser().subscribe(res => user = res as User);
    this.profileService.returnProfile().subscribe(returnedProfile => {
      const profileForm = this.formGroupProfile.getRawValue() as Profile;

      switch(returnedProfile._id) {
        case '':
          this.profileService.register(user, profileForm)
          .subscribe(profile => this.profileService.saveProfile(profile as Profile));

          break;

        default:
          this.profileService.update(profileForm);

          break;
      }
    })
  }

  currentState(state: State) {

    const stateToSave: SimplifiedState = {
      id: state.id,
      nome: state.nome
    }

    this.localityService.updateState(stateToSave);
    this.localityService.getCities(state)
      .pipe( map( c => c ))
      .subscribe(collection =>
        this.cities = collection), (err: any) => console.log(err);
  }
}
