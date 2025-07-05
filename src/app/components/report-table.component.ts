import { Component, Input, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRow, PORow, InvoiceRow, SortField, SortDirection } from '../models/table-data.model';
import { formatCurrency } from '../utils/format.utils';

// Generic interface for any nested data structure
export interface NestedRow {
  [key: string]: any;
  children?: NestedRow[];
}

@Component({
  selector: 'app-report-table',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full shadow-lg">
      <div class="p-6 pt-0 p-0">
        <div class="overflow-x-auto">
          <table class="w-full text-black">
            <thead class="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th class="px-6 py-4 text-left">
                  <button
                    (click)="handleSort('customerName')"
                    class="font-semibold text-gray-900 hover:bg-gray-100 p-2 -m-2 inline-flex items-center gap-2 transition-colors"
                  >
                    Customer / PO / Invoice
                    <svg 
                      *ngIf="getSortIcon('customerName') === 'asc'" 
                      class="w-4 h-4 text-blue-600" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"/>
                    </svg>
                    <svg 
                      *ngIf="getSortIcon('customerName') === 'desc'" 
                      class="w-4 h-4 text-blue-600" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                    <svg 
                      *ngIf="getSortIcon('customerName') === 'none'" 
                      class="w-4 h-4 text-gray-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </th>
                <th class="px-6 py-4 text-right">
                  <button
                    (click)="handleSort('range30')"
                    class="font-semibold text-gray-900 hover:bg-gray-100 p-2 -m-2 inline-flex items-center gap-2 transition-colors"
                  >
                    0-30 Days
                    <svg 
                      *ngIf="getSortIcon('range30') === 'asc'" 
                      class="w-4 h-4 text-blue-600" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"/>
                    </svg>
                    <svg 
                      *ngIf="getSortIcon('range30') === 'desc'" 
                      class="w-4 h-4 text-blue-600" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                    <svg 
                      *ngIf="getSortIcon('range30') === 'none'" 
                      class="w-4 h-4 text-gray-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </th>
                <th class="px-6 py-4 text-right">
                  <button
                    (click)="handleSort('rane60')"
                    class="font-semibold text-gray-900 hover:bg-gray-100 p-2 -m-2 inline-flex items-center gap-2 transition-colors"
                  >
                    31-60 Days
                    <svg 
                      *ngIf="getSortIcon('rane60') === 'asc'" 
                      class="w-4 h-4 text-blue-600" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"/>
                    </svg>
                    <svg 
                      *ngIf="getSortIcon('rane60') === 'desc'" 
                      class="w-4 h-4 text-blue-600" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                    <svg 
                      *ngIf="getSortIcon('rane60') === 'none'" 
                      class="w-4 h-4 text-gray-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </th>
                <th class="px-6 py-4 text-right">
                  <button
                    (click)="handleSort('rane90')"
                    class="font-semibold text-gray-900 hover:bg-gray-100 p-2 -m-2 inline-flex items-center gap-2 transition-colors"
                  >
                    61-90 Days
                    <svg 
                      *ngIf="getSortIcon('rane90') === 'asc'" 
                      class="w-4 h-4 text-blue-600" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"/>
                    </svg>
                    <svg 
                      *ngIf="getSortIcon('rane90') === 'desc'" 
                      class="w-4 h-4 text-blue-600" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                    <svg 
                      *ngIf="getSortIcon('rane90') === 'none'" 
                      class="w-4 h-4 text-gray-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </th>
                <th class="px-6 py-4 text-right">
                  <button
                    (click)="handleSort('total')"
                    class="font-semibold text-gray-900 hover:bg-gray-100 p-2 -m-2 inline-flex items-center gap-2 transition-colors"
                  >
                    Total
                    <svg 
                      *ngIf="getSortIcon('total') === 'asc'" 
                      class="w-4 h-4 text-blue-600" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"/>
                    </svg>
                    <svg 
                      *ngIf="getSortIcon('total') === 'desc'" 
                      class="w-4 h-4 text-blue-600" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                    <svg 
                      *ngIf="getSortIcon('total') === 'none'" 
                      class="w-4 h-4 text-gray-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              @for (customer of sortedData(); track getRowId(customer, 0)) {
                @for (row of renderNestedRows(customer, 0); track getRowId(row, getRowLevel(row))) {
                  <tr [class]="getRowStyle(row, getRowLevel(row))" class="transition-all duration-200">
                    <td [class]="'px-6 py-4 ' + getIndentClass(getRowLevel(row))">
                      <div class="flex items-center space-x-2">
                        @if (hasChildren(row)) {
                          <button
                            (click)="toggleExpanded(getRowId(row, getRowLevel(row)))"
                            class="p-1 h-6 w-6 hover:bg-gray-200 bg-transparent border-none cursor-pointer rounded transition-colors"
                            [attr.aria-expanded]="isExpanded(getRowId(row, getRowLevel(row)))"
                            aria-label="Toggle row expansion"
                          >
                            @if (isExpanded(getRowId(row, getRowLevel(row)))) {
                              <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                              </svg>
                            } @else {
                              <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                              </svg>
                            }
                          </button>
                        } @else {
                          <div class="w-6"></div>
                        }
                        <span class="truncate">{{ getIdentifierCell(row, getRowLevel(row)) }}</span>
                      </div>
                    </td>
                                         <td class="px-6 py-4 text-right font-mono">
                       {{ formatCurrency(row['range30']) }}
                     </td>
                     <td class="px-6 py-4 text-right font-mono">
                       {{ formatCurrency(row['rane60']) }}
                     </td>
                     <td class="px-6 py-4 text-right font-mono">
                       {{ formatCurrency(row['rane90']) }}
                     </td>
                     <td class="px-6 py-4 text-right font-mono font-semibold">
                       {{ formatCurrency(row['total']) }}
                     </td>
                  </tr>
                }
              }
              <tr class="bg-gray-50 text-black font-bold border-t-2 border-gray-100">
                <td class="px-6 py-4">Grand Total</td>
                <td class="px-6 py-4 text-right font-mono">
                  {{ formatCurrency(totals().range30) }}
                </td>
                <td class="px-6 py-4 text-right font-mono">
                  {{ formatCurrency(totals().rane60) }}
                </td>
                <td class="px-6 py-4 text-right font-mono">
                  {{ formatCurrency(totals().rane90) }}
                </td>
                <td class="px-6 py-4 text-right font-mono text-lg">
                  {{ formatCurrency(totals().total) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ReportTableComponent {
  @Input() data: CustomerRow[] = [];

  // Signals for reactive state management
  private expandedRows = signal<Set<string>>(new Set());
  private sortField = signal<SortField>('customerName');
  private sortDirection = signal<SortDirection>('asc');

  // Computed values
  sortedData = computed(() => {
    return [...this.data].sort((a, b) => {
      const field = this.sortField();
      let valueA: any = (a as any)[field];
      let valueB: any = (b as any)[field];

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = (valueB as string).toLowerCase();
      }

      if (this.sortDirection() === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });
  });

  totals = computed(() => {
    return this.data.reduce((acc, customer) => ({
      range30: acc.range30 + customer.range30,
      rane60: acc.rane60 + customer.rane60,
      rane90: acc.rane90 + customer.rane90,
      total: acc.total + customer.total,
    }), { range30: 0, rane60: 0, rane90: 0, total: 0 });
  });

  // Methods
  toggleExpanded(rowId: string): void {
    const current = this.expandedRows();
    const newExpanded = new Set(current);
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId);
    } else {
      newExpanded.add(rowId);
    }
    this.expandedRows.set(newExpanded);
  }

  isExpanded(rowId: string): boolean {
    return this.expandedRows().has(rowId);
  }

  handleSort(field: SortField): void {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
  }

  getSortIcon(field: SortField): 'none' | 'asc' | 'desc' {
    if (this.sortField() !== field) {
      return 'none';
    }
    return this.sortDirection();
  }

  getRowId(row: NestedRow, level: number): string {
    const isCustomer = 'id' in row;
    const isPO = 'poNumber' in row;
    
    if (isCustomer) return `customer-${row['id']}`;
    if (isPO) return `po-${row['poNumber']}`;
    return `inv-${(row as InvoiceRow).invNumber}`;
  }

  getRowLevel(row: NestedRow): number {
    const isCustomer = 'id' in row;
    const isPO = 'poNumber' in row;
    
    if (isCustomer) return 0;
    if (isPO) return 1;
    return 2; // Invoice level
  }

  renderNestedRows(row: NestedRow, level: number): NestedRow[] {
    const rows: NestedRow[] = [row];
    
    if (this.hasChildren(row) && this.isExpanded(this.getRowId(row, level))) {
      const children = row.children || [];
      for (const child of children) {
        rows.push(...this.renderNestedRows(child, level + 1));
      }
    }
    
    return rows;
  }

  hasChildren(row: NestedRow): boolean {
    return !!(row.children && row.children.length > 0);
  }

  getRowStyle(row: NestedRow, level: number): string {
    const isCustomer = 'id' in row;
    if (isCustomer) return 'hover:bg-blue-100 font-semibold';
    if (level % 2 !== 0) return 'bg-green-50 hover:bg-green-100 font-medium';
    return 'bg-blue-50 hover:bg-blue-100';
  }

  getIndentClass(level: number): string {
    if (level === 0) return '';
    return `pl-${8 + level * 4}`;
  }

  getIdentifierCell(row: NestedRow, level: number): string {
    const isCustomer = 'id' in row;
    const isPO = 'poNumber' in row;
    
    if (isCustomer) return row['customerName'];
    if (isPO) return `PO: ${row['customerName']}`;
    return `Invoice: ${row['customerName']}`;
  }

  formatCurrency = formatCurrency;
} 