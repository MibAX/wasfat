import { eLayoutType, SubscriptionService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { fromEvent, debounceTime } from 'rxjs';

@Component({
  selector: 'app-custom-layout',
  templateUrl: './custom-layout.component.html',
  styleUrls: ['./custom-layout.component.scss']
})
export class CustomLayoutComponent implements OnInit {
  static type = eLayoutType.application;

  isCollapsed = false;
  smallScreen = false;

  constructor(private subscription: SubscriptionService) {}

  ngOnInit(): void {
    this.smallScreen = window.innerWidth < 992;
    this.isCollapsed = this.smallScreen;

    const resize$ = fromEvent(window, 'resize').pipe(debounceTime(150));
    this.subscription.addOne(resize$, () => {
      const isSmallNow = window.innerWidth < 992;
      if (isSmallNow !== this.smallScreen) {
        if (isSmallNow) {
          this.isCollapsed = false;
          setTimeout(() => (this.isCollapsed = true), 100);
        } else {
          this.isCollapsed = false;
        }
        this.smallScreen = isSmallNow;
      }
    });
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}