import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { ComponentsModule } from '../../components/component.module';
import { AppState } from '../../states/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslocoModule, ComponentsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomePageComponent {
  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router
  ) {}
}
