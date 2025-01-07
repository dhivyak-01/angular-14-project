import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  productForm: FormGroup;
  selectedFile: File | null = null;
  errorMessage: string = '';  // Declare errorMessage to store error messages
  // bannerStatuses: string[] = ['enable', 'disable'];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required], // updated formControlName for image
      content: ['', Validators.required],
      caption: ['', Validators.required],
      isEnabled: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Check for image type validation
      if (file.type.startsWith('image/')) {
        this.selectedFile = file;
        this.productForm.patchValue({ image: this.selectedFile });
        this.errorMessage = '';  // Clear any previous error messages
      } else {
        this.errorMessage = 'Please upload a valid image file.';
        this.selectedFile = null;
      }
    }
  }
  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('id', this.productForm.get('id')?.value);
      formData.append('title', this.productForm.get('title')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('image', this.selectedFile as File);
      formData.append('content', this.productForm.get('content')?.value);
      formData.append('caption', this.productForm.get('caption')?.value);
      const isEnabled = this.productForm.get('isEnabled')?.value; // true or false
      formData.append('isEnabled', isEnabled.toString()); 
     

      this.http.post('http://localhost:3000/api/banner', formData)
        .subscribe(
          response => {
            console.log('Product created successfully:', response);
            alert('Product created successfully!');
            this.productForm.reset(); // Reset the form after successful submission 
          },
          error => {
            console.error('Error creating product:', error);
            alert('Failed to create product. Please try again.');
          }
        );
    } else {
      console.warn('Form is invalid');
      alert('Please fill out all required fields.');
    }
  }

}
