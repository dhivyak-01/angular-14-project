import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BennerService } from '../benner.service';
declare var bootstrap: any;
@Component({
  selector: 'app-managebanner',
  templateUrl: './managebanner.component.html',
  styleUrls: ['./managebanner.component.css']
})
export class ManagebannerComponent implements OnInit, AfterViewInit {

  banners: any = { banners: [] };
  viewedbanner: any = null;
  selectedBanner: any = null;
  imageFile: any = null;
  totalPages: number = 0;              // Total number of pages
  currentPage: number = 1;            // Current page number
  pageSize: number = 5;               // Number of items per page
  pagedBanners: any[] = [];           // Array to hold the banners for the current page


  constructor(private bennerService: BennerService) {}
  
//     ngOnInit(): void {
//       this.bennerService.getBanner().subscribe(
//         (response) => {
//           this.banners = response;
//           console.log('Fetched banners:', this.banners);
//           this.banners.banners.reverse();
//       console.log('Fetched and reversed banners:', this.banners);
//         },
//         (error) => {
//           console.error('Error fetching banners:', error);
//         }
//       );
// }



ngOnInit(): void {
  // Fetch banners from the backend and reverse them
  this.bennerService.getBanner().subscribe(
    (response) => {
      this.banners.banners = response.banners.reverse();  // Reverse the banners after fetching
      console.log('Fetched and reversed banners:', this.banners.banners);

      // Calculate total pages based on the reversed data
      this.totalPages = Math.ceil(this.banners.banners.length / this.pageSize);
      this.updatePagedBanners();  // Update paged banners when data changes
    },
    (error) => {
      console.error('Error fetching banners:', error);
    }
  );
}

// Update the banners displayed on the current page
updatePagedBanners() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.pagedBanners = this.banners.banners.slice(startIndex, endIndex);
}

// Handle page changes
loadPage(page: number): void {
  this.currentPage = page;
  this.updatePagedBanners();  // Update the displayed banners for the new page
}




// Handle viewing course details
handleView(banner: any) {
  this.viewedbanner = banner;  // Assign the selected course to viewedcourse
  console.log('Viewing banner:', this.viewedbanner);  // Log the viewedcourse object
}

ngAfterViewInit(): void {
  // Access the modal element
  const modalElement = document.getElementById('courseModal');
  
  if (modalElement) {
    // Initialize the modal with backdrop set to 'false'
    const modal = new bootstrap.Modal(modalElement, {
      backdrop: false // This disables the backdrop
    });
  }
}

handleDelete(bannerId: string): void {
  this.bennerService.deleteBanner(bannerId).subscribe(
    response => {
      console.log('Banner deleted successfully:', response);
      this.banners = this.banners.filter((banner: { id: string }) => banner.id !== bannerId); // Correctly filter by _id
    },
    error => {
      console.error('Error deleting Banner:', error);
      // Handle specific error messages
      if (error.status === 404) {
        console.error('Banner not found');
      } else if (error.status === 500) {
        console.error('Internal Server Error');
      }
    }
  );
}

 
handleEdit(banner: any): void {
  this.selectedBanner = { ...banner };  // Clone the selected banner for editing
}

onImageChange(event: any): void {
  this.imageFile = event.target.files[0]; // Store selected image
}

saveUpdate(): void {
  if (!this.selectedBanner) return;

  const formData = new FormData();
  formData.append('title', this.selectedBanner.title);
  formData.append('description', this.selectedBanner.description);
  formData.append('content', this.selectedBanner.content);
  formData.append('caption', this.selectedBanner.caption);
  formData.append('isEnabled', this.selectedBanner.isEnabled.toString());

  // If there is a new image selected, append it
  if (this.imageFile) {
    formData.append('image', this.imageFile);
  } else {
    // If no image is selected, use the existing image path
    formData.append('imagePath', this.selectedBanner.image);
  }

  this.bennerService.updateBanner(this.selectedBanner._id, formData).subscribe(
    (response) => {
      console.log('Banner updated successfully:', response);
      const index = this.banners.banners.findIndex((b: any) => b._id === this.selectedBanner._id);
      if (index > -1) {
        this.banners.banners[index] = response;
      }
      this.selectedBanner = null; // Clear the selected banner after saving
    },
    (error) => {
      console.error('Error saving banner:', error);
      alert('Error saving banner');
    }
  );
}




 // Get the banners to display for the current page
 get pagination() {
  return {
    currentPage: this.currentPage,
    totalPages: this.totalPages
  };
}

}
