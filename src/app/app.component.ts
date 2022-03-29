import { Component } from "@angular/core";
import { latLng, Map, tileLayer } from "leaflet";
import * as L from "leaflet";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  map: L.Map;
  zones = L.featureGroup();

  options = {
    layers: [tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")],
    zoom: 15,
    center: latLng(8.524139, 76.936638)
  };

  drawOptions = {
    position: "topleft",
    draw: {
      marker: {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: "../../assets/marker-icon.png",
          shadowUrl: "../../assets/marker-shadow.png"
        })
      }
    }
  };

  onSave() {
    const data = this.zones.toGeoJSON();
    console.log(data);
  }

  onDrawCreated(e: any) {
    this.zones.addLayer(e.layer);
    console.log("Draw Created Event!", e);
    console.log(this.zones.getLayers());
  }

  onDrawDeleted(e: any) {
    e.layers.eachLayer((layer) => {
      this.zones.removeLayer(layer);
    });
    console.log("Draw Deleted Event!", e);
    console.log(this.zones.getLayers());
  }

  onMapReady(map: Map) {}
}
