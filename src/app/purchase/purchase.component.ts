import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { ItemService } from '../item.service';
import { Purchase } from './purchase.model';
import { Item } from '../item-list/item.model';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  purchases: Purchase[] = [];
  items: Item[] = [];
  newPurchase: Purchase = new Purchase();
  isPurchaseSectionVisible: boolean = false;
  isEditingId: number | null = null;
  stockReport: string = '';
  isStockReportVisible: boolean = false;

  constructor(
    private purchaseService: PurchaseService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.loadItems();
    this.loadPurchases();
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

  loadPurchases() {
    this.purchaseService.getAllPurchases().subscribe(
      (response) => {
        this.purchases = response;
      },
      (error) => {
        console.error('Error fetching purchases:', error);
      }
    );
  }

  togglePurchaseSection() {
    this.isPurchaseSectionVisible = !this.isPurchaseSectionVisible;
    if (this.isEditingId !== null) {
      const purchaseToEdit = this.purchases.find((purchase) => purchase.id === this.isEditingId);
      if (purchaseToEdit) {
        this.newPurchase = { ...purchaseToEdit }; // Clone purchase to form
      }
    }
  }

  createPurchase() {
    if (!this.newPurchase.itemId || !this.newPurchase.quantity) {
      alert('Please fill in all fields!');
      return;
    }
    this.purchaseService.createPurchase(this.newPurchase).subscribe(
      () => {
        alert('Purchase created successfully!');
        this.newPurchase = new Purchase(); // Reset form
        this.loadPurchases();
      },
      (error) => {
        console.error('Failed to create purchase:', error);
      }
    );
  }

  updatePurchase() {
    // Validate newPurchase before updating
    if (!this.newPurchase.itemId || !this.newPurchase.quantity) {
      alert('Please fill in all fields!');
      return;
    }

    if (this.isEditingId !== null) {
      this.purchaseService.updatePurchase(this.isEditingId, this.newPurchase).subscribe(
        () => {
          alert('Purchase updated successfully!');
          this.isEditingId = null;
          this.newPurchase = new Purchase(); // Reset form
          this.loadPurchases();
        },
        (error) => {
          console.error('Failed to update purchase:', error);
        }
      );
    }
  }

  enableEdit(purchase: Purchase) {
    this.isEditingId = purchase.id;
    this.newPurchase = { ...purchase }; // Copy purchase to form
  }

  deletePurchase(id: number) {
    if (confirm('Are you sure you want to delete this purchase?')) {
      this.purchaseService.deletePurchase(id).subscribe(
        () => {
          alert('Purchase deleted successfully!');
          this.loadPurchases();
        },
        (error) => {
          console.error('Failed to delete purchase:', error);
        }
      );
    }
  }
}
