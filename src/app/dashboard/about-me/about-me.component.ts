import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../shared/services/about.service';
import { About } from '../../shared/models/about';
import { delay, map, timeout } from 'rxjs/operators';
@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit {
  abouts: About[];
  // tslint:disable-next-line: no-inferrable-types
  loadSpinner: boolean = true;
  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutService.getAboutList().subscribe((data) => {
      delay(3000);
      this.abouts = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object),
        } as About;
      });
      this.loadSpinner = false;
    });
  }
}
