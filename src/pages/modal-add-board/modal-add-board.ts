import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BoardsProvider } from '../../providers/boards/boards';
import { Board } from '../../core/models/board';

/**
 * Generated class for the ModalAddBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-add-board',
  templateUrl: 'modal-add-board.html',
})
export class ModalAddBoardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private boardProv: BoardsProvider) {
  }

  name: string;
  description: string = "";
  private addBoard() {
    let board = new Board(this.name, this.description);
    this.boardProv.addBoard(board)
      .then(() => {
        this.navCtrl.pop();
      }).catch((e)=>{
        console.log(e);
      });
  }

}
