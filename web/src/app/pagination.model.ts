export interface PaginationInterface {
    page_number: number;
    page_size: number;
    num_pages: number;
    total_results: number;
}

export class PaginationModel implements PaginationInterface {
    constructor(
        public page_number: number,
        public page_size: number,
        public num_pages: number,
        public total_results: number
    ) {

    }
}