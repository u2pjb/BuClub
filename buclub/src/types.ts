import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options{
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    context?: HttpContext   ;
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?: {
        includeHeaders?: string[];
    } | boolean}

    export interface Members {
      items: Member[];
      total: number;
      page: number;
      perPage: number;
      totalPages: number;
    }

    export interface Member {
      id?: number;
      firstname: string;
      lastname: string;
      addressline1: string;
      addressline2: string;
      addressline3: string;
      addressline4: string;
      postcode: string;
      phonenumber: string;
      email: string;
      paid: number;
      notes: string;
      image: string;
    }


    export interface PaginationParams{
        [key: string]:string|number|boolean|ReadonlyArray<string|number|boolean>;
        page:number;
        perPage:number;
    }