import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { validadorNumeros } from "../validators/numeros.validator";
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-formulario-contacto',
  templateUrl: './formulario-contacto.component.html',
  styleUrls: ['./formulario-contacto.component.css']
})
export class FormularioContactoComponent implements OnInit {
  formularioContacto: FormGroup;
  fileToUpload: File | null = null;

  file: File | null = null;
  fileSelected: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  currentLanguage!: string;

  constructor(private fb: FormBuilder, private http: HttpClient, private translate: TranslateService, public translationService: TranslationService) {
    this.formularioContacto = this.fb.group({});
  }

  ngOnInit(): void {
    this.formularioContacto = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombres: ['', [Validators.required, validadorNumeros]],
      apellidos: ['', [Validators.required, validadorNumeros]],
      comentarios: ['', [Validators.required]],
      adjunto: [null]
    });
  }

  toggleLanguage(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const lang = isChecked ? 'es' : 'en';
    this.translationService.loadLanguage(lang);
    this.currentLanguage = this.translationService.getCurrentLanguage();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.fileSelected = true;
    } else {
      this.file = null;
      this.fileSelected = false;
    }
  }

  openFileDialog(): void {
    const fileInput = document.getElementById('adjunto') as HTMLInputElement;
    fileInput.click();
  }

  submit(): void {
    if (this.formularioContacto.invalid) {
      alert(this.translationService.getText('alerts.missingFields'));
      return;
    }

    if (confirm(this.translationService.getText('alerts.confirmSubmit'))) {
      const formData = new FormData();
      formData.append('email', this.formularioContacto.get('email')?.value);
      formData.append('nombres', this.formularioContacto.get('nombres')?.value);
      formData.append('apellidos', this.formularioContacto.get('apellidos')?.value);
      formData.append('comentarios', this.formularioContacto.get('comentarios')?.value);
     /*  if (this.fileToUpload) {
        formData.append('adjunto', this.fileToUpload);
      } */
      if (this.fileToUpload) {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(this.fileToUpload.type)) {
          alert(this.translationService.getText('alerts.fileTypeNotAllowed'));
          return;
        }
      }
      this.http.post('http://localhost:5209/api/FormularioContacto', formData).subscribe(
        response => {
          console.log('Formulario enviado con éxito', response);
          alert(this.translationService.getText('alerts.success'));
        },
        error => {
          console.error('Error al enviar el formulario', error);
          alert(this.translationService.getText('alerts.error'));
        }
      );

    } else {
      alert(this.translationService.getText('alerts.missingFields'));
    }
  }

}

