export class SeismsDynamicModel {

    // FILTERS
    from_date?: string;
    to_date?: string;
    mag_min?: number;
    mag_max?: number;
    depth_min?: number;
    depth_max?: number;
    sensor_id?: number;

    // PAGINATION
    page?: number;
    elem_per_page?: number;

    // SORTING
    sort_by?: string;
    direction?: string;
}


