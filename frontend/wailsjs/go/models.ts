export namespace main {
	
	export class Application {
	    name: string;
	    path: string;
	    exec: string;
	
	    static createFrom(source: any = {}) {
	        return new Application(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.path = source["path"];
	        this.exec = source["exec"];
	    }
	}

}

