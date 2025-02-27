import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-administration',
  templateUrl: './product-administration.component.html',
  styleUrls: ['./product-administration.component.css']
})
export class ProductAdministrationComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Error al cargar productos:', err),
    });
  }

  openProductForm(product?: any): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '500px',
      data: product || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error('Error al eliminar producto:', err),
      });
    }
  }
}