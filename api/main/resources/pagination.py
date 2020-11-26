from sqlalchemy_filters import apply_filters, apply_sort, apply_pagination


class Pagination:

    def __init__(self, query, pagination_data):
        self.__query = query
        self.__data = pagination_data

    def filter_query(self):
        print("\n\nFILTROS EN CLASE PAGINACION: \n", self.__data)
        if len(self.__data['filter']) != 0:
            self.__query = apply_filters(self.__query, self.__data['filter'])
            return self.__query
        else:
            return self.__query

    def sort_query(self):
        if self.__data['sort_by']:
            self.__query = apply_sort(self.__query, self.__data['sort_by'])
            return self.__query
        else:
            return self.__query

    def paginate_query(self):
        page_number = 1
        elem_per_page = 10

        if self.__data['page'] and self.__data['elem_per_page']:
            return apply_pagination(
                self.__query,
                page_number=int(self.__data['page']),
                page_size=int(self.__data['elem_per_page'])
            )
        else:
            return apply_pagination(
                self.__query,
                page_number=page_number,
                page_size=elem_per_page
            )

    def get_filtered_query(self):
        self.filter_query()
        self.sort_query()
        self.__query, pagination = self.paginate_query()
        return self.__query, pagination
