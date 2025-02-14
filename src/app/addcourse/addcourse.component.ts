import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {

  productForm: FormGroup;
  selectedFile: File | null = null;
  errorMessage: string = '';  // Declare errorMessage to store error messages

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required], // updated formControlName for image
      duration: ['', Validators.required],
      lectures: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]]
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
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('title', this.productForm.get('title')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('image', this.selectedFile as File);
      formData.append('duration', this.productForm.get('duration')?.value);
      formData.append('lectures', this.productForm.get('lectures')?.value);
      formData.append('price', this.productForm.get('price')?.value);

      this.http.post('http://localhost:3000/api/products', formData)
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
