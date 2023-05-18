import { ProfileService } from 'src/app/entities/profile/profile.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile, ProfileToSend } from 'src/app/entities/profile/profile';
import { UserService } from 'src/app/entities/user/user.service';
import { User } from 'src/app/entities/user/user';
import { upperCase } from './upper-case';
import { telephoneFormat } from './telephone-format';
import { onlyLetters } from './onlyLetters';
import { IbgeLocalityUfService } from 'src/app/services/ibge/ibge-locality-uf.service';
import { District, State } from 'src/app/services/ibge/ibge';
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
    private ibgeUfService: IbgeLocalityUfService,
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

    this.subscriptionFederationUnits = 
        this.ibgeUfService.states()
          .subscribe((collection)=>{
            this.federationUnits = collection;
          })

    setTimeout(() => {
      console.log(this.federationUnits)
    }, 1000)
  }
  
  ngOnDestroy(): void {
    this.subscriptionFederationUnits.unsubscribe();
    this.subscriptionCities.unsubscribe();
  }

  register():void {
    let user!: User;
    this.userService.returnUser().subscribe((res) => user = res as User);
    const profile = this.formGroupProfile.getRawValue() as Profile;

    const profileToSend: ProfileToSend = {
      email: user.email,
      profile: profile
    };

    this.profileService.register(profileToSend)
    .subscribe((profile) => {
      const response = profile.body as Profile;
      this.profileService.saveProfile(response);
    });
  }

  currentState(state: State) {
    this.ibgeUfService.updateState(state);
    this.ibgeUfService.stateCities(state)
      .subscribe((collection) => {
        this.cities = collection;
      });
  }
}
