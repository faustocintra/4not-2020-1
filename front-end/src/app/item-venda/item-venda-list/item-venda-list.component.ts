import { Component, OnInit } from '@angular/core';
import { ItemVendaService } from '../item-venda.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-item-venda-list',
  templateUrl: './item-venda-list.component.html',
  styleUrls: ['./item-venda-list.component.scss']
})
export class ItemVendaListComponent implements OnInit {

  itensVenda : any = [] // Vetor vazio

  displayedColumns : string[] = ['venda', 'produto', 'quantidade', 'preco_unitario', 'desconto', 'acrescimo', 'preco_total', 'editar', 'excluir']

  constructor(
    private ItemVendaSrv : ItemVendaService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
  ) { }

  async ngOnInit() {
    this.itensVenda = await this.ItemVendaSrv.listar()
    console.log(this.itensVenda)
  }

  async excluirItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este item?'}
    });

    let result = await dialogRef.afterClosed().toPromise();
    
    //if(confirm('Deseja realmente excluir este item?')) {
    if(result) {
        
      try {
        await this.ItemVendaSrv.excluir(id)
        this.ngOnInit() // Atualizar os dados da tabela
        //alert('Exclusão efetuada com sucesso.')
        this.snackBar.open('Exclusão efetuada com sucesso.', 'Entendi', 
          { duration: 5000 });
      }
      catch(erro) {
        //alert('ERRO: não foi possível excluir este item.')
        this.snackBar.open('ERRO: não foi possível excluir este item.', 
          'Que pena!', { duration: 5000 });
      }
    }
  }

}
