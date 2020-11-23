import { Moment } from 'moment'

export class VSeismsDynamicModel {

    // FILTERS
    from_date?: Moment;
    to_date?: Moment;
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


