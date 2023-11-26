import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatSelectModule} from '@angular/material/select';

const materialModules: any[] = [MatFormFieldModule, MatSelectModule
  ];

@NgModule({
    imports: [...materialModules],
    exports: [...materialModules],
  })

  export class MaterialModule {}