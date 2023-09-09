import axios from "axios";

const httpBooks = axios.create({
    baseURL: "https://www.googleapis.com/books/v1/volumes",
});

const booksService = {
    async getBooks(
        serchTxt: string,
        params: { sortBy: "relevance" | "newest"; category: string },
        quantity: number,
        startIndex?: number
    ) {
        const { data } = await httpBooks.get(
            `?q=intitle:${serchTxt}` +
                (params.category === "all"
                    ? ""
                    : `+subject:${params.category}`) +
                `&orderBy=${params.sortBy}&startIndex=${
                    startIndex ? startIndex : "0"
                }&maxResults=${quantity}&key=AIzaSyCoTI_T3IZfi8MNfzM60U1oXiZHc2RBzZ8`
        );
        return data;
    },
    async getBookById(id: string) {
        const { data } = await httpBooks.get(id);
        return data;
    },
};

export default booksService;
