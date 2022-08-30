import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  
  showSearch: boolean = false;

  private debounceTimer?: NodeJS.Timeout;

  constructor(private placesService: PlacesService) { }

  onQueryChange( query: string = '') {

    if (this.debounceTimer) clearTimeout( this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.placesService.getPlacesByQuery(query);
      console.log('Send this query', query)
    }, 500);
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
  

}
