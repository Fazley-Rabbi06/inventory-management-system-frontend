import { Component, OnInit } from '@angular/core';
import { SaleService } from '../sales.service';
import { ItemService } from '../item.service';
import { Sale } from './sale.model';
import { Item } from '../item-list/item.model';

@Component({
  selector: 'app-sale',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SaleComponent implements OnInit {
  sales: Sale[] = [];
  items: Item[] = [];
  newSale: Sale = new Sale();
  isSaleSectionVisible: boolean = false;
  isEditingId: number | null = null;

  constructor(
    private saleService: SaleService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.loadItems();
    this.loadSales();
  }

  loadItems() {
    this.itemService.getAllItems().subscribe(
      (response) => {
        this.items = response;
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  loadSales() {
    this.saleService.getAllSales().subscribe(
      (response) => {
        this.sales = response;
      },
      (error) => {
        console.error('Error fetching sales:', error);
      }
    );
  }

  toggleSaleSection() {
    this.isSaleSectionVisible = !this.isSaleSectionVisible;
    if (this.isEditingId !== null) {
      const saleToEdit = this.sales.find((sale) => sale.id === this.isEditingId);
      if (saleToEdit) {
        this.newSale = { ...saleToEdit }; // Clone sale to form
      }
    }
  }

  createSale() {
    if (!this.newSale.itemId || !this.newSale.quantity) {
      alert('Please fill in all fields!');
      return;
    }
    this.saleService.createSale(this.newSale).subscribe(
      () => {
        alert('Sale created successfully!');
        this.newSale = new Sale(); // Reset form
        this.loadSales();
      },
      (error) => {
        console.error('Failed to create sale:', error);
      }
    );
  }

  updateSale() {
    // Validate newSale before updating
    if (!this.newSale.itemId || !this.newSale.quantity) {
      alert('Please fill in all fields!');
      return;
    }

    if (this.isEditingId !== null) {
      this.saleService.updateSale(this.isEditingId, this.newSale).subscribe(
        () => {
          alert('Sale updated successfully!');
          this.isEditingId = null;
          this.newSale = new Sale(); // Reset form
          this.loadSales();
        },
        (error) => {
          console.error('Failed to update sale:', error);
        }
      );
    }
  }

  enableEdit(sale: Sale) {
    this.isEditingId = sale.id;
    this.newSale = { ...sale }; // Copy sale to form
  }

  deleteSale(id: number) {
    if (confirm('Are you sure you want to delete this sale?')) {
      this.saleService.deleteSale(id).subscribe(
        () => {
          alert('Sale deleted successfully!');
          this.loadSales();
        },
        (error) => {
          console.error('Failed to delete sale:', error);
        }
      );
    }
  }
}
