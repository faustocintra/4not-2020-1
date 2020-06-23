import { VendaFormComponent } from './venda/venda-form/venda-form.component';
import { FornecedorFormComponent } from './fornecedor/fornecedor-form/fornecedor-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FornecedorListComponent } from './fornecedor/fornecedor-list/fornecedor-list.component';
import { VendaListComponent } from './venda/venda-list/venda-list.component';

const routes: Routes = [
  {
    path: 'fornecedor', // No Angular, não se usa / no começo
    component: FornecedorListComponent
  },
  {
    path: 'fornecedor/novo', // Cadastrar novo fornecedor
    component: FornecedorFormComponent
  },
  {
    path: 'fornecedor/:id',  // Editar um fornecedor já existente
    component: FornecedorFormComponent
  },
  {
    path: 'venda',
    component: VendaListComponent
  },
  {
    path: 'venda/novo',
    component: VendaFormComponent
  },
  {
    path: 'venda/:id',
    component: VendaFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
