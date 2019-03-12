export {
	
}

export const frameTime: number = 0.5;
export const platform: Platform = Platform.platform_web;


declare global {
	// Globals
	//let : number = 0.05;
	let usingDebug: boolean; // = false;

	enum Platform {
		platform_mobile = 0,
		platform_web,
		platform_pc
	}
}

	
