export class App {

    constructor(
			public $key: number,
			public position,
      public title: string,
			public appUrl: string,
			public description: string,
      public imgUrl?: string,
      public gitHubUrl?: string
    ) {  }
  }