import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef
  map: google.maps.Map
  lat = 40.730610
  lng = -73.935242
  coordinates = new google.maps.LatLng(this.lat, this.lng)
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 17,
  }
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map
  })

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapInitializer()
    this.getCurrentLocation()
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions)
    this.map.addListener('click', (clickEvent) => {
      console.log(clickEvent.latLng.lat())
      console.log(clickEvent.latLng.lng())
    })
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          this.map.setCenter(pos)
          this.marker.setMap(this.map)
          this.marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude))
        }
      )
    }
  }
}
