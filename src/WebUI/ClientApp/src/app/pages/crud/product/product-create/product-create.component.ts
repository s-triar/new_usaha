import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTemplateComponent } from 'src/app/pages/templates/page-template/page-template.component';
import { ProductFormComponent } from '../product-form/product-form.component';
@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    CommonModule, 
    ProductFormComponent,
    PageTemplateComponent,
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {
 

}
