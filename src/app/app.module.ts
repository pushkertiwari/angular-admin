import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { AuthguardService as AuthGuard } from './authguard.service';
import { LoginComponent } from './authenication/login/login.component';
import { SharedModule } from './shared/shared.module';
import {ScrollModule} from './scroll/scroll.module';
import { ForgetComponent } from './authenication/forget/forget.component';
import { RegistrationComponent } from './authenication/registration/registration.component';
import { HeaderbarComponent } from './layouts/headerbar/headerbar.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { MenuItems } from './shared/menu-items/menu-items';
import { DashboardRoutes } from './layouts/dashboard/dashboard.routing';
import { ProfileComponent } from './user/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from './pages/contact/contact.component';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { SubscribersComponent } from './pages/subscribers/subscribers.component';
import { SocialIconsComponent } from './pages/social-icons/social-icons.component';
import { GivebackComponent } from './pages/giveback/giveback.component';
import { HomeContentComponent } from './pages/home-content/home-content.component';
import { AlertModule } from 'ngx-alerts';
import { GetTokenComponent } from './pages/get-token/get-token.component';
import { FilterPipe } from './customPipes/email-filter.pipe';
import { CardslistComponent } from './pages/cardslist/cardslist.component';
import { Ajax } from './ajax';
import { LoadingModule } from 'ngx-loading';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { ProductComponent } from './pages/product/addproduct/addproduct.component';
import { ViewproductComponent } from './pages/product/viewproduct/viewproduct.component';
 


const appRoutes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full'},
   { path: 'login', component: LoginComponent },
   { path: 'forgot', component: ForgetComponent },
   { path: 'registration', component: RegistrationComponent },
   { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetComponent,
    RegistrationComponent,
    HeaderbarComponent,
    DashboardComponent,
    ProfileComponent,
    ContactComponent,
    ContactListComponent,
    SubscribersComponent,
    SocialIconsComponent,
    GivebackComponent,
    HomeContentComponent,
    GetTokenComponent,
    FilterPipe,
    CardslistComponent,
    ApplicationsComponent,
    ProductComponent,
    ViewproductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
       { useHash: true }
      //{ enableTracing: false } // <-- debugging purposes only
    ),
    AlertModule.forRoot(),
    RouterModule.forChild(DashboardRoutes),
    HttpModule,
    BrowserAnimationsModule,
    LoadingModule
  ],
  exports: [ScrollModule, FilterPipe],
  providers: [AuthGuard, MenuItems, Ajax],
  bootstrap: [AppComponent]
})
export class AppModule { }
