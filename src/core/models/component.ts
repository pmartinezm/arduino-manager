export class Component {
    public name: string;
    public description: string;
    public project: number;
    public projectName: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.assignProject(-1);
    }

    public assignProject(id: number) {
        this.project = id;
    }

    public getComponentUse(): string {
        if (this.project === -1) {
            return "Unused";
        }
        return "Used in project with id " + this.project;
    }

    public unassignProject() {
        this.assignProject(-1);
    }
}