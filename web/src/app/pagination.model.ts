export interface PaginationInterface {
    page_number: number;
    page_size: number;
    num_pages: number;
    total_results: number;
}

export class PaginationModel implements PaginationInterface {
    page_number: number;
    page_size: number;
    num_pages: number;
    total_results: number;
}