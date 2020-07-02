import { ProdutoService } from './../../produto/produto.service';
import { VendaService } from './../../venda/venda.service';
import { Component, OnInit } from '@angular/core';
import { ItemVendaService } from '../item-venda.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-item-venda-form',
  templateUrl: './item-venda-form.component.html',
  styleUrls: ['./item-venda-form.component.scss']
})
export class ItemVendaFormComponent implements OnInit {

  title: string = 'Novo item de venda'

  vendaDisabled : boolean = false

  itemVenda : any = { desconto: 0, acrescimo: 0 }  

  // Entidades relacionadas
  vendas : any = []   // Vetor vazio
  produtos : any = []

  constructor(
    private itemVendaSrv : ItemVendaService,
    private vendaSrv : VendaService,
    private produtoSrv: ProdutoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private actRoute: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    // Capturando os parâmetros da rota
    let params = this.actRoute.snapshot.params

    // Existe um parâmetro chamado :id?
    if(params['id']) {
      // É caso de atualização. É necesário consultar o back-end
      // para recuperar o registro e colocá-lo para edição
      try {
        this.itemVenda = await this.itemVendaSrv.obterUm(params['id'])
        this.title = 'Atualizando item de venda'

        // Impede a alteração da venda relacionada ao item
        this.vendaDisabled = true

      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }

    // Existe um parâmetro chamado :venda?
    if(params['venda']) {
      // Forçar o id da venda no item de venda
      this.itemVenda.venda = params['venda']
      
      // Desabilita o select da venda
      this.vendaDisabled = true
    }

    // Entidades relacionadas
    try {
      this.vendas = await this.vendaSrv.listar()
      this.produtos = await this.produtoSrv.listar()
    }
    catch(erro) {
      this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})  
    }
  
  }

  async voltar(form: NgForm) {
    
    let result = true;
    console.log(form);
    // form.dirty = formulário "sujo", não salvo (via código)
    // form.touched = o conteúdo de algum campo foi alterado (via usuário)
    if(form.dirty && form.touched) {
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Há dados não salvos. Deseja realmente voltar?' }
      });

      result = await dialogRef.afterClosed().toPromise();

    }

    if(result) {
      this.location.back() // Retorna à listagem
    }

  }

  async salvar(form: NgForm) {
    // Só tenta salvar se o form for válido
    if(form.valid) {
      try {
        let msg = 'Item de venda atualizado com sucesso.'
        // Se existir o campo _id, é caso de atualização
        if(this.itemVenda._id) {
          await this.itemVendaSrv.atualizar(this.itemVenda)
        }
        // Senão, é caso de criar um nova itemVenda
        else {
          await this.itemVendaSrv.novo(this.itemVenda)
          msg = 'Item de venda criado com sucesso.'
        }
        // Dá o feedback para o usuário
        this.snackBar.open(msg, 'Entendi', {duration: 5000})
        // Voltar à listagem
        this.location.back()
        //this.router.navigate(['/item-venda'])
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }
  }

}
