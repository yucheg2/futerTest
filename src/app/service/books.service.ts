import axios from "axios";

const httpBooks = axios.create({
    baseURL: "https://www.googleapis.com/books/v1/volumes",
});

const booksService = {
    async getBooks(
        serchTxt: string,
        params: { sortBy: "relevance" | "newest"; category: string },
        quantity: number
    ) {
        const { data } = await httpBooks.get(
            `?q=${serchTxt}&orderBy=${params.sortBy}&maxResults=${quantity}&filter=free-ebooks&key=AIzaSyCoTI_T3IZfi8MNfzM60U1oXiZHc2RBzZ8`
        );
        return data;
    },
};

export default booksService;
