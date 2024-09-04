import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  currentLanguage: string = 'en';
  constructor(private translate: TranslateService, public translationService: TranslationService) {
    const savedLang = localStorage.getItem('selectedLanguage');
    const browserLang = translate.getBrowserLang();
    this.currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
  }

  ngOnInit(): void {
    this.currentLanguage = this.translationService.getCurrentLanguage();
    this.translationService.updateLanguage(this.currentLanguage);
  }

  getText(key: string): string {
    return this.translationService.getText(key);
  }

  toggleLanguage(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const newLanguage = checkbox.checked ? 'es' : 'en';
    this.translationService.updateLanguage(newLanguage);
    this.currentLanguage = newLanguage;
  }
}
