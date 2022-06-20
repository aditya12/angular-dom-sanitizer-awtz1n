import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  template: '<a href=google.com> down </a>',
})
export class AppComponent {
  name = `<h1>inside_h1</h1><script>alert('')</script><link href="https://fonts.googleapis.com/css?family=Source+Code+Pro:400,700|Lato:400,700,900" rel="stylesheet"><b>inside_bold</b><p>inside_p</p>`;
  a = '';
  b = '';
  c = '';
  d = '';

  constructor(private t: DomSanitizer) {
    this.downloadJson();
    this.a = t.sanitize(0, this.name);
    this.b = t.sanitize(1, this.name);
    this.c = t.sanitize(2, this.name);
    //this.d = t.sanitize(3, this.name);
  }

  downloadJsonHref: any;

  generateDownloadJsonUri() {
    let resJsonResponse = 'abc';
    var theJSON = JSON.stringify(resJsonResponse);
    var uri = this.t.bypassSecurityTrustUrl(
      'data:text/json;charset=UTF-8,' + encodeURIComponent(theJSON)
    );
    this.downloadJsonHref = uri;
  }

  downloadJson() {
    var sJson = JSON.stringify('');
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/json;charset=UTF-8,' + encodeURIComponent(sJson)
    );
    element.setAttribute('download', 'primer-server-task.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }
}
