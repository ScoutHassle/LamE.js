import { Component } from './Component';
import { Entity } from '../../Entity';

export class RenderComponent extends Component {

    resource: any;
    visible: boolean;

    constructor(parent: Entity, resource: any) {
        super(ComponentType.Component_Renderable, parent);

        this.resource = resource;
        this.visible = true;
    }

    Resource(): any {
        return this.resource;
    }

    SetResource(resource: any): void {
        this.resource = resource;
    }

    IsVisible(): boolean {
        return this.visible;
    }

    SetVisible(state: boolean): void {
        this.visible = state;
    }

    Update(): void {

    }

    Shutdown(): void {
        super.Shutdown();
        this.resource = null;
    }

    Render(): void {

    }
}
