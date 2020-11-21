import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BreadcrumbInterface } from './upper-body.interfaces';
import { filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-upper-body',
  templateUrl: './upper-body.component.html',
  styleUrls: ['./upper-body.component.scss']
})
export class UpperBodyComponent implements OnInit {

  breadcrumbs: Array<BreadcrumbInterface>;
  route: ActivatedRoute;
  actualComponentName: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    this.activatedRoute.data.subscribe(data => {
      this.actualComponentName = data['title'];
    });
  }

  ngOnInit(): void {
    // Dynamic load of data that tests if the navigation changes.
    // If the navigation route changes, the breadcrumb is updated with the new data
    this.router.events.pipe(filter((event: RouterEvent) => event instanceof NavigationEnd),
      distinctUntilChanged()).subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      });
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Array<BreadcrumbInterface> = []): Array<BreadcrumbInterface> {
    // Get label and path and verify if they are not empty 
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    // Delete the dynamic part form static url. Example: ':id'
    const lastRoutePart = path.split('/').pop();

    // Test if the route is dynamic
    const isDynamicRoute = lastRoutePart.startsWith(':');


    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);   // Replace ":" for the parameter 
      label = label + " " + route.snapshot.params[paramName];         // Breadcrumb
    }

    // Rebuild next url for each state
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: BreadcrumbInterface = {
      label: label,
      url: nextUrl,
    };

    // Add only to routes that contain    data: {breadcrumb: ""}
    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      // If the assigned breadcrumb does not match the route, loads new breadcrumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

}
