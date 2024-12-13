import { AxiosInstance } from "axios";
import { CreateBookCatalogDto } from "../models/create-book-catalog.dto";
import apiClient from "../../shared/api-client";

class BookCatalogService {
    constructor(private readonly apiClient: AxiosInstance) {}

    async addBookCatalog(request: CreateBookCatalogDto){
        await this.apiClient.post(`catalog-books`, request);
    }
}

export default new BookCatalogService(apiClient);
