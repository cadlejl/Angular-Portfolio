export class App {

    constructor(
      public id: number,
      public title: string,
			public appUrl: string,
			public description: string,
      public imgUrl?: number,
      public gitHubUrl?: string
    ) {  }
  }