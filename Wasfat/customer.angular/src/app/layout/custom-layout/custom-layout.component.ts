import { Component, OnInit } from '@angular/core';
import { eLayoutType, SubscriptionService } from '@abp/ng.core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { collapseWithMargin } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-custom-layout',
  templateUrl: './custom-layout.component.html',
  animations: [collapseWithMargin],
  providers: [SubscriptionService],
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
