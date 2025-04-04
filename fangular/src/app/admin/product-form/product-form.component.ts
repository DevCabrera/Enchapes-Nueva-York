import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ProductFormComponent {
  formData: any = {
    sku: '',
    nombre: '',
    ancho: '',
    alto: '',
    espesor: '',
    peso_m2: '',
    precio_m2: '',
    fotos: []
  };

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) {
    if (data) {
      this.formData = { ...data, fotos: data.fotos || [] };
    }
  }

  handleChange(event: any): void {
    const { name, value, files } = event.target;
    if (name === 'fotos') {
      const newFiles = Array.from(files);
      const totalFiles = this.formData.fotos.length + newFiles.length;
      if (totalFiles > 5) {
        alert('No puedes subir más de 5 imágenes.');
        return;
      }
      this.formData.fotos = [...this.formData.fotos, ...newFiles];
    } else {
      this.formData[name] = value;
    }
  }

  handleRemoveImage(index: number): void {
    this.formData.fotos.splice(index, 1);
  }

  isFile(foto: any): boolean {
    return foto instanceof File;
  }

  getFileUrl(foto: any): string {
    return URL.createObjectURL(foto);
  }

  handleSubmit(): void {
    const formDataToSubmit = new FormData();
    for (let key in this.formData) {
      if (key === 'fotos') {
        this.formData[key].forEach((file: File) => {
          formDataToSubmit.append('fotos', file);
        });
      } else {
        formDataToSubmit.append(key, this.formData[key]);
      }
    }

    if (this.data.id_producto) {
      this.productService.updateProduct(this.data.id_producto, formDataToSubmit).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Error al actualizar producto:', err),
      });
    } else {
      this.productService.createProduct(formDataToSubmit).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Error al crear producto:', err),
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}