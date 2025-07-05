import { Component } from '@angular/core';
import { ReportTableComponent } from './components/report-table.component';
import { SAMPLE_DATA } from './data/sample.data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReportTableComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div class="max-w-7xl m-auto mt-12">        
        <div class="space-y-6">
          <app-report-table [data]="sampleData" />
        </div>
        <!-- By Mustafa -->
        <footer class="mt-12 text-center text-sm text-gray-500">
          <p>© {{ currentYear }} Mustafa Azad. All rights reserved.</p>
          <p>Built with ❤️ using Angular and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  sampleData = SAMPLE_DATA;
  
  get currentYear(): number {
    return new Date().getFullYear();
  }
} 