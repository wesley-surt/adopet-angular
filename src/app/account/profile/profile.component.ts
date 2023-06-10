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
import { District, State } from 'src/app/services/locality/locality';
import { Subscription, map, tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  @Output() stateEmitter = new EventEmitter<number>()

  public formGroupProfile!: FormGroup;
  public cities!: District[];
  public federationUnits!: State[];
  private subscriptionFederationUnits!: Subscription;
  private subscriptionCities!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private userService: UserService,
    private localityService: LocalityService,
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params) => {
    //   const profileIncomplete = this.activatedRoute.snapshot.data['profileIncomplete'];
    //   if(profileIncomplete === true) {
    //     console.log(profileIncomplete, 'please, complete your profile');
    //   } else {
    //     console.log(profileIncomplete, 'Profile completed. All ok');
    //   };
    // });

    this.formGroupProfile = this.formBuilder.group({
      photo: [''],
      name: ['', [Validators.required, upperCase, onlyLetters ]],
      telephone: ['', [Validators.required, telephoneFormat ]],
      uf: ['', [Validators.required]],
      city: ['', [Validators.required]],
      about: ['']
    });

    this.subscriptionFederationUnits = this.localityService.getStates()
      .pipe( map( c => c ) )
      .subscribe(collection =>
        this.federationUnits = collection), (err: any) => console.log(err);
  }

  ngOnDestroy(): void {
    this.subscriptionFederationUnits.unsubscribe();
    this.subscriptionCities.unsubscribe();
  }

  register(): void {
    let user!: User;
    this.userService.returnUser().subscribe(res => user = res as User);
    this.profileService.returnProfile().subscribe(profile => {
      const profileForm = this.formGroupProfile.getRawValue() as Profile;

      switch(profile._id) {
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
    // this.localityService.updateState(state);
    this.localityService.getCities(state)
      .pipe( map( c => c ))
      .subscribe(collection =>
        this.cities = collection), (err: any) => console.log(err);
  }
}
