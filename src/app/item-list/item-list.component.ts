import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from './item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  isEditingId: number | null = null;
  newItem: Item = new Item();
  stockReport: string = '';
  isStockReportVisible: boolean = false;
  isItemListVisible: boolean = false;  

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
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

  enableEdit(item: Item) {
    this.isEditingId = item.id;
  }

  updateItem(item: Item) {
    this.itemService.updateItem(item.id, item).subscribe(
      () => {
        this.isEditingId = null;
        alert('Item updated successfully!');
        this.loadItems();
      },
      (error) => {
        console.error('Failed to update item:', error);
      }
    );
  }

  deleteItem(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemService.deleteItem(id).subscribe(
        () => {
          alert('Item deleted successfully!');
          this.loadItems();
        },
        (error) => {
          console.error('Failed to delete item:', error);
        }
      );
    }
  }

  addItem() {
    this.itemService.createItem(this.newItem).subscribe(
      () => {
        alert('Item added successfully!');
        this.newItem = new Item();
        this.loadItems();
      },
      (error) => {
        console.error('Failed to add item:', error);
      }
    );
  }

  toggleStockReport() {
    this.isStockReportVisible = !this.isStockReportVisible;
    if (this.isStockReportVisible) {
      this.generateStockReport();
    } else {
      this.stockReport = '';
    }
  }

  generateStockReport() {
    this.itemService.getStockReport().subscribe(
      (response) => {
        this.stockReport = response;
      },
      (error) => {
        console.error('Failed to generate stock report:', error);
      }
    );
  }

  toggleItemList() {
    this.isItemListVisible = !this.isItemListVisible;
    this.loadItems();
  }
}
