import { Component } from "./component";
import { Board } from "./board";

export class Project {
    public id: number;
    public name: string;
    public description: string;
    public components: Array<Component>;
    public boards: Array<Board>;

    constructor(name: string, desc:string) {
        this.components = new Array();
        this.boards = new Array();
        this.name = name;
        this.description = desc;
    }

    public addComponent(component: Component){
        this.components.push(component);
        component.assignProject(this.id);
    }

    public addBoard(board: Board) {
        this.boards.push(board);
    }
}