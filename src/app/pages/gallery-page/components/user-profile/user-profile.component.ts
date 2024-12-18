import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NoImagePipe } from '../../../../shared/pipes/noImage.pipe';
import { Profile } from '../../interfaces/gallery-response.interface';
import { UserSkeletonComponent } from '../../ui/user-skeleton/user-skeleton.component';
import { REPOSITORY_URLS } from '../../../../config/constants';
import { GithubCodeComponent } from '../../../../shared/components/github-code/github-code.component';
import { MediaUrlPipe } from '../../../../shared/pipes/mediaUrl.pipe';

@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [
    CommonModule,
    GithubCodeComponent,
    UserSkeletonComponent,
    //pipes,
    NoImagePipe,
    MediaUrlPipe,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UserProfileComponent {

 public readonly url = REPOSITORY_URLS.gallery.profile;

  public data = input.required<Profile | null>();
  public toggle = output<void>();

  public toggleUser():void{
    this.toggle.emit();
  }



}
