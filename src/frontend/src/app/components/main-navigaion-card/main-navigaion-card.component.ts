import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-navigaion-card',
  templateUrl: './main-navigaion-card.component.html',
  styleUrl: './main-navigaion-card.component.scss',
})
export class MainNavigaionCardComponent {
  @Input() title!: string;

  constructor(private readonly router: Router) {}

  navigateTo() {
    this.router.navigate([this.title]);
  }
}
