import { LoadBarrier } from "./LoadBarrier";

export enum ResourceType {
    Image = 0,
    Audio
}

export class ResourceManager {

    // Singleton
    private static instance: ResourceManager;

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    // As normal
    private resourceList: any[];
    private audioFormat: string;

    constructor() {
		this.resourceList = [];
	}

    
    Start(): void {

    }

	LoadResource(src: string, type: ResourceType): any {

		let res = this.resourceList.find(res => res.source === src);
		let obj = null;
		if(!res)
		{
			switch(type)
			{
				case ResourceType.Image:
				obj = new Image();
				obj.onload = ImageLoadComplete();
				obj.src = src;				
				break;
				
				case ResourceType.Audio:
				obj = new Audio(src + this.audioFormat);
				LoadBarrier.Instance.ObjectLoaded(); // auto loads
			}
			
			res = new Resource(src, obj, type);
			LoadBarrier.Instance.ResourceLoading();
		}
		else
		{
			obj = res.object;
			res.addReference();
		}
		
		return obj;
	}
	
	GetResource(src: string): any {

		const res = this.resourceList.find(res => res.source === src);
		if(res)
		{
			return res.obj;
		}
		
		return null;
	}
	
	UnloadResource(src: string): void {
		// TO DO
	}
}

export class Resource {

	source: string;
	object: any;
	type: ResourceType;

	private referenceCount: number;

	constructor(src: string, obj: any, type: ResourceType) {

		this.source = src;
		this.object = obj;
		this.type = type;

		this.referenceCount = 1;
	}

	ReferenceCount(): number {
		return this.referenceCount;
	}

	AddReference(): void {
		this.referenceCount++;
	}

	RemoveReference(): void {
		this.referenceCount--;
		if (this.referenceCount < 0) {
			this.referenceCount = 0;
		}
	}
}

function ImageLoadComplete()
{
	LoadBarrier.Instance.ObjectLoaded();
}