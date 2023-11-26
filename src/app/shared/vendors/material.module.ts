import { NgModule } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatToolbarModule } from '@angular/material/toolbar'

const materialModules: any[] = [MatFormFieldModule, MatSelectModule, MatToolbarModule]

@NgModule({
	imports: [...materialModules],
	exports: [...materialModules],
})

export class MaterialModule { }
