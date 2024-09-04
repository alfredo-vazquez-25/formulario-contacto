import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations = new Map<string, string>([
    ['en_alerts.missingFields', 'Please fill out all required fields.'],
    ['en_alerts.success', 'Form submitted successfully.'],
    ['en_alerts.error', 'Error submitting the form.'],
    ['es_alerts.missingFields', 'Por favor complete todos los campos obligatorios.'],
    ['es_alerts.success', 'Formulario enviado con éxito.'],
    ['es_alerts.error', 'Error al enviar el formulario.']
  ]);

  private currentLanguage = 'en';

  private texts = new BehaviorSubject<{ [key: string]: string }>({});
  private languageCode = 'en';

  constructor(private http: HttpClient) {}
  loadLanguage(languageCode: string): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>(`http://localhost:5209/api/language/${languageCode}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateLanguage(languageCode: string): void {
    this.loadLanguage(languageCode).subscribe(
      data => {
        this.texts.next(data);
        this.languageCode = languageCode;
        localStorage.setItem('selectedLanguage', languageCode);
      },
      error => {
        console.error('Error loading language', error);
      }
    );
  }

  getText(key: string): string {
    const texts = this.texts.getValue();
    return texts[key] || key;
    //return this.translations.get(`${this.currentLanguage}_${key}`) || key;
  }

  setLanguage(languageCode: string): void {
    this.currentLanguage = languageCode;
  }

  getCurrentLanguage(): string {
    return this.languageCode;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Server error:', error);
    return throwError(() => new Error('Error loading data'));
  }
}
