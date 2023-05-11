import { ProfileService } from 'src/app/entities/profile/profile.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile, ProfileToSend } from 'src/app/entities/profile/profile';
import { UserService } from 'src/app/entities/user/user.service';
import { User } from 'src/app/entities/user/user';
import { upperCase } from './upper-case';
import { telephoneFormat } from './telephone-format';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public formGroupProfile!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private userService: UserService
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
      name: ['', [Validators.required, upperCase ]],
      telephone: ['', [Validators.required, telephoneFormat ]],
      city: ['', [Validators.required]],
      about: ['']
    })
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
}
