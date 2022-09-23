import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  public navigateToSection(section: string) {
    //window.location.hash = '';
    //window.location.hash = section;
   // this.viewportScroller.scrollToAnchor(section);
   let el = document.getElementById(section);
    el!.scrollIntoView({behavior:"smooth"});
}

}
