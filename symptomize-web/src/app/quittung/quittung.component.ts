import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-quittung',
  templateUrl: './quittung.component.html',
  styleUrls: ['./quittung.component.scss']
})
export class QuittungComponent implements OnInit {

  public URLoutput;
  public urlLabeltext = 'Hier wird der Link erscheinen, wenn sie auf absenden clicken';
  public showcopy = false;


  symptome = [
    { id: 1, koerperteil: 'Hand', Symptom: ['Bluten', 'Blau'] },
    { id: 2, koerperteil: 'Kopf', Symptom: ['Schnitt', 'Blau', 'LOL'] }
  ];

  constructor(private router: Router, private location: Location, private http: HttpClient) {

  }

  ngOnInit() {
  }

  clickPlus() {
    this.router.navigate(['/symp']);
  }
  clickEdit(id: number) {
    alert(id);
  }
  clickDelete(id: number) {
    alert(id);
  }
  absenden() {
    const url = 'http://localhost:8080/saveProfil';
    if (confirm('Bist du sicher, dass du dein Profil absenden willst?')) {
      this.http.post<Observable<Text>>(url, {
          symptome: this.symptome
      })
        .subscribe((output) => {
          this.URLoutput = output;
          console.log(this.URLoutput);
          this.giveURL(this.URLoutput);
          this.showcopy = true;

        });
    }
  }
  clickCopy(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  goBack() {
    alert('back');
    this.location.back();
  }
  giveURL(url: Text) {
    this.urlLabeltext = 'http://localhost:4200/profil/' + url;
  }
}