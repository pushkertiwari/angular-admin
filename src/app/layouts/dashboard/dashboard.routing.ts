import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from '../../user/profile/profile.component';
import { AuthguardService as AuthGuard } from '../../authguard.service';
import { ContactComponent } from '../../pages/contact/contact.component';
import { ContactListComponent } from '../../pages/contact-list/contact-list.component';
import { SubscribersComponent } from '../../pages/subscribers/subscribers.component';
import { SocialIconsComponent } from '../../pages/social-icons/social-icons.component';
import { GivebackComponent } from '../../pages/giveback/giveback.component';
import { HomeContentComponent } from '../../pages/home-content/home-content.component';
import { GetTokenComponent } from '../../pages/get-token/get-token.component';
import { CardslistComponent } from '../../pages/cardslist/cardslist.component';
import { ApplicationsComponent } from '../../pages/applications/applications.component';
import { ProductComponent } from '../../pages/product/addproduct/addproduct.component';
import { ViewproductComponent } from '../../pages/product/viewproduct/viewproduct.component';

export const DashboardRoutes: Route[] = [
  {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
        { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
        { path: 'conatctlist', component: ContactListComponent, canActivate: [AuthGuard] },
        { path: 'subscribers', component: SubscribersComponent, canActivate: [AuthGuard] },
        { path: 'social-icons', component: SocialIconsComponent, canActivate: [AuthGuard] },
        { path: 'giveBack', component: GivebackComponent, canActivate: [AuthGuard] },
        { path: 'homeContent', component: HomeContentComponent, canActivate: [AuthGuard] },
        { path: 'tokenUsers', component: GetTokenComponent, canActivate: [AuthGuard] },
        { path: 'cardUsers', component: CardslistComponent, canActivate: [AuthGuard]},
        { path: 'applications', component: ApplicationsComponent, canActivate: [AuthGuard]},
        { path: 'addProduct', component: ProductComponent, canActivate: [AuthGuard]},
        { path: 'viewProduct', component: ViewproductComponent, canActivate: [AuthGuard]},
      ]
  }
];
