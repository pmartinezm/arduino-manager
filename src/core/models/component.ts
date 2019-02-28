export class Component {
    public name: string;
    public desc: string;
    public proj: number;
    constructor(name: string, desc: string) {
        this.name = name;
        this.desc = desc;
        this.assignProject(-1);
    }

    public assignProject(id: number) {
        this.proj = id;
    }

    public getComponentUse(): string {
        if (this.proj === -1) {
            return "Unused";
        }
        return "Used in project with id " + this.proj;
    }
}